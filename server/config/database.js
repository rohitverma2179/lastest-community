import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import dns from "dns";

// Force Node.js to use public DNS servers for resolving MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  console.log(process.env.DATABASE_URL);
  try {
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in .env");
    }
    await mongoose.connect(DATABASE_URL);
    console.log("[DB] Connected to MongoDB via Mongoose.");
  } catch (error) {
    console.error("[DB] Connection error:", error);
    process.exit(1);
  }
};

export default connectDB;