import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import { connectDB } from '../src/config/databaseConnection';
import { globalErrorHandler } from '../src/middlewares/error';
import { courseRouter } from '../src/routes/courseRoutes';


export const createServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static('src/uploads'));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/course',courseRouter)

  // Error Handler
  app.use(globalErrorHandler);

  // Connect to MongoDB
  await connectDB();

  return app;
};