const prisma = require('../../config/db');
const { hashPassword } = require('../../utils/password.util');
const { generateTeamCode } = require('../../utils/random.util');
const { GAME_CONFIG, ROOMS } = require('../../config/constants');
const { logTeamCreated, logAdminAction, AUDIT_ACTIONS } = require('../audit/audit.service');
const { assignMapToTeam: assignMap, getAllBoardMaps, clearBoardCache } = require('../game/board.service');

// Helper function to find an available room with capacity from database
const findAvailableRoom = async () => {
  // Get all rooms with their capacities from database
  const rooms = await prisma.room.findMany();
  
  // Get team counts per room
  const roomCounts = await prisma.team.groupBy({
    by: ['currentRoom'],
    _count: { id: true },
    where: {
      status: 'ACTIVE', // Only count active teams
    },
  });

  // Create a map of room -> count
  const roomCountMap = {};
  roomCounts.forEach(rc => {
    roomCountMap[rc.currentRoom] = rc._count.id;
  });

  // Find first room with available capacity
  for (const room of rooms) {
    const count = roomCountMap[room.roomNumber] || 0;
    if (count < room.capacity) {
      return room.roomNumber;
    }
  }

  // If all rooms are full, throw error
  throw new Error('All rooms are full. Maximum capacity reached.');
};

// Helper function to auto-assign map based on FCFS (10 teams per map)
const findAvailableMap = async () => {
  const MAP_CAPACITY = 20;
  
  // Get all active maps
  const maps = await prisma.boardMap.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' }, // FCFS - use oldest maps first
  });

  if (maps.length === 0) {
    throw new Error('No active maps available. Please create maps first.');
  }

  // Get team counts per map
  const mapCounts = await prisma.team.groupBy({
    by: ['mapId'],
    _count: { id: true },
    where: {
      mapId: { not: null },
    },
  });

  // Create a map of mapId -> count
  const mapCountMap = {};
  mapCounts.forEach(mc => {
    mapCountMap[mc.mapId] = mc._count.id;
  });

  // Find first map with available capacity (FCFS)
  for (const map of maps) {
    const count = mapCountMap[map.id] || 0;
    if (count < MAP_CAPACITY) {
      return map.id;
    }
  }

  // If all maps are full, throw error (or return first map as fallback)
  throw new Error('All maps are at capacity (10 teams each)');
};

const createTeam = async (teamName, password, members) => {
  // Get the last team to determine team number
  const lastTeam = await prisma.team.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  let newTeamNumber = 1;
  if (lastTeam && lastTeam.teamCode) {
    // Extract number from teamCode (e.g., "TEAM001" -> 1)
    const teamNumber = parseInt(lastTeam.teamCode.replace("TEAM", ""), 10);
    newTeamNumber = teamNumber + 1;
  }

  // Format with leading zeros (e.g., 1 -> "001", 12 -> "012", 123 -> "123")
  const teamCode = `TEAM${newTeamNumber.toString().padStart(3, '0')}`;
  const hashedPassword = await hashPassword(password);
  const assignedRoom = await findAvailableRoom();
  const assignedMapId = await findAvailableMap(); // Auto-assign map (FCFS, 10 teams per map)

  console.log('Creating team:', { teamCode, teamName, assignedRoom, assignedMapId, hasPlainPassword: !!password, hasHashedPassword: !!hashedPassword });

  // Create team first
  const team = await prisma.team.create({
    data: {
      teamCode,
      teamName,
      currentRoom: assignedRoom,
      mapId: assignedMapId, // Auto-assign map
      members: {
        create: members.map(name => ({ name })),
      },
    },
    include: {
      members: true,
      map: true, // Include map details in response
    },
  });

  // Create User entry for login (teamCode as username)
  const user = await prisma.user.create({
    data: {
      username: teamCode,
      password: hashedPassword,
      role: 'PARTICIPANT',
      teamId: team.id,
    },
  });

  console.log('Created user:', { username: user.username, hasPassword: !!user.password, role: user.role });

  // Log team creation
  await logTeamCreated('superadmin', teamName);

  return { 
    ...team, 
    generatedPassword: password,
    loginUsername: teamCode,
  };
};


// Update team password in User table
const updateTeamPassword = async (teamId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  
  // Find the user with this teamId first
  const user = await prisma.user.findUnique({
    where: { teamId: teamId },
  });

  if (!user) {
    throw new Error('No user found for this team');
  }

  // Update the user's password
  return await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
};

const disqualifyTeam = async (teamId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: { status: 'DISQUALIFIED' },
  });
};


