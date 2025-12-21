const express = require('express');
const router = express.Router();
const questionController = require('./question.controller');
const { verifyToken } = require('../auth/auth.service');
const { adminOnly, superadminOnly } = require('../../middlewares/role.middleware');

// Apply authentication to all routes
router.use(verifyToken);
// Get all questions (admin can view)
router.get('/', adminOnly, questionController.getAllQuestions);

// Get question by ID (admin can view)
router.get('/:questionId', adminOnly, questionController.getQuestionById);

// Get question statistics (admin can view)
router.get('/stats/overview', adminOnly, questionController.getQuestionStats);

// Create question
router.post('/', superadminOnly, questionController.createQuestion);

// Update question
router.put('/:questionId', superadminOnly, questionController.updateQuestion);

// Delete question
router.delete('/:questionId', superadminOnly, questionController.deleteQuestion);

// Bulk create questions
router.post('/bulk', superadminOnly, questionController.bulkCreateQuestions);

// Toggle question active status
router.patch('/:questionId/toggle', superadminOnly, questionController.toggleQuestionStatus);

// Assign question to checkpoint
router.post('/checkpoints/:checkpointId/assign', adminOnly, questionController.assignQuestionToCheckpoint);

// Get random question for team
router.get('/random/:teamId', adminOnly, questionController.getRandomQuestion);

// Submit answer is called from participant routes

module.exports = router;

