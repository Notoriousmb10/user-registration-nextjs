import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err; // Rethrow the error to handle it in the caller
  }
};