const reinstateTeam = async (teamId) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: { status: 'ACTIVE' },
  });
};

// Get available rooms with capacity from database
const getAvailableRooms = async (excludeTeamId = null) => {
  // Get all rooms with their capacities from database
  const rooms = await prisma.room.findMany();
  
  // Get team counts per room
  const roomCounts = await prisma.team.groupBy({
    by: ['currentRoom'],
    _count: { id: true },
    where: {
      status: 'ACTIVE',
      id: excludeTeamId ? { not: excludeTeamId } : undefined,
    },
  });

  // Create a map of room -> count
  const roomCountMap = {};
  roomCounts.forEach(rc => {
    roomCountMap[rc.currentRoom] = rc._count.id;
  });

  // Return all rooms with their capacities
  return rooms.map(roomData => ({
    room: roomData.roomNumber,
    capacity: roomData.capacity,
    teamsCount: roomCountMap[roomData.roomNumber] || 0,
    available: (roomCountMap[roomData.roomNumber] || 0) < roomData.capacity,
  }));
};

// Auto-assign team to a room with available capacity
const autoAssignTeamRoom = async (teamId) => {
  const availableRooms = await getAvailableRooms(teamId);
  
  // Filter only rooms with capacity
  const roomsWithCapacity = availableRooms.filter(r => r.available);
  
  if (roomsWithCapacity.length === 0) {
    throw new Error('All rooms are full. Cannot assign team to any room.');
  }
  
  // Sort by teams count (ascending) to balance load
  roomsWithCapacity.sort((a, b) => a.teamsCount - b.teamsCount);
  
  // Assign to the room with the least teams
  const bestRoom = roomsWithCapacity[0].room;
  
  return await prisma.team.update({
    where: { id: teamId },
    data: { currentRoom: bestRoom },
  });
};

//Change team room

const changeTeamRoom = async (teamId, newRoom) => {
  // Validate room exists in database
  const roomData = await prisma.room.findUnique({
    where: { roomNumber: newRoom }
  });

  if (!roomData) {
    throw new Error('Invalid room number');
  }

  // Check if the target room has capacity
  const teamsInRoom = await prisma.team.count({
    where: {
      currentRoom: newRoom,
      status: 'ACTIVE',
      id: { not: teamId }, // Exclude current team if already in this room
    },
  });

  if (teamsInRoom >= roomData.capacity) {
    throw new Error(`Room ${newRoom} is full. Maximum ${roomData.capacity} teams per room.`);
  }

  return await prisma.team.update({
    where: { id: teamId },
    data: { currentRoom: newRoom },
  });
};

const assignMapToTeam = async (teamId, mapId) => {
  // Verify map exists (mapId should be a string UUID)
  const map = await prisma.boardMap.findUnique({
    where: { id: String(mapId) },
  });
  
  if (!map) {
    throw new Error('Map not found');
  }
  
  // Clear cache for this team since map is changing
  clearBoardCache(teamId);
  
  return await assignMap(teamId, String(mapId));
};

const adjustTeamTimer = async (teamId, secondsToAdd, reason) => {
  const team = await prisma.team.update({
    where: { id: teamId },
    data: {
      totalTimeSec: { increment: secondsToAdd },
    },
  });

  // Log the time adjustment
  await prisma.timeLog.create({
    data: {
      teamId,
      seconds: secondsToAdd,
      reason: reason || 'Manual adjustment by superadmin',
    },
  });

  return team;
};

const setTeamTimer = async (teamId, totalSeconds, reason) => {
  const currentTeam = await prisma.team.findUnique({
    where: { id: teamId },
    select: { totalTimeSec: true },
  });

  const difference = totalSeconds - currentTeam.totalTimeSec;

  const team = await prisma.team.update({
    where: { id: teamId },
    data: { totalTimeSec: totalSeconds },
  });

  // Log the time change
  await prisma.timeLog.create({
    data: {
      teamId,
      seconds: difference,
      reason: reason || 'Timer set by superadmin',
    },
  });

  return team;
};

