const { ROLES, MESSAGES } = require('../config/constants');
const { sendForbidden } = require('../utils/response.util');

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendForbidden(res, MESSAGES.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendForbidden(res, MESSAGES.FORBIDDEN);
    }

    next();
  };
};

// Participant only middleware
const participantOnly = requireRole(ROLES.PARTICIPANT);

// Admin only middleware
const adminOnly = requireRole(ROLES.ADMIN);

// Superadmin only middleware
const superadminOnly = requireRole(ROLES.SUPERADMIN);

// Admin or Superadmin middleware
const adminOrSuperadmin = requireRole(ROLES.ADMIN, ROLES.SUPERADMIN);

module.exports = {
  requireRole,
  participantOnly,
  adminOnly,
  superadminOnly,
  adminOrSuperadmin,
};

