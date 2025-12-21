const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;


 //Hash a plain text password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

//Compare plain text password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

 //Generate a random password
 
const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateRandomPassword,
};

