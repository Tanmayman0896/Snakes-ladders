const prisma = require('../../prisma/client');
const { rollDice, calculateNewPosition, getRandomRoom, hasReachedGoal } = require('./game.utils');
const { checkSnakeForTeam } = require('./board.service');
const { GAME_CONFIG } = require('../../config/constants');

const processDiceRoll = async (teamId) => {
  // Get current team state
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      currentPosition: true,
      currentRoom: true,
      status: true,
      mapId: true,
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  if (!team.mapId) {
    throw new Error('Team has no board map assigned');
  }

  // Roll the dice
  const diceValue = rollDice();
  const positionBefore = team.currentPosition;
  let positionAfter = calculateNewPosition(positionBefore, diceValue);

  // Check if team would exceed 100
  if (positionAfter > GAME_CONFIG.BOARD_SIZE) {
    positionAfter = positionBefore; // Stay at current position
  }

  // Get new room (different from current)
  const newRoom = getRandomRoom(team.currentRoom);

  // Check if landed on snake (using team's specific map)
  const snake = await checkSnakeForTeam(teamId, positionAfter);
  const isSnakePosition = snake !== null;

  // Record the dice roll
  const diceRollRecord = await prisma.diceRoll.create({
    data: {
      teamId,
      value: diceValue,
      positionFrom: positionBefore,
      positionTo: positionAfter,
      roomAssigned: newRoom,
    },
  });

  // Update team position and room, lock dice
  await prisma.team.update({
    where: { id: teamId },
    data: {
      currentPosition: positionAfter,
      currentRoom: newRoom,
      canRollDice: false,
      status: hasReachedGoal(positionAfter) ? 'COMPLETED' : 'ACTIVE',
    },
  });

  // Get checkpoint count for this team
  const checkpointCount = await prisma.checkpoint.count({
    where: { teamId },
  });

  // Create checkpoint
  const checkpoint = await prisma.checkpoint.create({
    data: {
      teamId,
      checkpointNumber: checkpointCount + 1,
      positionBefore,
      positionAfter,
      roomNumber: newRoom,
      status: 'PENDING',
      isSnakePosition,
    },
  });

  return {
    diceValue,
    positionBefore,
    positionAfter,
    newRoom,
    isSnakePosition,
    snakeEndPosition: snake ? snake.endPos : null,
    checkpoint,
    diceRoll: diceRollRecord,
    hasWon: hasReachedGoal(positionAfter),
  };
};

const getDiceRollHistory = async (teamId) => {
  return await prisma.diceRoll.findMany({
    where: { teamId },
    orderBy: { createdAt: 'desc' },
  });
};

module.exports = {
  processDiceRoll,
  getDiceRollHistory,
};

