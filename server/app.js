import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";

const app = express();

// ── Global middleware ────────────────────────────────────────────────────────
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Trust reverse proxy (Vercel / Nginx)
app.set("trust proxy", 1);

// ── Root route ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "Egrowth API is running successfully!" });
});

// ── API routes ───────────────────────────────────────────────────────────────
import routes from "./routes/index.js";
// import errorHandler from "./middleware/error.middleware.js";
app.use("/api/v1", routes);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.path}` });
});


// ── Global error handler (must be last) ──────────────────────────────────────
// app.use(errorHandler);

export default app;