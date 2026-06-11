import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** Fast media stream — bypasses Express serverless bridge */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ success: false, message: 'Invalid media id' });
  }

  try {
    const { connectDatabase } = require('../../../server/config/database');
    const { getMediaById } = require('../../../server/modules/media/media.service');

    await connectDatabase();
    const doc = await getMediaById(id);

    const buffer = doc?.data?.buffer ? Buffer.from(doc.data.buffer) : doc?.data;
    if (!buffer?.length) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.setHeader('Content-Type', doc.mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (err) {
    console.error('[api/media]', id, err?.message);
    return res.status(500).json({ success: false, message: 'Could not load image' });
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
