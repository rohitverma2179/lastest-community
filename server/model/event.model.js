import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      default: "Quality",
    },
    format: {
      type: String,
      default: "Webinar",
    },
    type: {
      type: String,
      default: "WEBINAR",
    },
    tags: {
      type: [String],
      default: [],
    },
    joiningLink: {
      type: String,
      default: "#",
    },
    eventDate: {
      type: String,
      default: "Upcoming",
    },
    attendeeInfo: {
      type: String,
      default: "Limited Seats Available",
    },
    banner: {
      type: String,
      default: "",
    },
    bannerGradient: {
      type: String,
      default: "",
    },
    bannerType: {
      type: String,
      enum: ["custom", "gradient", "category"],
      default: "category",
    },
    headerColor: {
      type: String,
      default: "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]",
    },
    badges: {
      type: [String],
      default: ["UPCOMING"],
    },
    buttonType: {
      type: String,
      default: "REGISTER_FREE",
    },
    buttonText: {
      type: String,
      default: "Register Free",
    },
    author: {
      name: { type: String, default: "eGrowth Community" },
      title: { type: String, default: "LEAD ASSESSOR" },
      avatar: { type: String, default: "" },
      badge: { type: String, default: "CREATOR" },
      userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    stats: {
      applied: { type: Number, default: 0 },
      upvotes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
    postRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
