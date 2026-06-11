const DEFAULT_DB = 'abdullah-portfolio';

/** Ensure Atlas URI has a database name + standard serverless query params */
function normalizeMongoUri(raw) {
  let uri = raw?.trim();
  if (!uri) {
    throw new Error('MONGODB_URI is empty');
  }

  // mongodb+srv://user:pass@host/  → append database name
  const hasDatabase = /mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/.test(uri);
  if (!hasDatabase) {
    uri = `${uri.replace(/\/$/, '')}/${DEFAULT_DB}`;
  }

  if (!/retryWrites=/.test(uri)) {
    uri += `${uri.includes('?') ? '&' : '?'}retryWrites=true&w=majority`;
  }

  return uri;
}

module.exports = { normalizeMongoUri, DEFAULT_DB };
