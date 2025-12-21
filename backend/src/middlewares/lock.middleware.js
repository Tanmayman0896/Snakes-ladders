const prisma = require('../prisma/client');
const { MESSAGES } = require('../config/constants');
const { sendBadRequest } = require('../utils/response.util');

const checkDiceLock = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;

    // Check if team exists and is active
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: {
        id: true,
        status: true,
        canRollDice: true,
      },
    });

    if (!team) {
      return sendBadRequest(res, MESSAGES.TEAM_NOT_FOUND);
    }

    if (team.status === 'COMPLETED') {
      return sendBadRequest(res, MESSAGES.TEAM_COMPLETED);
    }

    if (team.status === 'DISQUALIFIED') {
      return sendBadRequest(res, MESSAGES.TEAM_DISQUALIFIED);
    }

    if (!team.canRollDice) {
      return sendBadRequest(res, MESSAGES.CANNOT_ROLL_DICE);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkTeamActive = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { status: true },
    });

    if (!team) {
      return sendBadRequest(res, MESSAGES.TEAM_NOT_FOUND);
    }

    if (team.status !== 'ACTIVE') {
      return sendBadRequest(res, `Team is ${team.status.toLowerCase()}`);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkDiceLock,
  checkTeamActive,
};

