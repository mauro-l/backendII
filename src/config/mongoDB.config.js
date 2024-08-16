import mongoose from "mongoose";
//import { seedUserToDB } from "../seed/seedProducts.js";
import env from "./env.config.js";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(env.MONGO_URL);
    console.log("MongoDB connected 🌱");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
