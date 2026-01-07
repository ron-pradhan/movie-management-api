import express from 'express';

import { config } from 'dotenv';

// Routes
import movieRoutes from './routes/movieRoutes.js';

config();

const app = express();

// API Route
app.use('/movies', movieRoutes);

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server stared on ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
