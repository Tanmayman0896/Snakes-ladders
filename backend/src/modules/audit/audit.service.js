const prisma = require('../../config/db');

// Audit action types
const AUDIT_ACTIONS = {
  // Auth actions
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAILED: 'LOGIN_FAILED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  
  // Team actions
  TEAM_CREATED: 'TEAM_CREATED',
  TEAM_UPDATED: 'TEAM_UPDATED',
  TEAM_DISQUALIFIED: 'TEAM_DISQUALIFIED',
  TEAM_REINSTATED: 'TEAM_REINSTATED',
  TEAM_ROOM_CHANGED: 'TEAM_ROOM_CHANGED',
  
  // Game actions
  DICE_ROLLED: 'DICE_ROLLED',
  CHECKPOINT_REACHED: 'CHECKPOINT_REACHED',
  CHECKPOINT_APPROVED: 'CHECKPOINT_APPROVED',
  CHECKPOINT_UNDONE: 'CHECKPOINT_UNDONE',
  
  // Question actions
  QUESTION_ASSIGNED: 'QUESTION_ASSIGNED',
  QUESTION_ANSWERED: 'QUESTION_ANSWERED',
  ANSWER_MARKED_CORRECT: 'ANSWER_MARKED_CORRECT',
  ANSWER_MARKED_INCORRECT: 'ANSWER_MARKED_INCORRECT',
  HINT_REQUESTED: 'HINT_REQUESTED',
  
  // Admin actions
  TIMER_ADJUSTED: 'TIMER_ADJUSTED',
  TIMER_SET: 'TIMER_SET',
  QUESTION_CREATED: 'QUESTION_CREATED',
  QUESTION_UPDATED: 'QUESTION_UPDATED',
  QUESTION_DELETED: 'QUESTION_DELETED',
  
  // System actions
  GAME_STARTED: 'GAME_STARTED',
  GAME_PAUSED: 'GAME_PAUSED',
  GAME_ENDED: 'GAME_ENDED',
};

// Map action to user-friendly description
const getActionDescription = (action, details) => {
  const detailsObj = typeof details === 'string' ? JSON.parse(details || '{}') : (details || {});
  
  switch (action) {
    case AUDIT_ACTIONS.LOGIN:
      return 'Login';
    case AUDIT_ACTIONS.LOGOUT:
      return 'Logout';
    case AUDIT_ACTIONS.LOGIN_FAILED:
      return 'Login Failed';
    case AUDIT_ACTIONS.TEAM_CREATED:
      return 'Create';
    case AUDIT_ACTIONS.TEAM_DISQUALIFIED:
      return 'Update';
    case AUDIT_ACTIONS.TEAM_REINSTATED:
      return 'Update';
    case AUDIT_ACTIONS.CHECKPOINT_APPROVED:
      return 'Update';
    case AUDIT_ACTIONS.CHECKPOINT_REACHED:
      return 'Checkpoint';
    case AUDIT_ACTIONS.QUESTION_ASSIGNED:
      return 'Update';
    case AUDIT_ACTIONS.DICE_ROLLED:
      return 'Update';
    default:
      return action;
  }
};

// Log an audit event
const logAudit = async ({
  action,
  actor,
  actorRole = 'participant',
  target = '',
  details = {},
}) => {
  try {
    const detailsStr = typeof details === 'object' ? JSON.stringify(details) : details;
    
    const auditEntry = await prisma.auditLog.create({
      data: {
        actor,
        action,
        target,
        details: detailsStr,
      },
    });
    
    console.log('[AUDIT]', action, actor, target);
    return auditEntry;
  } catch (error) {
    console.error('Failed to log audit event:', error);
    return null;
  }
};
const logLogin = async (actor, role, success = true) => {
  return logAudit({
    action: success ? AUDIT_ACTIONS.LOGIN : AUDIT_ACTIONS.LOGIN_FAILED,
    actor,
    actorRole: role,
    target: '',
    details: { role, success, message: success ? `${role} logged in` : `${role} login failed` },
  });
};

