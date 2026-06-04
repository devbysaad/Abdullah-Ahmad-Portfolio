const { Router } = require('express');
const { uploadImage } = require('./upload.controller');
const { upload } = require('./upload.middleware');

const uploadRouter = Router();

uploadRouter.post('/', upload.single('file'), uploadImage);

module.exports = { uploadRouter };
