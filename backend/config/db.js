import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" DB Error:", error);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;