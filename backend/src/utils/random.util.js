const { GAME_CONFIG, ROOMS } = require('../config/constants');

//Generate a random dice value between 1 and 6
const generateDiceValue = () => {
  return Math.floor(Math.random() * (GAME_CONFIG.DICE_MAX - GAME_CONFIG.DICE_MIN + 1)) + GAME_CONFIG.DICE_MIN;
};

//Get a random room different from the current room
const getRandomRoom = (currentRoom) => {
  const availableRooms = ROOMS.filter(room => room !== currentRoom);
  const randomIndex = Math.floor(Math.random() * availableRooms.length);
  return availableRooms[randomIndex];
};

//Generate a unique team code
const generateTeamCode = () => {
  const prefix = 'TEAM';
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}${randomNum}`;
};

//Generate a random ID for any purpose
const generateRandomId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = {
  generateDiceValue,
  getRandomRoom,
  generateTeamCode,
  generateRandomId,
};

