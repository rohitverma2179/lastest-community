import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      required: true,
      // KYA: Added "quiz" to support WhatsApp style quiz posts
      enum: ["question", "request", "resource", "job", "event", "poll", "quiz"],
    },
    pollOptions: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
        votedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
      }
    ],
    allowMultipleAnswers: { type: Boolean, default: false },
    // ==========================================================================
    // QUIZ OPTIONS SCHEMA (WhatsApp Style Quiz)
    // KYU: Quiz me har option me correct status (isCorrect) aur votes track karna jaruri hai.
    // ==========================================================================
    quizOptions: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
        votes: { type: Number, default: 0 },
        votedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
      }
    ],
    quizCorrectIndex: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    bounty: {
      type: Number,
      default: 0,
    },
    file: {
      type: { type: String },
      name: { type: String },
      size: { type: String },
      url: { type: String },
    },
    company: { type: String },
    location: { type: String },
    salary: { type: String },
    eventDate: { type: String },
    eventRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    counts: {
      upvotes: { type: Number, default: 0 },
      answers: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      responses: { type: Number, default: 0 },
      registrations: { type: Number, default: 0 },
    },
    upvotedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: []
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;