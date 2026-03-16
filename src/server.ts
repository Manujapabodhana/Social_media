import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { AppDataSource } from './config/database';

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.log('Starting server without database connection...');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (database unavailable)`);
    });
  });