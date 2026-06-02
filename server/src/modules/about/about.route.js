const express = require('express');
const controller = require('./about.controller');
const { validate } = require('../../middleware/validate.middleware');
const { updateAboutSchema } = require('./about.validation');

const publicAboutRouter = express.Router();
publicAboutRouter.get('/', controller.getAbout);

const adminAboutRouter = express.Router();
adminAboutRouter.get('/', controller.getAbout);
adminAboutRouter.put('/', validate(updateAboutSchema), controller.updateAbout);

module.exports = { publicAboutRouter, adminAboutRouter };
