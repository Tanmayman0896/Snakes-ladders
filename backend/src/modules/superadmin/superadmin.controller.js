const superadminService = require('./superadmin.service');
const { sendSuccess, sendError, sendNotFound, sendBadRequest, sendCreated } = require('../../utils/response.util');
const { MESSAGES } = require('../../config/constants');
const { generateRandomPassword } = require('../../utils/password.util');

const createTeam = async (req, res, next) => {
  try {
    const { teamName, members } = req.body;

    if (!teamName || !members || !Array.isArray(members) || members.length === 0) {
      return sendBadRequest(res, 'Team name and members are required');
    }

    const password = generateRandomPassword(8);
    const team = await superadminService.createTeam(teamName, members, password);

    return sendCreated(res, team, MESSAGES.TEAM_CREATED);
  } catch (error) {
    next(error);
  }
};

const updateTeamPassword = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { newPassword } = req.body;

    const password = newPassword || generateRandomPassword(8);
    await superadminService.updateTeamPassword(teamId, password);

    return sendSuccess(res, { newPassword: password }, MESSAGES.PASSWORD_UPDATED);
  } catch (error) {
    next(error);
  }
};

const disqualifyTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await superadminService.disqualifyTeam(teamId);

    return sendSuccess(res, team, MESSAGES.TEAM_DISQUALIFIED);
  } catch (error) {
    next(error);
  }
};

const reinstateTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await superadminService.reinstateTeam(teamId);

    return sendSuccess(res, team, 'Team reinstated successfully');
  } catch (error) {
    next(error);
  }
};

const changeTeamRoom = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { roomNumber } = req.body;

    if (!roomNumber || typeof roomNumber !== 'number') {
      return sendBadRequest(res, 'Valid room number is required');
    }

    const team = await superadminService.changeTeamRoom(teamId, roomNumber);
    return sendSuccess(res, team, MESSAGES.ROOM_UPDATED);
  } catch (error) {
    if (error.message === 'Invalid room number') {
      return sendBadRequest(res, error.message);
    }
    next(error);
  }
};

const adjustTeamTimer = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { seconds, reason } = req.body;

    if (typeof seconds !== 'number') {
      return sendBadRequest(res, 'Seconds must be a number');
    }

    const team = await superadminService.adjustTeamTimer(teamId, seconds, reason);
    return sendSuccess(res, team, MESSAGES.TIMER_UPDATED);
  } catch (error) {
    next(error);
  }
};

const setTeamTimer = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { totalSeconds, reason } = req.body;

    if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
      return sendBadRequest(res, 'Total seconds must be a non-negative number');
    }

    const team = await superadminService.setTeamTimer(teamId, totalSeconds, reason);
    return sendSuccess(res, team, MESSAGES.TIMER_UPDATED);
  } catch (error) {
    next(error);
  }
};

const undoCheckpoint = async (req, res, next) => {
  try {
    const { checkpointId } = req.params;
    const result = await superadminService.undoCheckpoint(checkpointId);

    return sendSuccess(res, result, MESSAGES.CHECKPOINT_UNDONE);
  } catch (error) {
    if (error.message === 'Checkpoint not found') {
      return sendNotFound(res, MESSAGES.CHECKPOINT_NOT_FOUND);
    }
    next(error);
  }
};

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await superadminService.getAllTeamsWithDetails();
    return sendSuccess(res, teams, 'Teams fetched successfully');
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendBadRequest(res, 'Username and password are required');
    }

    const admin = await superadminService.createAdmin(username, password);
    return sendCreated(res, { id: admin.id, username: admin.username }, MESSAGES.ADMIN_CREATED);
  } catch (error) {
    if (error.code === 'P2002') {
      return sendBadRequest(res, 'Username already exists');
    }
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    await superadminService.deleteAdmin(adminId);

    return sendSuccess(res, null, 'Admin deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await superadminService.getAllAdmins();
    return sendSuccess(res, admins, 'Admins fetched successfully');
  } catch (error) {
    next(error);
  }
};

const addSnake = async (req, res, next) => {
  try {
    const { startPos, endPos } = req.body;

    if (!startPos || !endPos) {
      return sendBadRequest(res, 'Start and end positions are required');
    }

    const snake = await superadminService.addSnake(startPos, endPos);
    return sendCreated(res, snake, 'Snake added successfully');
  } catch (error) {
    if (error.message.includes('Snake start position')) {
      return sendBadRequest(res, error.message);
    }
    next(error);
  }
};

const removeSnake = async (req, res, next) => {
  try {
    const { snakeId } = req.params;
    await superadminService.removeSnake(snakeId);

    return sendSuccess(res, null, 'Snake removed successfully');
  } catch (error) {
    next(error);
  }
};

const getBoardRules = async (req, res, next) => {
  try {
    const rules = await superadminService.getAllBoardRules();
    return sendSuccess(res, rules, 'Board rules fetched successfully');
  } catch (error) {
    next(error);
  }
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
  getAllTeams,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  addSnake,
  removeSnake,
  getBoardRules,
};
