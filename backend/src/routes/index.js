const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('../modules/auth/auth.routes');
const participantRoutes = require('../modules/participant/participant.routes');
const adminRoutes = require('../modules/admin/admin.routes');
const superadminRoutes = require('../modules/superadmin/superadmin.routes');
const questionRoutes = require('../modules/questions/question.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/participant', participantRoutes);
router.use('/admin', adminRoutes);
router.use('/superadmin', superadminRoutes);
router.use('/questions', questionRoutes);

// API info
router.get('/', (req, res) => {
  res.json({
    message: 'Snakes & Ladders API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      participant: '/api/participant',
      admin: '/api/admin',
      superadmin: '/api/superadmin',
      questions: '/api/questions',
    },
  });
});

module.exports = router;

