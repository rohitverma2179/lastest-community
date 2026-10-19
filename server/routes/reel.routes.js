import express from "express";
import {
  uploadReel,
  getAllReels,
  getSingleReel,
  updateReel,
  deleteReel,
  incrementViewCount,
  likeUnlikeReel,
  addComment,
  getComments,
} from "../controllers/reel.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllReels);
router.get("/:id", getSingleReel);
router.put("/:id/view", incrementViewCount);
router.get("/:id/comments", getComments);

// Protected routes
router.post("/", protect, upload.single("video"), uploadReel);
router.put("/:id", protect, updateReel);
router.delete("/:id", protect, deleteReel);
router.put("/:id/like", protect, likeUnlikeReel);
router.post("/:id/comments", protect, addComment);

export default router;
