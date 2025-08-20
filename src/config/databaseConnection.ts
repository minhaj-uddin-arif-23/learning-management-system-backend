import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env File');
    }
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log('Database Connection Successful!');
  } catch (error: any) {
    console.error('Database Connection Failed:', error.message || error);
    process.exit(1);
  }
};