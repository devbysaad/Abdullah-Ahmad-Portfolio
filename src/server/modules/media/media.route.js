const { Router } = require('express');
const { streamMedia } = require('./media.controller');

const mediaRouter = Router();

mediaRouter.get('/:id', streamMedia);

module.exports = { mediaRouter };
