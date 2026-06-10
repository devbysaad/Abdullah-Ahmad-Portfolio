const express = require('express');
const controller = require('./service.controller');

const serviceRouter = express.Router();
serviceRouter.get('/', controller.getServices);

module.exports = { serviceRouter };
