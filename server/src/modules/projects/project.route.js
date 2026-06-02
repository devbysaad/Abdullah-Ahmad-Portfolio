const express = require('express');
const controller = require('./project.controller');
const { validate } = require('../../middleware/validate.middleware');
const { createProjectSchema, updateProjectSchema } = require('./project.validation');

const publicProjectRouter = express.Router();
publicProjectRouter.get('/', controller.getProjects);

const adminProjectRouter = express.Router();
adminProjectRouter.get('/', controller.getProjects);
adminProjectRouter.post('/', validate(createProjectSchema), controller.createProject);
adminProjectRouter.put('/:id', validate(updateProjectSchema), controller.updateProject);
adminProjectRouter.delete('/:id', controller.removeProject);

module.exports = { publicProjectRouter, adminProjectRouter };
