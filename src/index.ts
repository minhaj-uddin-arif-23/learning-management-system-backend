import dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const app = await createServer();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error: any) {
    console.error('Server Startup Failed:', error.message || error);
    process.exit(1);
  }
};

startServer();