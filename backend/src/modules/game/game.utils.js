const { GAME_CONFIG, ROOMS } = require('../../config/constants');

const calculateNewPosition = (currentPosition, diceValue) => {
  const newPosition = currentPosition + diceValue;
  
  // Cannot exceed board size
  if (newPosition > GAME_CONFIG.BOARD_SIZE) {
    return currentPosition; // Stay at current position if would exceed 100
  }
  
  return newPosition;
};


const isWinningPosition = (position) => {
  return position === GAME_CONFIG.BOARD_SIZE;
};

const getRandomRoom = (currentRoom) => {
  const availableRooms = ROOMS.filter(room => room !== currentRoom);
  const randomIndex = Math.floor(Math.random() * availableRooms.length);
  return availableRooms[randomIndex];
};

const rollDice = () => {
  return Math.floor(Math.random() * GAME_CONFIG.DICE_MAX) + GAME_CONFIG.DICE_MIN;
};

const hasReachedGoal = (position) => {
  return position >= GAME_CONFIG.BOARD_SIZE;
};

module.exports = {
  calculateNewPosition,
  isWinningPosition,
  getRandomRoom,
  rollDice,
  hasReachedGoal,
};

