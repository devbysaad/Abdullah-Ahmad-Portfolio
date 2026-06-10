const express = require('express');
const controller = require('./project.controller');

const projectRouter = express.Router();
projectRouter.get('/', controller.getProjects);

module.exports = { projectRouter };
