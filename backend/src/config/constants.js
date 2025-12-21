// Game Constants
const GAME_CONFIG = {
  BOARD_SIZE: 100,
  DICE_MIN: 1,
  DICE_MAX: 6,
  TOTAL_ROOMS: 10,
  TOTAL_TEAMS: 50,
  TEAMS_PER_ROOM: 5,
  TOTAL_MAPS: 5,
  SNAKE_PENALTY_SECONDS: 180, // 3 minutes in seconds
  STARTING_POSITION: 1,
};

// Room numbers (1-10)
const ROOMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Roles for authentication
const ROLES = {
  PARTICIPANT: 'participant',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

// JWT Configuration
const JWT_CONFIG = {
  EXPIRES_IN: '24h',
};

// Response Messages
const MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',

  // Team
  TEAM_CREATED: 'Team created successfully',
  TEAM_UPDATED: 'Team updated successfully',
  TEAM_NOT_FOUND: 'Team not found',
  TEAM_DISQUALIFIED: 'Team has been disqualified',
  TEAM_ALREADY_DISQUALIFIED: 'Team is already disqualified',
  PASSWORD_UPDATED: 'Password updated successfully',
  ROOM_UPDATED: 'Room updated successfully',
  TIMER_UPDATED: 'Timer updated successfully',

  // Dice
  DICE_ROLLED: 'Dice rolled successfully',
  CANNOT_ROLL_DICE: 'Cannot roll dice - pending checkpoint exists',
  TEAM_COMPLETED: 'Team has already completed the game',

  // Checkpoint
  CHECKPOINT_APPROVED: 'Checkpoint approved successfully',
  CHECKPOINT_NOT_FOUND: 'Checkpoint not found',
  CHECKPOINT_ALREADY_PROCESSED: 'Checkpoint already processed',
  CHECKPOINT_UNDONE: 'Checkpoint undone successfully',

  // Question
  QUESTION_ASSIGNED: 'Question assigned successfully',
  QUESTION_MARKED: 'Question marked successfully',
  QUESTION_CREATED: 'Question created successfully',
  QUESTION_UPDATED: 'Question updated successfully',
  QUESTION_DELETED: 'Question deleted successfully',
  QUESTION_NOT_FOUND: 'Question not found',
  QUESTION_ALREADY_ASSIGNED: 'Question is already assigned to another team',
  NO_AVAILABLE_QUESTIONS: 'No available questions',

  // Admin
  ADMIN_CREATED: 'Admin created successfully',

  // General
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
};

module.exports = {
  GAME_CONFIG,
  ROOMS,
  ROLES,
  JWT_CONFIG,
  MESSAGES,
};

