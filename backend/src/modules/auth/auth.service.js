const prisma = require('../../config/db');
const { hashPassword, comparePassword } = require('../../utils/password.util');
const { generateToken } = require('../../middlewares/session.middleware');
const { ROLES } = require('../../config/constants');
const { logLogin } = require('../audit/audit.service');

// login for all user types (only database users)
const login = async (username, password) => {
  console.log('Login attempt:', { username, hasPassword: !!password });
  
  // Check database for user
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

  // Log successful login
  await logLogin(user.username, user.role.toLowerCase(), true);

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

const getSystemSettings = async () => {
  const data = await prisma.systemSettings.findMany();
  const result = {};
  for (const obj of data) {
    result[obj.key] = obj.value;
  }

  return result;
}


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
  getSystemSettings,
};

