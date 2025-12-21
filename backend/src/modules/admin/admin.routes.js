const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { verifyToken } = require('../../middlewares/session.middleware');
const { adminOnly } = require('../../middlewares/role.middleware');

// All routes require admin authentication
router.use(verifyToken);
router.use(adminOnly);

// Team routes
router.get('/teams', adminController.getAllTeams);
router.get('/teams/:teamId', adminController.getTeamById);
router.get('/teams/:teamId/progress', adminController.getTeamProgress);

// Checkpoint routes
router.get('/checkpoints/pending', adminController.getPendingCheckpoints);
router.post('/checkpoints/:checkpointId/assign-question', adminController.assignQuestion);
router.post('/checkpoints/:checkpointId/mark', adminController.markQuestion);

// Question routes
router.get('/questions/available', adminController.getAvailableQuestions);

module.exports = router;

