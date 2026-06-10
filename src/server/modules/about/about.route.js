const express = require('express');
const controller = require('./about.controller');

const aboutRouter = express.Router();
aboutRouter.get('/', controller.getAbout);

module.exports = { aboutRouter };
