const { getMediaById } = require('./media.service');

const streamMedia = async (req, res, next) => {
  try {
    const doc = await getMediaById(req.params.id);
    if (!doc?.data?.length) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.setHeader('Content-Type', doc.mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Length', doc.data.length);
    return res.send(doc.data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { streamMedia };
