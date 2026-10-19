import express from "express";
import {
  getAllResources,
  uploadResource,
  downloadResource,
} from "../controllers/resource.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import resourceUpload from "../middleware/resourceUpload.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllResources);

// Protected routes
router.post("/", protect, resourceUpload.single("file"), uploadResource);
router.post("/:id/download", protect, downloadResource);

export default router;
