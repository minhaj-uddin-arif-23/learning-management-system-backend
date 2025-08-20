import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DataBase Connection Successfully !");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
