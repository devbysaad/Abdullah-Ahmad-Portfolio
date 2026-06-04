require('./config/env');
const { env } = require('./config/env');
const { app } = require('./app');
const { connectDatabase, disconnectDatabase } = require('./config/database');

const startServer = async () => {
  try {
    await connectDatabase();
    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
      if (env.isProduction) {
        console.log(`Serving client from /client/dist — allowed origins: ${env.clientUrls.join(', ')}`);
      }
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received — shutting down`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
