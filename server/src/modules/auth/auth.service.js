const jwt = require('jsonwebtoken');
const { env } = require('../../config/env');

const loginAdmin = (password) => {
  if (!password || password !== env.adminPassword) {
    return null;
  }
  return jwt.sign({ role: 'admin', dbUserId: 'admin' }, env.jwtSecret, { expiresIn: '7d' });
};

const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

module.exports = { loginAdmin, verifyToken };
