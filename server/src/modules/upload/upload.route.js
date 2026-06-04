const { Router } = require('express');
const { uploadImage } = require('./upload.controller');
const { upload } = require('./upload.middleware');

const uploadRouter = Router();

uploadRouter.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return next(err);
    return uploadImage(req, res, next);
  });
});

module.exports = { uploadRouter };
