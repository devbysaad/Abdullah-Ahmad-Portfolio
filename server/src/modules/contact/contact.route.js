const express = require('express');
const controller = require('./contact.controller');
const { validate } = require('../../middleware/validate.middleware');
const { createContactSchema } = require('./contact.validation');

const contactRouter = express.Router();

contactRouter.post('/', validate(createContactSchema), controller.submitContact);

module.exports = { contactRouter };
