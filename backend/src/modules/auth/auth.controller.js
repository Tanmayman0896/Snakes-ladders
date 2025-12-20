const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const { MESSAGES } = require('../../config/constants');


const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 'Username and password are required', 400);
    }

    const result = await authService.login(username, password);
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

//Create a new user

const createUser = async (req, res, next) => {
  try {
    const { username, password, role, teamId } = req.body;

    if (!username || !password || !role) {
      return sendError(res, 'Username, password, and role are required', 400);
    }

    const validRoles = ['PARTICIPANT', 'ADMIN', 'SUPERADMIN'];
    if (!validRoles.includes(role.toUpperCase())) {
      return sendError(res, 'Invalid role. Must be PARTICIPANT, ADMIN, or SUPERADMIN', 400);
    }

    const result = await authService.createUser(username, password, role, teamId);
    return sendSuccess(res, result, 'User created successfully', 201);
  } catch (error) {
    if (error.code === 'P2002') {
      return sendError(res, 'Username already exists', 409);
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
  login,
  createUser,
  createAdmin,
};
