const express = require('express');
const router = express.Router();
const participantController = require('./participant.controller');
const { verifyToken } = require('../../middlewares/session.middleware');
const { participantOnly } = require('../../middlewares/role.middleware');
const { checkDiceLock } = require('../../middlewares/lock.middleware');

// All routes require authentication and participant role
router.use(verifyToken);
router.use(participantOnly);

// Dashboard
router.get('/dashboard', participantController.getDashboard);

// Team state
router.get('/state', participantController.getTeamState);

// Dice roll
router.post('/dice/roll', checkDiceLock, participantController.rollDice);
router.get('/dice/can-roll', participantController.checkCanRollDice);

// Checkpoints
router.get('/checkpoints', participantController.getCheckpoints);

// Board
router.get('/board', participantController.getBoard);

// Leaderboard
router.get('/leaderboard', participantController.getLeaderboardData);

module.exports = router;

