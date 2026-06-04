const authService = require('./auth.service');
const { env } = require('../../config/env');

const login = (req, res) => {
  const token = authService.loginAdmin(req.body?.password);
  if (!token) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSecure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return res.json({ success: true });
};

const logout = (_req, res) => {
  res.clearCookie('token', { path: '/' });
  return res.json({ success: true });
};

const me = (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.json({ authenticated: false });
  }
  try {
    authService.verifyToken(token);
    return res.json({ authenticated: true });
  } catch {
    res.clearCookie('token', { path: '/' });
    return res.json({ authenticated: false });
  }
};

module.exports = { login, logout, me };
