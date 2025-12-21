const prisma = require('../../prisma/client');
const { hashPassword } = require('../../utils/password.util');
const { generateTeamCode } = require('../../utils/random.util');
const { GAME_CONFIG, ROOMS } = require('../../config/constants');

const createTeam = async (teamName, members, password) => {
  const teamCode = generateTeamCode();
  const hashedPassword = await hashPassword(password);
  const randomRoom = ROOMS[Math.floor(Math.random() * ROOMS.length)];

  const team = await prisma.team.create({
    data: {
      teamCode,
      teamName,
      currentRoom: randomRoom,
      members: {
        create: members.map(name => ({ name })),
      },
      login: {
        create: {
          teamId: undefined, // Will be set automatically
          password: hashedPassword,
        },
      },
    },
    include: {
      members: true,
      login: {
        select: { id: true },
      },
    },
  });

  // Update login with teamId
  await prisma.participantLogin.update({
    where: { teamId: team.id },
    data: { teamId: team.id },
  });

  return { ...team, generatedPassword: password };
};


const updateTeamPassword = async (teamId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  
  return await prisma.participantLogin.update({
    where: { teamId },
    data: { password: hashedPassword },
  });
};

const disqualifyTeam = async (teamId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: { status: 'DISQUALIFIED' },
  });
};


const reinstateTeam = async (teamId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: { status: 'ACTIVE' },
  });
};

//Change team room

const changeTeamRoom = async (teamId, newRoom) => {
  if (!ROOMS.includes(newRoom)) {
    throw new Error('Invalid room number');
  }

  return await prisma.team.update({
    where: { id: teamId },
    data: { currentRoom: newRoom },
  });
};

const adjustTeamTimer = async (teamId, secondsToAdd, reason) => {
  const team = await prisma.team.update({
    where: { id: teamId },
    data: {
      totalTimeSec: { increment: secondsToAdd },
    },
  });

  // Log the time adjustment
  await prisma.timeLog.create({
    data: {
      teamId,
      seconds: secondsToAdd,
      reason: reason || 'Manual adjustment by superadmin',
    },
  });

  return team;
};

const setTeamTimer = async (teamId, totalSeconds, reason) => {
  const currentTeam = await prisma.team.findUnique({
    where: { id: teamId },
    select: { totalTimeSec: true },
  });

  const difference = totalSeconds - currentTeam.totalTimeSec;

  const team = await prisma.team.update({
    where: { id: teamId },
    data: { totalTimeSec: totalSeconds },
  });

  // Log the time change
  await prisma.timeLog.create({
    data: {
      teamId,
      seconds: difference,
      reason: reason || 'Timer set by superadmin',
    },
  });

  return team;
};

const undoCheckpoint = async (checkpointId) => {
  const checkpoint = await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: {
      team: true,
      questionAssign: true,
    },
  });

  if (!checkpoint) {
    throw new Error('Checkpoint not found');
  }

  // Get the previous checkpoint to restore position
  const previousCheckpoint = await prisma.checkpoint.findFirst({
    where: {
      teamId: checkpoint.teamId,
      checkpointNumber: checkpoint.checkpointNumber - 1,
    },
  });

  const newPosition = previousCheckpoint ? previousCheckpoint.positionAfter : 1;

  // Delete question assignment if exists
  if (checkpoint.questionAssign) {
    await prisma.questionAssignment.delete({
      where: { id: checkpoint.questionAssign.id },
    });
  }

  // Delete the checkpoint
  await prisma.checkpoint.delete({
    where: { id: checkpointId },
  });

  // Update team position and enable dice roll
  await prisma.team.update({
    where: { id: checkpoint.teamId },
    data: {
      currentPosition: newPosition,
      canRollDice: true,
    },
  });

  return {
    message: 'Checkpoint undone successfully',
    newPosition,
    teamId: checkpoint.teamId,
  };
};

const getAllTeamsWithDetails = async () => {
  return await prisma.team.findMany({
    include: {
      members: true,
      checkpoints: {
        orderBy: { checkpointNumber: 'desc' },
        include: {
          questionAssign: {
            include: { question: true },
          },
        },
      },
      timeLogs: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: [
      { currentPosition: 'desc' },
      { totalTimeSec: 'asc' },
    ],
  });
};

const createAdmin = async (username, password) => {
  const hashedPassword = await hashPassword(password);

  return await prisma.adminLogin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

const deleteAdmin = async (adminId) => {
  return await prisma.adminLogin.delete({
    where: { id: adminId },
  });
};

const getAllAdmins = async () => {
  return await prisma.adminLogin.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
};

const addSnake = async (startPos, endPos) => {
  if (startPos <= endPos) {
    throw new Error('Snake start position must be greater than end position');
  }

  return await prisma.boardRule.create({
    data: {
      type: 'SNAKE',
      startPos,
      endPos,
    },
  });
};

const removeSnake = async (snakeId) => {
  return await prisma.boardRule.delete({
    where: { id: snakeId },
  });
};

const getAllBoardRules = async () => {
  return await prisma.boardRule.findMany({
    orderBy: { startPos: 'asc' },
  });
};

module.exports = {
  createTeam,
  updateTeamPassword,
  disqualifyTeam,
  reinstateTeam,
  changeTeamRoom,
  adjustTeamTimer,
  setTeamTimer,
  undoCheckpoint,
  getAllTeamsWithDetails,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  addSnake,
  removeSnake,
  getAllBoardRules,
};
