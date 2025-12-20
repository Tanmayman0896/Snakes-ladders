const prisma = require('../../prisma/client');
const { GAME_CONFIG } = require('../../config/constants');
const { getSnakeEndPositionForTeam } = require('./board.service');


const getTeamCheckpoints = async (teamId) => {
  return await prisma.checkpoint.findMany({
    where: { teamId },
    include: {
      questionAssign: {
        include: {
          question: true,
        },
      },
    },
    orderBy: { checkpointNumber: 'asc' },
  });
};

const getPendingCheckpoint = async (teamId) => {
  return await prisma.checkpoint.findFirst({
    where: {
      teamId,
      status: 'PENDING',
    },
    include: {
      questionAssign: {
        include: {
          question: true,
        },
      },
    },
  });
};


const approveCheckpoint = async (checkpointId) => {
  const checkpoint = await prisma.checkpoint.update({
    where: { id: checkpointId },
    data: { status: 'APPROVED' },
    include: {
      team: true,
    },
  });

  // Enable dice roll for the team
  await prisma.team.update({
    where: { id: checkpoint.teamId },
    data: { canRollDice: true },
  });

  return checkpoint;
};


const handleSnakeDodge = async (checkpointId, success) => {
  const checkpoint = await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: { team: true },
  });

  if (!checkpoint) {
    throw new Error('Checkpoint not found');
  }

  if (!checkpoint.isSnakePosition) {
    throw new Error('This checkpoint is not on a snake position');
  }

  // Update checkpoint
  await prisma.checkpoint.update({
    where: { id: checkpointId },
    data: {
      snakeDodgeAttempted: true,
      status: 'APPROVED',
    },
  });

  if (success) {
    // Dodge successful - no penalty, stay at position
    await prisma.team.update({
      where: { id: checkpoint.teamId },
      data: { canRollDice: true },
    });

    return {
      success: true,
      penalty: false,
      message: 'Snake dodged successfully!',
    };
  } else {
    // Dodge failed - apply penalty and move to snake end (using team's map)
    const snakeEndPos = await getSnakeEndPositionForTeam(checkpoint.teamId, checkpoint.positionAfter);

    // Add time penalty
    await prisma.timeLog.create({
      data: {
        teamId: checkpoint.teamId,
        seconds: GAME_CONFIG.SNAKE_PENALTY_SECONDS,
        reason: `Snake penalty at position ${checkpoint.positionAfter}`,
      },
    });

    // Update team position to snake end and add penalty time
    await prisma.team.update({
      where: { id: checkpoint.teamId },
      data: {
        currentPosition: snakeEndPos || checkpoint.positionAfter,
        totalTimeSec: { increment: GAME_CONFIG.SNAKE_PENALTY_SECONDS },
        canRollDice: true,
      },
    });

    return {
      success: false,
      penalty: true,
      penaltySeconds: GAME_CONFIG.SNAKE_PENALTY_SECONDS,
      newPosition: snakeEndPos,
      message: `Snake bite! +${GAME_CONFIG.SNAKE_PENALTY_SECONDS / 60} minutes penalty`,
    };
  }
};

const getCheckpointById = async (checkpointId) => {
  return await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: {
      team: true,
      questionAssign: {
        include: {
          question: true,
        },
      },
    },
  });
};


const getAllPendingCheckpoints = async () => {
  return await prisma.checkpoint.findMany({
    where: { status: 'PENDING' },
    include: {
      team: true,
      questionAssign: {
        include: {
          question: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
};

const undoCheckpoint = async (checkpointId) => {
  const checkpoint = await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: { questionAssign: true },
  });

  if (!checkpoint) {
    throw new Error('Checkpoint not found');
  }

  // Delete question assignment if exists
  if (checkpoint.questionAssign) {
    await prisma.questionAssignment.delete({
      where: { id: checkpoint.questionAssign.id },
    });
  }

  // Revert team position
  await prisma.team.update({
    where: { id: checkpoint.teamId },
    data: {
      currentPosition: checkpoint.positionBefore,
      canRollDice: true,
    },
  });

  // Delete the checkpoint
  await prisma.checkpoint.delete({
    where: { id: checkpointId },
  });

  return { message: 'Checkpoint undone successfully' };
};

module.exports = {
  getTeamCheckpoints,
  getPendingCheckpoint,
  approveCheckpoint,
  handleSnakeDodge,
  getCheckpointById,
  getAllPendingCheckpoints,
  undoCheckpoint,
};
