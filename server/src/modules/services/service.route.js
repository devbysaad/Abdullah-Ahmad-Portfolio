const express = require('express');
const controller = require('./service.controller');
const { validate } = require('../../middleware/validate.middleware');
const { createServiceSchema, updateServiceSchema } = require('./service.validation');

const publicServiceRouter = express.Router();
publicServiceRouter.get('/', controller.getServices);

const adminServiceRouter = express.Router();
adminServiceRouter.get('/', controller.getServices);
adminServiceRouter.post('/', validate(createServiceSchema), controller.createService);
adminServiceRouter.put('/:id', validate(updateServiceSchema), controller.updateService);
adminServiceRouter.delete('/:id', controller.removeService);

module.exports = { publicServiceRouter, adminServiceRouter };