const undoCheckpoint = async (checkpointId) => {
  const checkpoint = await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: {
      team: true,
      questionAssign: true,
    },
  });

  if (!checkpoint) {
    throw new Error('Checkpoint not found');
  }

  // Get the previous checkpoint to restore position
  const previousCheckpoint = await prisma.checkpoint.findFirst({
    where: {
      teamId: checkpoint.teamId,
      checkpointNumber: checkpoint.checkpointNumber - 1,
    },
  });

  const newPosition = previousCheckpoint ? previousCheckpoint.positionAfter : 1;

  // Delete question assignment if exists
  if (checkpoint.questionAssign) {
    await prisma.questionAssignment.delete({
      where: { id: checkpoint.questionAssign.id },
    });
  }

  // Delete the checkpoint
  await prisma.checkpoint.delete({
    where: { id: checkpointId },
  });

  // Update team position and enable dice roll
  await prisma.team.update({
    where: { id: checkpoint.teamId },
    data: {
      currentPosition: newPosition,
      canRollDice: true,
    },
  });

  // Log the checkpoint undo to audit
  await logAdminAction(
    'superadmin',
    'superadmin',
    AUDIT_ACTIONS.CHECKPOINT_UNDONE,
    checkpoint.team.teamName,
    {
      checkpointId,
      checkpointNumber: checkpoint.checkpointNumber,
      previousPosition: checkpoint.positionAfter,
      newPosition,
      message: `Undid checkpoint #${checkpoint.checkpointNumber} for ${checkpoint.team.teamName}, position restored to ${newPosition}`
    }
  );

  return {
    message: 'Checkpoint undone successfully',
    newPosition,
    teamId: checkpoint.teamId,
    teamName: checkpoint.team.teamName,
  };
};

const getAllTeamsWithDetails = async () => {
  const teams = await prisma.team.findMany({
    include: {
      members: true,
      user: {
        select: {
          username: true,
        },
      },
      map: {
        select: {
          id: true,
          name: true,
        },
      },
      checkpoints: {
        orderBy: { checkpointNumber: 'desc' },
        include: {
          questionAssign: {
            include: { question: true },
          },
        },
      },
      timeLogs: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: [
      { currentPosition: 'desc' },
      { totalTimeSec: 'asc' },
    ],
  });

  // Calculate current time for all teams at once (single timestamp for consistency)
  const now = new Date();
  const nowTimestamp = now.getTime();
  
  return teams.map(team => {
    let currentTimeSec = team.totalTimeSec;
    
    // If timer is running, calculate elapsed time
    if (!team.timerPaused && team.status !== 'COMPLETED' && team.timerStartedAt) {
      const elapsedSinceStart = Math.floor((nowTimestamp - team.timerStartedAt.getTime()) / 1000);
      currentTimeSec = team.totalTimeSec + elapsedSinceStart;
    }
    
    return {
      ...team,
      totalTimeSec: currentTimeSec
    };
  });
};

const createAdmin = async (username, password) => {
  const hashedPassword = await hashPassword(password);

  return await prisma.adminLogin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

const deleteAdmin = async (adminId) => {
  return await prisma.adminLogin.delete({
    where: { id: adminId },
  });
};

const getAllAdmins = async () => {
  return await prisma.adminLogin.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
};

const addSnake = async (startPos, endPos) => {
  if (startPos <= endPos) {
    throw new Error('Snake start position must be greater than end position');
  }

  return await prisma.boardRule.create({
    data: {
      type: 'SNAKE',
      startPos,
      endPos,
    },
  });
};

const removeSnake = async (snakeId) => {
  return await prisma.boardRule.delete({
    where: { id: snakeId },
  });
};

const getAllBoardRules = async () => {
  return await prisma.boardRule.findMany({
    orderBy: { startPos: 'asc' },
  });
};

const getRoomCapacity = async () => {
  // Get all rooms with their capacities from database
  const rooms = await prisma.room.findMany({
    orderBy: { roomNumber: 'asc' }
  });
  
  // Get team counts per room
  const roomCounts = await prisma.team.groupBy({
    by: ['currentRoom'],
    _count: { id: true },
    where: {
      status: 'ACTIVE',
    },
  });

  // Create result with all rooms and their database capacities
  return rooms.map(roomData => {
    const teamCount = roomCounts.find(rc => rc.currentRoom === roomData.roomNumber);
    const currentTeams = teamCount ? teamCount._count.id : 0;
    return {
      room: roomData.roomNumber,
      currentTeams,
      maxTeams: roomData.capacity,
      available: currentTeams < roomData.capacity,
    };
  });
};

module.exports = {
  createTeam,
  updateTeamPassword,
  disqualifyTeam,
  reinstateTeam,
  changeTeamRoom,
  assignMapToTeam,
  adjustTeamTimer,
  setTeamTimer,
  undoCheckpoint,
  getAllTeamsWithDetails,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  addSnake,
  removeSnake,
  getAllBoardRules,
  getAllMaps: getAllBoardMaps,
  findAvailableRoom,
  getRoomCapacity,
};

