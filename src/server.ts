import express from 'express';
import cors from 'cors';
// import { connectDB } from './config/db';
// import { errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import { connectDB } from '../src/config/databaseConnection';
// import courseRoutes from './routes/courseRoutes';
// import moduleRoutes from './routes/moduleRoutes';
// import lectureRoutes from './routes/lectureRoutes';
// import progressRoutes from './routes/progressRoutes';

export const createServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static('src/uploads'));

  // Routes
  app.use('/api/auth', authRoutes);
  // app.use('/api/courses', courseRoutes);
  // app.use('/api/modules', moduleRoutes);
  // app.use('/api/lectures', lectureRoutes);
  // app.use('/api/progress', progressRoutes);

  // Error Handler
  // app.use(errorHandler);

  // Connect to MongoDB
  await connectDB();

  return app;
};