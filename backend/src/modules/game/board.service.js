const prisma = require('../../prisma/client');

// ==================== BOARD MAP MANAGEMENT ====================

const createBoardMap = async (name) => {
  return await prisma.boardMap.create({
    data: { name },
  });
};

const getAllBoardMaps = async () => {
  return await prisma.boardMap.findMany({
    where: { isActive: true },
    include: {
      rules: {
        orderBy: { startPos: 'asc' },
      },
      _count: {
        select: { teams: true },
      },
    },
  });
};

const getBoardMapById = async (mapId) => {
  return await prisma.boardMap.findUnique({
    where: { id: mapId },
    include: {
      rules: {
        orderBy: { startPos: 'asc' },
      },
    },
  });
};

const deleteBoardMap = async (mapId) => {
  return await prisma.boardMap.delete({
    where: { id: mapId },
  });
};

// ==================== BOARD RULES (SNAKES/LADDERS) ====================

const createBoardRule = async (mapId, type, startPos, endPos) => {
  return await prisma.boardRule.create({
    data: {
      mapId,
      type,
      startPos,
      endPos,
    },
  });
};

const deleteBoardRule = async (id) => {
  return await prisma.boardRule.delete({
    where: { id },
  });
};

const getRulesByMap = async (mapId) => {
  return await prisma.boardRule.findMany({
    where: { mapId },
    orderBy: { startPos: 'asc' },
  });
};

const getSnakesByMap = async (mapId) => {
  return await prisma.boardRule.findMany({
    where: { 
      mapId,
      type: 'SNAKE',
    },
    orderBy: { startPos: 'asc' },
  });
};

// ==================== TEAM-SPECIFIC SNAKE CHECKS ====================

const checkSnakeForTeam = async (teamId, position) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { mapId: true },
  });

  if (!team || !team.mapId) {
    return null; // No map assigned, no snake
  }

  const snake = await prisma.boardRule.findFirst({
    where: {
      mapId: team.mapId,
      type: 'SNAKE',
      startPos: position,
    },
  });

  return snake;
};

const getSnakeEndPositionForTeam = async (teamId, position) => {
  const snake = await checkSnakeForTeam(teamId, position);
  return snake ? snake.endPos : null;
};

// ==================== TEAM MAP ASSIGNMENT ====================

const assignMapToTeam = async (teamId, mapId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: { mapId },
  });
};

const getTeamMap = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      map: {
        include: {
          rules: {
            orderBy: { startPos: 'asc' },
          },
        },
      },
    },
  });
  return team?.map || null;
};

// ==================== BOARD STATE ====================

const getBoardStateForTeam = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      map: {
        include: {
          rules: true,
        },
      },
    },
  });

  if (!team || !team.map) {
    return {
      boardSize: 100,
      mapName: null,
      snakes: {},
      ladders: {},
    };
  }

  const snakeMap = {};
  const ladderMap = {};

  team.map.rules.forEach(rule => {
    if (rule.type === 'SNAKE') {
      snakeMap[rule.startPos] = rule.endPos;
    } else if (rule.type === 'LADDER') {
      ladderMap[rule.startPos] = rule.endPos;
    }
  });

  return {
    boardSize: 100,
    mapId: team.map.id,
    mapName: team.map.name,
    snakes: snakeMap,
    ladders: ladderMap,
  };
};

// Legacy function for backward compatibility
const getBoardState = async () => {
  const maps = await getAllBoardMaps();
  return {
    boardSize: 100,
    totalMaps: maps.length,
    maps: maps.map(m => ({
      id: m.id,
      name: m.name,
      teamsCount: m._count.teams,
    })),
  };
};

module.exports = {
  // Map management
  createBoardMap,
  getAllBoardMaps,
  getBoardMapById,
  deleteBoardMap,
  
  // Rule management
  createBoardRule,
  deleteBoardRule,
  getRulesByMap,
  getSnakesByMap,
  
  // Team-specific operations
  checkSnakeForTeam,
  getSnakeEndPositionForTeam,
  assignMapToTeam,
  getTeamMap,
  getBoardStateForTeam,
  
  // Legacy
  getBoardState,
};
