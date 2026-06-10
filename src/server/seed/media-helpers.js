const fs = require('fs');
const path = require('path');
const { createMedia } = require('../modules/media/media.service');

const MIME_BY_EXT = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function guessMime(filename, fallback = 'application/octet-stream') {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXT[ext] || fallback;
}

async function seedMediaFromFile(filePath, folder = 'images') {
  const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const buffer = fs.readFileSync(absolute);
  const filename = path.basename(absolute);
  const mimeType = guessMime(filename);

  const media = await createMedia({ buffer, mimeType, filename, folder });
  return media.url;
}

async function seedMediaFromUrl(url, folder = 'images') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch media: ${url} (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const pathname = new URL(url).pathname;
  const filename = path.basename(pathname) || 'asset';
  const mimeType = response.headers.get('content-type')?.split(';')[0] || guessMime(filename);

  const media = await createMedia({ buffer, mimeType, filename, folder });
  return media.url;
}

module.exports = { seedMediaFromFile, seedMediaFromUrl };
