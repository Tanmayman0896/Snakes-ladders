const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { verifyToken } = require('../../middlewares/session.middleware');
const { superadminOnly } = require('../../middlewares/role.middleware');

// Public routes
router.post('/login', authController.login);

// Protected routes (superadmin only)
router.post('/user/create', verifyToken, superadminOnly, authController.createUser);
router.post('/admin/create', verifyToken, superadminOnly, authController.createAdmin);

module.exports = router;
