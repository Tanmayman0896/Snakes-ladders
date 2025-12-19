const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const { MESSAGES } = require('../../config/constants');

 // Participant login
 
const participantLogin = async (req, res, next) => {
  try {
    const { teamCode, password } = req.body;

    if (!teamCode || !password) {
      return sendError(res, 'Team code and password are required', 400);
    }

    const result = await authService.loginParticipant(teamCode, password);
    return sendSuccess(res, result, MESSAGES.LOGIN_SUCCESS);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return sendError(res, MESSAGES.INVALID_CREDENTIALS, 401);
    }
    if (error.message === 'Team has been disqualified') {
      return sendError(res, MESSAGES.TEAM_DISQUALIFIED, 403);
    }
    next(error);
  }
};

 //Admin login
 
const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 'Username and password are required', 400);
    }

    const result = await authService.loginAdmin(username, password);
    return sendSuccess(res, result, MESSAGES.LOGIN_SUCCESS);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return sendError(res, MESSAGES.INVALID_CREDENTIALS, 401);
    }
    next(error);
  }
};

/**
 * Superadmin login
 */
const superadminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 'Username and password are required', 400);
    }

    const result = await authService.loginSuperadmin(username, password);
    return sendSuccess(res, result, MESSAGES.LOGIN_SUCCESS);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return sendError(res, MESSAGES.INVALID_CREDENTIALS, 401);
    }
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 'Username and password are required', 400);
    }

    const result = await authService.createAdmin(username, password);
    return sendSuccess(res, result, MESSAGES.ADMIN_CREATED, 201);
  } catch (error) {
    if (error.code === 'P2002') {
      return sendError(res, 'Username already exists', 409);
    }
    next(error);
  }
};

module.exports = {
  participantLogin,
  adminLogin,
  superadminLogin,
  createAdmin,
};
