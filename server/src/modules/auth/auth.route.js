const express = require('express');
const controller = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.get('/me', controller.me);

module.exports = { authRouter };
