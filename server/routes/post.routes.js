import express from "express";
import { 
  getPosts, 
  createPost, 
  getPostById, 
  updatePost,
  deletePost,
  getPostAnswers, 
  createAnswer, 
  createReply,
  votePost,
  voteAnswer,
  acceptAnswer,
  votePoll,
  voteQuiz
} from "../controllers/post.controller.js";
import { protect, optionalProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", optionalProtect, getPosts);
router.post("/", protect, createPost);
router.get("/:id", optionalProtect, getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.put("/:id/vote", protect, votePost);
router.put("/:id/like", protect, votePost);
router.post("/:id/poll/vote", protect, votePoll);
router.post("/:id/quiz/vote", protect, voteQuiz);
router.get("/:id/answers", getPostAnswers);
router.post("/:id/answers", protect, createAnswer);
router.put("/answers/:answerId/vote", protect, voteAnswer);
router.put("/answers/:answerId/accept", protect, acceptAnswer);
router.post("/answers/:answerId/replies", protect, createReply);

export default router;
