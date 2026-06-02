const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.dbUserId = decoded.dbUserId || decoded.sub || null;
    req.auth = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = { authMiddleware };
