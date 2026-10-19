import express from "express";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";
import reelRoutes from "./reel.routes.js";
import resourceRoutes from "./resource.routes.js";
import eventRoutes from "./event.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/reels", reelRoutes);
router.use("/resources", resourceRoutes);
router.use("/events", eventRoutes);

export default router;
