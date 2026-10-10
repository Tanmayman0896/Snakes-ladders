const prisma = require('../../config/db');
const {rollDice, getRandomRoom, hasReachedGoal} = require('./game.utils');
const {checkSnakeForTeam, checkLadderForTeam} = require('./board.service');
const {selectRandomQuestion} = require('./question.assignment');
const {GAME_CONFIG} = require('../../config/constants');
const {logDiceRoll, logCheckpointReached} = require('../audit/audit.service');
const {startTimer} = require('../participant/participant.service');

const processDiceRoll = async (teamId) => {
  // Start timer on first dice roll if not already started
  await startTimer(teamId);

  // Get current team state
  const team = await prisma.team.findUnique({
    where: {id: teamId},
    select: {
      teamCode: true,
      teamName: true,
      currentPosition: true,
      currentRoom: true,
      status: true,
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  if (team.status === 'COMPLETED') {
    throw new Error('Team has already completed the game');
  }

  // Handle final roll after completing block 150 (Assigns end room AB1 307)
  if (team.currentPosition === GAME_CONFIG.BOARD_SIZE) {
    const diceValue = rollDice();
    const finalRoom = 'AB1 307';

    const diceRoll = await prisma.$transaction(async (tx) => {
      const roll = await tx.diceRoll.create({
        data: {
          teamId,
          value: diceValue,
          positionFrom: GAME_CONFIG.BOARD_SIZE,
          positionTo: GAME_CONFIG.BOARD_SIZE,
          roomAssigned: finalRoom,
        },
      });

      await tx.team.update({
        where: { id: teamId },
        data: {
          currentRoom: finalRoom,
          canRollDice: false,
          status: 'COMPLETED',
          timerPaused: true,
        },
      });

      return roll;
    });

    Promise.all([
      logDiceRoll(team.teamCode, team.teamName, diceValue, GAME_CONFIG.BOARD_SIZE, GAME_CONFIG.BOARD_SIZE),
      logCheckpointReached(
        team.teamCode,
        team.teamName,
        999,
        GAME_CONFIG.BOARD_SIZE,
        finalRoom,
        false,
        'Final roll completed! Assigned end room AB1 307'
      )
    ]).catch(err => console.error('Audit logging error:', err));

    return {
      diceValue,
      positionBefore: GAME_CONFIG.BOARD_SIZE,
      positionAfter: GAME_CONFIG.BOARD_SIZE,
      roomAssigned: finalRoom,
      hasWon: true,
      isFinalRoll: true,
      message: 'Game Completed! Report to room AB1 307.',
      diceRoll,
    };
  }

  // Roll the dice for regular move
  const diceValue = rollDice();
  const positionBefore = team.currentPosition;
  let positionAfter = positionBefore + diceValue;

  if (positionAfter > 150) {
    return {
      diceValue,
      positionBefore,
      invalidRoll: true,
    }
  }

  // Check if team would exceed 150
  if (positionAfter > GAME_CONFIG.BOARD_SIZE) {
    positionAfter = positionBefore; // Stay at current position
  }

  // Check if team has reached position 150 (win condition)
  const hasWon = hasReachedGoal(positionAfter);

  // Parallel execution: Check snake, ladder, and get checkpoint count at the same time
  const [snake, ladder, checkpointCount] = await Promise.all([
    checkSnakeForTeam(teamId, positionAfter),
    checkLadderForTeam(teamId, positionAfter),
    prisma.checkpoint.count({where: {teamId}})
  ]);

  const isSnakePosition = snake !== null;
  const isLadderPosition = ladder !== null;
  const ladderEndPos = isLadderPosition ? ladder.endPos : null;

  // Automatically select question based on position type and block number (Hard coding after block 80)
  const {question, roomType} = await selectRandomQuestion(teamId, isSnakePosition, isLadderPosition, positionAfter);

  // Get new room based on question type (TECH or NON_TECH)
  const newRoom = await getRandomRoom(team.currentRoom, teamId, roomType);

  // Check if team stayed at same position (roll would exceed 150)
  const stayedAtSamePosition = positionBefore === positionAfter && positionBefore !== GAME_CONFIG.BOARD_SIZE;

  // Batch all write operations in a transaction for atomicity and speed
  const {checkpoint, diceRoll} = await prisma.$transaction(async(tx) => {
    // Record the dice roll
    const diceRoll = await tx.diceRoll.create({
      data: {
        teamId,
        value: diceValue,
        positionFrom: positionBefore,
        positionTo: positionAfter,
        roomAssigned: newRoom,
      },
    });

    // Update team position and room
    await tx.team.update({
      where: {id: teamId},
      data: {
        currentPosition: positionAfter,
        currentRoom: newRoom,
        canRollDice: hasWon ? false : stayedAtSamePosition, // Disable dice immediately at position 150
        // Status will be set to COMPLETED when admin approves checkpoint at position 150
      },
    });

    // Create checkpoint - always PENDING, even at position 150
    const checkpoint = await tx.checkpoint.create({
      data: {
        teamId,
        checkpointNumber: checkpointCount + 1,
        positionBefore,
        positionAfter,
        roomNumber: newRoom,
        status: 'PENDING',
        isSnakePosition,
        isLadderPosition,
        ladderEndPos,
      },
    });

    // Create question assignment
    await tx.questionAssignment.create({
      data: {
        checkpointId: checkpoint.id,
        questionId: question.id,
        status: 'PENDING',
      },
    });

    return {
      checkpoint,
      diceRoll,
    }
  });

  // Fire and forget: Log operations don't need to block response
  Promise.all([
    logDiceRoll(team.teamCode, team.teamName, diceValue, positionBefore, positionAfter),
    logCheckpointReached(
      team.teamCode,
      team.teamName,
      checkpointCount + 1,
      positionAfter,
      newRoom,
      isSnakePosition,
      hasWon ? 'Reached position 150 - Awaiting admin approval' : `Auto-assigned ${question.type} question (${question.id})`
    )
  ]).catch(err => console.error('Audit logging error:', err));

  return {
    diceValue,
    positionBefore,
    positionAfter,
    roomAssigned: newRoom,
    roomType,
    isSnakePosition,
    isLadderPosition,
    ladderEndPos,
    questionType: question.type,
    questionAssigned: true,
    checkpoint,
    diceRoll,
    hasWon,
  };
};

const getDiceRollHistory = async (teamId) => {
  return await prisma.diceRoll.findMany({
    where: {teamId},
    orderBy: {createdAt: 'desc'},
  });
};

module.exports = {
  processDiceRoll,
  getDiceRollHistory,
};

