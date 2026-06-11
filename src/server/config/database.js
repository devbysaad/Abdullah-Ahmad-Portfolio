const mongoose = require('mongoose');
const { env } = require('./env');

/** Reuse connection across Vercel serverless invocations */
const globalCache = globalThis;

if (!globalCache.__mongoose) {
  globalCache.__mongoose = { conn: null, promise: null };
}

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

const connectDatabase = async () => {
  if (globalCache.__mongoose.conn?.connection?.readyState === 1) {
    return globalCache.__mongoose.conn;
  }

  mongoose.set('strictQuery', true);

  if (!globalCache.__mongoose.promise) {
    globalCache.__mongoose.promise = mongoose
      .connect(env.mongoUri, {
        serverSelectionTimeoutMS: isServerless ? 20000 : 15000,
        socketTimeoutMS: 45000,
        maxPoolSize: isServerless ? 1 : 10,
        minPoolSize: 0,
        bufferCommands: false,
      })
      .then((conn) => {
        console.log('[mongo] connected', conn.connection.name);
        return conn;
      })
      .catch((err) => {
        globalCache.__mongoose.promise = null;
        globalCache.__mongoose.conn = null;
        throw err;
      });
  }

  globalCache.__mongoose.conn = await globalCache.__mongoose.promise;
  return globalCache.__mongoose.conn;
};

const disconnectDatabase = async () => {
  if (globalCache.__mongoose.conn) {
    await mongoose.connection.close();
    globalCache.__mongoose.conn = null;
    globalCache.__mongoose.promise = null;
  }
};

module.exports = { connectDatabase, disconnectDatabase };
