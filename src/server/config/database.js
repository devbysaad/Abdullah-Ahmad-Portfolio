const mongoose = require('mongoose');
const { env } = require('./env');

/** Reuse connection across Vercel serverless invocations */
const globalCache = globalThis;

if (!globalCache.__mongoose) {
  globalCache.__mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (globalCache.__mongoose.conn) {
    return globalCache.__mongoose.conn;
  }

  mongoose.set('strictQuery', true);

  if (!globalCache.__mongoose.promise) {
    globalCache.__mongoose.promise = mongoose
      .connect(env.mongoUri, {
        serverSelectionTimeoutMS: 15000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log('MongoDB connected');
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
