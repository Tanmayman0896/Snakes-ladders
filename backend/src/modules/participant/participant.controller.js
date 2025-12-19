const participantService = require('./participant.service');
const { processDiceRoll } = require('../game/dice.service');
const { getLeaderboard } = require('../leaderboard/leaderboard.service');
const { sendSuccess, sendError, sendBadRequest } = require('../../utils/response.util');
const { MESSAGES } = require('../../config/constants');

 //Get participant dashboard
 
const getDashboard = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;
    const dashboard = await participantService.getDashboard(teamId);
    return sendSuccess(res, dashboard, 'Dashboard loaded successfully');
  } catch (error) {
    next(error);
  }
};

const getTeamState = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;
    const state = await participantService.getTeamState(teamId);
    return sendSuccess(res, state, 'Team state loaded');
  } catch (error) {
    next(error);
  }
};

//Roll dice
 
const rollDice = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;
    
    // Check if team can roll dice
    const canRoll = await participantService.canRollDice(teamId);
    if (!canRoll.canRoll) {
      return sendBadRequest(res, canRoll.reason);
    }

    const result = await processDiceRoll(teamId);
    return sendSuccess(res, result, MESSAGES.DICE_ROLLED);
  } catch (error) {
    next(error);
  }
};


const getCheckpoints = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;
    const checkpoints = await participantService.getCheckpoints(teamId);
    return sendSuccess(res, checkpoints, 'Checkpoints loaded');
  } catch (error) {
    next(error);
  }
};

const getBoard = async (req, res, next) => {
  try {
    const board = await participantService.getBoard();
    return sendSuccess(res, board, 'Board loaded');
  } catch (error) {
    next(error);
  }
};

const getLeaderboardData = async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard();
    return sendSuccess(res, leaderboard, 'Leaderboard loaded');
  } catch (error) {
    next(error);
  }
};

const checkCanRollDice = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;
    const result = await participantService.canRollDice(teamId);
    return sendSuccess(res, result, 'Dice roll status');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getTeamState,
  rollDice,
  getCheckpoints,
  getBoard,
  getLeaderboardData,
  checkCanRollDice,
};
