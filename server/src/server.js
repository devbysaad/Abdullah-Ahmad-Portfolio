require('./config/env');
const { env } = require('./config/env');
const { app } = require('./app');
const { connectDatabase } = require('./config/database');

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
