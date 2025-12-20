const prisma = require('../../prisma/client');
const { hashPassword, comparePassword } = require('../../utils/password.util');
const { generateToken } = require('../../middlewares/session.middleware');
const { ROLES } = require('../../config/constants');

 //login for all user types

const login = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      team: {
        include: {
          members: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Check if participant team is disqualified
  if (user.role === 'PARTICIPANT' && user.team?.status === 'DISQUALIFIED') {
    throw new Error('Team has been disqualified');
  }

  const tokenPayload = {
    userId: user.id,
    username: user.username,
    role: user.role.toLowerCase(),
  };

  // Add team info for participants
  if (user.role === 'PARTICIPANT' && user.team) {
    tokenPayload.teamId = user.team.id;
    tokenPayload.teamCode = user.team.teamCode;
  }

  const token = generateToken(tokenPayload);

  const response = {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role.toLowerCase(),
    },
  };

  // Add team details for participants
  if (user.role === 'PARTICIPANT' && user.team) {
    response.team = {
      id: user.team.id,
      teamCode: user.team.teamCode,
      teamName: user.team.teamName,
      currentPosition: user.team.currentPosition,
      currentRoom: user.team.currentRoom,
      status: user.team.status,
      members: user.team.members,
    };
  }

  return response;
};


const createUser = async (username, password, role, teamId = null) => {
  const hashedPassword = await hashPassword(password);

  const userData = {
    username,
    password: hashedPassword,
    role: role.toUpperCase(),
  };

  if (teamId) {
    userData.teamId = teamId;
  }

  const user = await prisma.user.create({
    data: userData,
  });

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
};

  //Create admin user (for backward compatibility)
 
const createAdmin = async (username, password) => {
  return createUser(username, password, 'ADMIN');
};

module.exports = {
  login,
  createUser,
  createAdmin,
};