const logLogout = async (actor, role) => {
  return logAudit({
    action: AUDIT_ACTIONS.LOGOUT,
    actor,
    actorRole: role,
    target: '',
    details: { role, message: `${role} logged out` },
  });
};

// Log dice roll
const logDiceRoll = async (actor, teamName, diceValue, fromPosition, toPosition) => {
  return logAudit({
    action: AUDIT_ACTIONS.DICE_ROLLED,
    actor,
    actorRole: 'participant',
    target: teamName,
    details: { diceValue, fromPosition, toPosition, message: `Team ${teamName} rolled ${diceValue}, moved from ${fromPosition} to ${toPosition}` },
  });
};

// Log checkpoint event
const logCheckpoint = async (actor, actorRole, teamName, checkpointPos, action) => {
  return logAudit({
    action,
    actor,
    actorRole,
    target: teamName,
    details: { checkpointPos, message: `Checkpoint at position ${checkpointPos} for ${teamName}` },
  });
};

// Log question event
const logQuestionEvent = async (actor, actorRole, teamName, questionId, action) => {
  return logAudit({
    action,
    actor,
    actorRole,
    target: teamName,
    details: { questionId, message: `Question ${questionId} for ${teamName}` },
  });
};

const logAdminAction = async (actor, actorRole, action, target, details = {}) => {
  return logAudit({
    action,
    actor,
    actorRole,
    target,
    details,
  });
};

// Log team creation
const logTeamCreated = async (actor, teamName) => {
  return logAudit({
    action: AUDIT_ACTIONS.TEAM_CREATED,
    actor,
    actorRole: 'superadmin',
    target: teamName,
    details: { message: `Created new team ${teamName}` },
  });
};

// Log checkpoint reached (when team lands on a position after dice roll)
const logCheckpointReached = async (teamCode, teamName, checkpointNumber, position, room, isSnakePosition) => {
  const snakeInfo = isSnakePosition ? ' (Snake position!)' : '';
  return logAudit({
    action: AUDIT_ACTIONS.CHECKPOINT_REACHED,
    actor: teamCode,
    actorRole: 'participant',
    target: teamName,
    details: { 
      role: 'participant',
      checkpointNumber, 
      position, 
      room,
      isSnakePosition,
      message: `${teamName} reached checkpoint #${checkpointNumber} at position ${position}, room ${room}${snakeInfo}` 
    },
  });
};

// Get audit logs for a team
const getTeamAuditLogs = async (teamName, limit = 50) => {
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { actor: teamName },
        { target: teamName },
      ],
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return logs;
};

// Get audit logs for a user
const getUserAuditLogs = async (username, limit = 50) => {
  const logs = await prisma.auditLog.findMany({
    where: { actor: username },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return logs;
};

// Get all audit logs (for superadmin)
const getAllAuditLogs = async (query, limit) => {
  const logs = await prisma.auditLog.findMany({
    where: query ? {
      actor: {contains: query},
    } : {},
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  
  // Transform logs to match frontend expected format
  return logs.map(log => {
    const details = log.details ? (typeof log.details === 'string' ? JSON.parse(log.details) : log.details) : {};
    const role = details.role || 'participant';
    
    return {
      id: log.id,
      userId: log.actor,
      userRole: role,
      action: getActionDescription(log.action, details),
      details: details.message || log.target || log.action,
      timestamp: log.createdAt.toISOString(),
    };
  });
};

module.exports = {
  AUDIT_ACTIONS,
  logAudit,
  logLogin,
  logLogout,
  logDiceRoll,
  logCheckpoint,
  logCheckpointReached,
  logQuestionEvent,
  logAdminAction,
  logTeamCreated,
  getTeamAuditLogs,
  getUserAuditLogs,
  getAllAuditLogs,
  getActionDescription,
};
