import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URL =
      process.env.MONGO_URL || "mongodb://localhost:27017/blogs";
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting database:", error);
  }
};
