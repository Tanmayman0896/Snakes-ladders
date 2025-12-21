const prisma = require('../../prisma/client');
const { getBoardState } = require('../game/board.service');


const getDashboard = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
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
        take: 5,
      },
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  const boardState = await getBoardState();

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
    },
    recentCheckpoints: team.checkpoints,
    boardState,
  };
};


const getTeamState = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      teamCode: true,
      teamName: true,
      currentPosition: true,
      currentRoom: true,
      totalTimeSec: true,
      status: true,
      canRollDice: true,
    },
  });

  return team;
};

const getCheckpoints = async (teamId) => {
  return await prisma.checkpoint.findMany({
    where: { teamId },
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
    orderBy: { checkpointNumber: 'asc' },
  });
};


const getBoard = async () => {
  return await getBoardState();
};

 //Check if team can roll dice

const canRollDice = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      canRollDice: true,
      status: true,
    },
  });

  if (!team) {
    return { canRoll: false, reason: 'Team not found' };
  }

  if (team.status === 'COMPLETED') {
    return { canRoll: false, reason: 'Team has completed the game' };
  }

  if (team.status === 'DISQUALIFIED') {
    return { canRoll: false, reason: 'Team is disqualified' };
  }

  if (!team.canRollDice) {
    return { canRoll: false, reason: 'Pending checkpoint approval' };
  }

  return { canRoll: true, reason: null };
};

module.exports = {
  getDashboard,
  getTeamState,
  getCheckpoints,
  getBoard,
  canRollDice,
};

