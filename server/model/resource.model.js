import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    size: {
      type: String,
      default: "",
    },
    downloads: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    externalUrl: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    domain: {
      type: String,
      default: "",
    },
    pages: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
