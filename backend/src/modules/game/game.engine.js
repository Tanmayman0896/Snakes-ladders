const prisma = require('../../prisma/client');
const { processDiceRoll } = require('./dice.service');
const { approveCheckpoint, handleSnakeDodge } = require('./checkpoint.service');
const { getBoardStateForTeam } = require('./board.service');

const initializeTeam = async (teamId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: {
      currentPosition: 1,
      currentRoom: 1,
      totalTimeSec: 0,
      status: 'ACTIVE',
      canRollDice: true,
    },
  });
};

const processTurn = async (teamId) => {
  // Roll dice and create checkpoint
  const result = await processDiceRoll(teamId);
  return result;
};

const completeCheckpoint = async (checkpointId, questionCorrect) => {
  const checkpoint = await approveCheckpoint(checkpointId);
  return checkpoint;
};

const processSnakeDodge = async (checkpointId, success) => {
  return await handleSnakeDodge(checkpointId, success);
};

const getGameState = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
      map: true,
      checkpoints: {
        include: {
          questionAssign: {
            include: {
              question: {
                select: {
                  id: true,
                  text: true,
                  type: true,
                },
              },
            },
          },
        },
        orderBy: { checkpointNumber: 'desc' },
        take: 1,
      },
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  const boardState = await getBoardStateForTeam(teamId);

  return {
    team: {
      id: team.id,
      teamCode: team.teamCode,
      teamName: team.teamName,
      currentPosition: team.currentPosition,
      currentRoom: team.currentRoom,
      totalTimeSec: team.totalTimeSec,
      status: team.status,
      canRollDice: team.canRollDice,
      members: team.members,
      mapId: team.mapId,
      mapName: team.map?.name || null,
    },
    latestCheckpoint: team.checkpoints[0] || null,
    boardState,
  };
};


const getFullProgress = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
      checkpoints: {
        include: {
          questionAssign: {
            include: {
              question: true,
            },
          },
        },
        orderBy: { checkpointNumber: 'asc' },
      },
      diceRolls: {
        orderBy: { createdAt: 'asc' },
      },
      timeLogs: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return team;
};


const checkWinCondition = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { currentPosition: true, status: true },
  });

  return team && team.currentPosition >= 100;
};

module.exports = {
  initializeTeam,
  processTurn,
  completeCheckpoint,
  processSnakeDodge,
  getGameState,
  getFullProgress,
  checkWinCondition,
};
