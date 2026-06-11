const { Media } = require('./media.model');

const createMedia = async ({ buffer, mimeType, filename = '', folder = 'images' }) => {
  const doc = await Media.create({
    filename,
    mimeType,
    size: buffer.length,
    folder,
    data: buffer,
  });

  return {
    id: doc._id.toString(),
    url: `/api/media/${doc._id}`,
    mimeType: doc.mimeType,
    size: doc.size,
  };
};

const getMediaById = async (id) =>
  Media.findById(id).select('mimeType size data').lean();

module.exports = { createMedia, getMediaById };
