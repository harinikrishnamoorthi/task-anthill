import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb database successfully");
  } catch (error) {
    console.log("error connecting to mongodb database");
    process.exit(1);
  }
};

export default connectDB;
