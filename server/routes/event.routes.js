import express from "express";
import {
  createEvent,
  getEvents,
  getEventOptions,
  toggleUpvoteEvent,
  registerEvent,
} from "../controllers/event.controller.js";
import { protect, optionalProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", optionalProtect, getEvents);
router.get("/options", getEventOptions);
router.post("/", protect, createEvent);
router.put("/:id/upvote", protect, toggleUpvoteEvent);
router.post("/:id/register", protect, registerEvent);

export default router;
