const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { MESSAGES } = require('../config/constants');
const { sendUnauthorized } = require('../utils/response.util');

//Verify JWT token middleware
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendUnauthorized(res, MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendUnauthorized(res, MESSAGES.INVALID_CREDENTIALS);
  }
};

//Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
  verifyToken,
  generateToken,
};

