const adminService = require('./admin.service');
const { sendSuccess, sendError, sendNotFound, sendBadRequest } = require('../../utils/response.util');
const { MESSAGES } = require('../../config/constants');

 //get all teams
 
const getAllTeams = async (req, res, next) => {
  try {
    const teams = await adminService.getAllTeams();
    return sendSuccess(res, teams, 'Teams fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTeamById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await adminService.getTeamById(teamId);

    if (!team) {
      return sendNotFound(res, MESSAGES.TEAM_NOT_FOUND);
    }

    return sendSuccess(res, team, 'Team fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getPendingCheckpoints = async (req, res, next) => {
  try {
    const checkpoints = await adminService.getPendingCheckpoints();
    return sendSuccess(res, checkpoints, 'Pending checkpoints fetched successfully');
  } catch (error) {
    next(error);
  }
};

const assignQuestion = async (req, res, next) => {
  try {
    const { checkpointId } = req.params;
    const { questionId } = req.body;

    if (!questionId) {
      return sendBadRequest(res, 'Question ID is required');
    }

    const checkpoint = await adminService.getCheckpointById(checkpointId);
    if (!checkpoint) {
      return sendNotFound(res, MESSAGES.CHECKPOINT_NOT_FOUND);
    }

    if (checkpoint.questionAssign) {
      return sendBadRequest(res, 'Question already assigned to this checkpoint');
    }

    const assignment = await adminService.assignQuestionToCheckpoint(checkpointId, questionId);
    return sendSuccess(res, assignment, MESSAGES.QUESTION_ASSIGNED);
  } catch (error) {
    if (error.message === 'Question is already assigned to another team') {
      return sendBadRequest(res, MESSAGES.QUESTION_ALREADY_ASSIGNED);
    }
    next(error);
  }
};

const markQuestion = async (req, res, next) => {
  try {
    const { checkpointId } = req.params;
    const { isCorrect } = req.body;

    if (typeof isCorrect !== 'boolean') {
      return sendBadRequest(res, 'isCorrect must be a boolean');
    }

    const checkpoint = await adminService.getCheckpointById(checkpointId);
    if (!checkpoint) {
      return sendNotFound(res, MESSAGES.CHECKPOINT_NOT_FOUND);
    }

    if (!checkpoint.questionAssign) {
      return sendBadRequest(res, 'No question assigned to this checkpoint');
    }

    if (checkpoint.questionAssign.status !== 'PENDING') {
      return sendBadRequest(res, 'Question already marked');
    }

    const result = await adminService.markQuestionAnswer(checkpoint.questionAssign.id, isCorrect);
    return sendSuccess(res, result, MESSAGES.QUESTION_MARKED);
  } catch (error) {
    next(error);
  }
};

 //Get available questions
const getAvailableQuestions = async (req, res, next) => {
  try {
    const { type } = req.query;
    const questions = await adminService.getAvailableQuestions(type);
    return sendSuccess(res, questions, 'Available questions fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTeamProgress = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const progress = await adminService.getTeamProgress(teamId);
    return sendSuccess(res, progress, 'Team progress fetched successfully');
  } catch (error) {
    next(error);
  }
};

// Approve checkpoint (team physically reached the checkpoint)
const approveCheckpoint = async (req, res, next) => {
  try {
    const { checkpointId } = req.params;

    const checkpoint = await adminService.getCheckpointById(checkpointId);
    if (!checkpoint) {
      return sendNotFound(res, MESSAGES.CHECKPOINT_NOT_FOUND);
    }

    if (checkpoint.status === 'APPROVED') {
      return sendBadRequest(res, 'Checkpoint already approved');
    }

    const result = await adminService.approveCheckpoint(checkpointId);
    return sendSuccess(res, result, 'Checkpoint approved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  getPendingCheckpoints,
  assignQuestion,
  markQuestion,
  getAvailableQuestions,
  getTeamProgress,
  approveCheckpoint,
};

