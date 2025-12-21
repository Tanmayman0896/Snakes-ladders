const express = require('express');
const router = express.Router();
const superadminController = require('./superadmin.controller');
const { verifyToken } = require('../auth/auth.service');
const { superadminOnly } = require('../../middlewares/role.middleware');

// Apply authentication and superadmin check to all routes
router.use(verifyToken);
router.use(superadminOnly);

// Create a new team
router.post('/teams', superadminController.createTeam);

// Get all teams with details
router.get('/teams', superadminController.getAllTeams);

// Update team password
router.put('/teams/:teamId/password', superadminController.updateTeamPassword);

// Disqualify a team
router.post('/teams/:teamId/disqualify', superadminController.disqualifyTeam);

// Reinstate a team
router.post('/teams/:teamId/reinstate', superadminController.reinstateTeam);

// Change team room
router.put('/teams/:teamId/room', superadminController.changeTeamRoom);

// Adjust team timer (add/subtract)
router.post('/teams/:teamId/timer/adjust', superadminController.adjustTeamTimer);

// Set team timer to specific value
router.put('/teams/:teamId/timer', superadminController.setTeamTimer);

// Undo checkpoint
router.delete('/checkpoints/:checkpointId', superadminController.undoCheckpoint);

// Create admin
router.post('/admins', superadminController.createAdmin);

// Get all admins
router.get('/admins', superadminController.getAllAdmins);

// Delete admin
router.delete('/admins/:adminId', superadminController.deleteAdmin);

// Get all board rules
router.get('/board/rules', superadminController.getBoardRules);

// Add snake
router.post('/board/snakes', superadminController.addSnake);

// Remove snake
router.delete('/board/snakes/:snakeId', superadminController.removeSnake);

module.exports = router;

