const mongoose = require('mongoose');
const { env } = require('./env');

const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 15000,
    maxPoolSize: 10,
  });

  console.log('MongoDB connected');
};

const disconnectDatabase = async () => {
  await mongoose.connection.close();
};

module.exports = { connectDatabase, disconnectDatabase };
