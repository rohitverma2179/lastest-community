import app from "../app.js";
import connectDB from "../config/database.js";
let dbConnected = false;

export default async function handler(req, res) {
  try {
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
      console.log("[DB] Connected");
    }

    return app(req, res);
  } catch (error) {
    console.error("[VERCEL ERROR]", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}