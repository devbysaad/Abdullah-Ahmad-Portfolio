const express = require('express');
const controller = require('./experience.controller');

const experienceRouter = express.Router();
experienceRouter.get('/', controller.getExperience);

module.exports = { experienceRouter };
