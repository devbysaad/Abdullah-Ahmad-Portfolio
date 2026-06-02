const express = require('express');
const controller = require('./experience.controller');
const { validate } = require('../../middleware/validate.middleware');
const {
  createExperienceSchema,
  updateExperienceSchema,
} = require('./experience.validation');

const publicExperienceRouter = express.Router();
publicExperienceRouter.get('/', controller.getExperience);

const adminExperienceRouter = express.Router();
adminExperienceRouter.get('/', controller.getExperience);
adminExperienceRouter.post('/', validate(createExperienceSchema), controller.createExperience);
adminExperienceRouter.put('/:id', validate(updateExperienceSchema), controller.updateExperience);
adminExperienceRouter.delete('/:id', controller.removeExperience);

module.exports = { publicExperienceRouter, adminExperienceRouter };
