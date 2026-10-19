import Reel from "../model/reel.model.js";
import User from "../model/user.model.js";
import { uploadVideoToCloudinary } from "../services/cloudinary.service.js";

// Helper to parse YouTube Video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Seed mock data function removed

// @desc    Upload new reel
// @route   POST /api/v1/reels
export const uploadReel = async (req, res) => {
  try {
    const { title, shortDescription, videoType, youtubeUrl } = req.body;

    if (!title || !videoType) {
      return res.status(400).json({ success: false, message: "Title and video type are required." });
    }

    let videoUrl = "";
    let thumbnailUrl = "";

    if (videoType === "Cloudinary") {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Video file is required for Cloudinary upload." });
      }
      console.log(`[REEL] Uploading file to Cloudinary: ${req.file.originalname}`);
      const cloudResult = await uploadVideoToCloudinary(req.file.buffer);
      videoUrl = cloudResult.secure_url;
      // Auto generate a jpg thumbnail from videoUrl
      thumbnailUrl = videoUrl.replace(/\.[^/.]+$/, ".jpg");
    } else if (videoType === "YouTube") {
      if (!youtubeUrl) {
        return res.status(400).json({ success: false, message: "YouTube URL is required." });
      }
      const ytid = getYouTubeId(youtubeUrl);
      if (!ytid) {
        return res.status(400).json({ success: false, message: "Invalid YouTube URL format." });
      }
      videoUrl = youtubeUrl;
      thumbnailUrl = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
    } else {
      return res.status(400).json({ success: false, message: "Invalid video type." });
    }

    const reel = await Reel.create({
      title,
      shortDescription: shortDescription || "",
      videoType,
      videoUrl,
      thumbnailUrl,
      uploadedBy: req.user._id,
      status: "Active",
      views: 0,
      likes: 0,
      comments: [],
    });

    const populatedReel = await Reel.findById(reel._id)
      .populate("uploadedBy", "firstName lastName designation color reputation email");

    res.status(201).json({ success: true, reel: populatedReel });
  } catch (error) {
    console.error("[REEL] Upload reel error:", error);
    res.status(500).json({ success: false, message: "Server error uploading reel." });
  }
};

// @desc    Get all reels
// @route   GET /api/v1/reels
export const getAllReels = async (req, res) => {
  try {
    // Delete any mock/dummy reels
    await Reel.deleteMany({
      title: {
        $in: [
          "3 ways to defend an OFI vs an NC during certification audit",
          "Scope 3 Category 1 in 90 seconds — the spend-based shortcut that works",
          "LOTO violations I see every single audit — and the 1 fix",
          "Energy baseline regression — when to use what (with real numbers)",
          "My non-negotiables when hiring a Quality Manager",
          "HAZOP node walkthrough — live, on a real P&ID",
        ],
      },
    });

    const reels = await Reel.find({ status: "Active" })
      .populate("uploadedBy", "firstName lastName designation color reputation email")
      .populate("comments.author", "firstName lastName designation color reputation email")
      .sort({ createdAt: -1 });

    res.json({ success: true, reels });
  } catch (error) {
    console.error("[REEL] Get all reels error:", error);
    res.status(500).json({ success: false, message: "Server error fetching reels." });
  }
};

// @desc    Get single reel
// @route   GET /api/v1/reels/:id
export const getSingleReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
      .populate("uploadedBy", "firstName lastName designation color reputation email")
      .populate("comments.author", "firstName lastName designation color reputation email");

    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    res.json({ success: true, reel });
  } catch (error) {
    console.error("[REEL] Get single reel error:", error);
    res.status(500).json({ success: false, message: "Server error fetching reel." });
  }
};

// @desc    Update reel
// @route   PUT /api/v1/reels/:id
export const updateReel = async (req, res) => {
  try {
    const { title, shortDescription, status } = req.body;
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    // Only creator or admin can update
    if (reel.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this reel." });
    }

    if (title) reel.title = title;
    if (shortDescription !== undefined) reel.shortDescription = shortDescription;
    if (status) reel.status = status;

    await reel.save();

    const populatedReel = await Reel.findById(reel._id)
      .populate("uploadedBy", "firstName lastName designation color reputation email")
      .populate("comments.author", "firstName lastName designation color reputation email");

    res.json({ success: true, reel: populatedReel });
  } catch (error) {
    console.error("[REEL] Update reel error:", error);
    res.status(500).json({ success: false, message: "Server error updating reel." });
  }
};

// @desc    Delete reel
// @route   DELETE /api/v1/reels/:id
export const deleteReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    // Only creator or admin can delete
    if (reel.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this reel." });
    }

    await Reel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Reel deleted successfully." });
  } catch (error) {
    console.error("[REEL] Delete reel error:", error);
    res.status(500).json({ success: false, message: "Server error deleting reel." });
  }
};

// @desc    Increment view count
// @route   PUT /api/v1/reels/:id/view
export const incrementViewCount = async (req, res) => {
  try {
    const reel = await Reel.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    res.json({ success: true, views: reel.views });
  } catch (error) {
    console.error("[REEL] Increment views error:", error);
    res.status(500).json({ success: false, message: "Server error incrementing views." });
  }
};

// @desc    Like / Unlike reel
// @route   PUT /api/v1/reels/:id/like
export const likeUnlikeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    const userId = req.user._id;
    const hasLiked = reel.likedBy.includes(userId);

    if (hasLiked) {
      // Unlike
      reel.likedBy = reel.likedBy.filter((uid) => uid.toString() !== userId.toString());
      reel.likes = Math.max(0, reel.likes - 1);
    } else {
      // Like
      reel.likedBy.push(userId);
      reel.likes = reel.likes + 1;
    }

    await reel.save();

    res.json({ success: true, likes: reel.likes, likedBy: reel.likedBy });
  } catch (error) {
    console.error("[REEL] Like unlike error:", error);
    res.status(500).json({ success: false, message: "Server error toggling like." });
  }
};

// @desc    Add comment
// @route   POST /api/v1/reels/:id/comments
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text is required." });
    }

    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    const comment = {
      author: req.user._id,
      text,
    };

    reel.comments.push(comment);
    await reel.save();

    const populatedReel = await Reel.findById(reel._id)
      .populate("comments.author", "firstName lastName designation color reputation email");

    res.status(201).json({ success: true, comments: populatedReel.comments });
  } catch (error) {
    console.error("[REEL] Add comment error:", error);
    res.status(500).json({ success: false, message: "Server error adding comment." });
  }
};

// @desc    Get comments
// @route   GET /api/v1/reels/:id/comments
export const getComments = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
      .populate("comments.author", "firstName lastName designation color reputation email");

    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    res.json({ success: true, comments: reel.comments });
  } catch (error) {
    console.error("[REEL] Get comments error:", error);
    res.status(500).json({ success: false, message: "Server error getting comments." });
  }
};
