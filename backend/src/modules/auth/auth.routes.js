const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { verifyToken } = require('../../middlewares/session.middleware');
const { superadminOnly } = require('../../middlewares/role.middleware');

// Public routes
router.post('/participant/login', authController.participantLogin);
router.post('/admin/login', authController.adminLogin);
router.post('/superadmin/login', authController.superadminLogin);

// Protected routes (superadmin only)
router.post('/admin/create', verifyToken, superadminOnly, authController.createAdmin);

module.exports = router;
