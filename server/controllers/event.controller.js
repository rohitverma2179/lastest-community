import Event from "../model/event.model.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import { getIO } from "../socket.js";

// Create a new Event Card
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      domain,
      format,
      type,
      tags,
      joiningLink,
      when,
      attendeeInfo,
      banner,
      bannerGradient,
      bannerType,
      headerColor,
      badges,
      buttonText,
      buttonType,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const formatValue = format || type || "Webinar";
    const authorName = req.user?.name || (req.user?.firstName ? `${req.user.firstName} ${req.user.lastName || ''}`.trim() : req.body.author?.name || "eGrowth Community");
    const authorTitle = req.user?.role || req.user?.designation || req.body.author?.title || "LEAD ASSESSOR";
    const authorAvatar = req.user?.avatar || req.body.author?.avatar || "";

    const newEvent = await Event.create({
      title: title.trim(),
      description: description.trim(),
      domain: domain || "Quality",
      format: formatValue,
      type: formatValue.toUpperCase(),
      tags: tags || [],
      joiningLink: joiningLink || "#",
      eventDate: when || req.body.eventDate || "Upcoming",
      attendeeInfo: attendeeInfo || (formatValue === "Webinar" ? "Anyone can join" : "Limited Seats"),
      banner: banner || "",
      bannerGradient: bannerGradient || "",
      bannerType: bannerType || "category",
      headerColor: headerColor || "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]",
      badges: badges && badges.length > 0 ? badges : ["UPCOMING"],
      author: {
        name: authorName,
        title: authorTitle,
        avatar: authorAvatar,
        badge: "CREATOR",
        userRef: req.user?._id,
      },
      buttonType: buttonType || "REGISTER_FREE",
      buttonText: buttonText || "Register Free",
      stats: {
        applied: 0,
        upvotes: 0,
        comments: 0,
      },
    });

    // Create corresponding Post of kind: "event" linked to newEvent
    let populatedPost = null;
    try {
      let authorId = req.user?._id;
      if (!authorId) {
        const defaultUser = await User.findOne();
        if (defaultUser) authorId = defaultUser._id;
      }

      if (authorId) {
        const newPost = await Post.create({
          kind: "event",
          author: authorId,
          title: title.trim(),
          body: description.trim(),
          tags: tags || [],
          eventDate: when || "Upcoming",
          eventRef: newEvent._id,
          counts: {
            upvotes: 0,
            answers: 0,
            views: 0,
            downloads: 0,
            comments: 0,
            responses: 0,
            registrations: 0,
          },
        });

        newEvent.postRef = newPost._id;
        await newEvent.save();

        populatedPost = await Post.findById(newPost._id)
          .populate("author", "firstName lastName designation reputation color email avatar coverPhoto")
          .populate("eventRef");
      }
    } catch (postErr) {
      console.error("[EVENT CONTROLLER] Error creating corresponding post for feed:", postErr);
    }

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
      post: populatedPost,
    });
  } catch (error) {
    console.error("[EVENT CONTROLLER] Error creating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("postRef").sort({ updatedAt: -1, createdAt: -1 });
    const userId = req.user?._id;

    // Fetch all linked posts for events that might not have postRef populated
    const eventIds = events.map(e => e._id);
    const linkedPosts = await Post.find({ eventRef: { $in: eventIds } });
    const postMap = new Map();
    linkedPosts.forEach(p => {
      postMap.set(String(p.eventRef), p);
    });

    const formattedEvents = events.map((evt) => {
      const e = evt.toObject();
      const linkedPost = postMap.get(String(e._id)) || e.postRef;
      const hasUpvoted = userId ? e.upvotedBy?.some((id) => String(id) === String(userId)) : false;
      const isBookmarked = userId ? e.bookmarkedBy?.some((id) => String(id) === String(userId)) : false;

      const commentsCount = linkedPost?.counts?.answers ?? linkedPost?.counts?.comments ?? e.stats?.comments ?? 0;
      const upvotesCount = e.stats?.upvotes ?? linkedPost?.counts?.upvotes ?? 0;

      return {
        ...e,
        id: e._id,
        postId: linkedPost?._id ? String(linkedPost._id) : undefined,
        hasUpvoted,
        isBookmarked,
        stats: {
          applied: e.stats?.applied || 0,
          upvotes: upvotesCount,
          comments: commentsCount,
        },
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedEvents.length,
      events: formattedEvents,
    });
  } catch (error) {
    console.error("[EVENT CONTROLLER] Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// Get Event Formats & Options
export const getEventOptions = async (req, res) => {
  try {
    const formatOptions = ["Webinar", "AMA", "Live clinic"];
    const domainOptions = ["Quality", "Environment", "Health", "Safety", "Welfare", "ESG", "Sustainability"];

    return res.status(200).json({
      success: true,
      formatOptions,
      domainOptions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Upvote Event
export const toggleUpvoteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const userId = req.user?._id;
    const hasUserUpvoted = userId ? event.upvotedBy.some((uId) => String(uId) === String(userId)) : false;

    const targetState = req.body?.hasUpvoted !== undefined ? req.body.hasUpvoted : !hasUserUpvoted;

    if (!targetState) {
      // Remove upvote
      if (userId) {
        event.upvotedBy = event.upvotedBy.filter((uId) => String(uId) !== String(userId));
      }
      if (hasUserUpvoted || event.stats.upvotes > 0) {
        event.stats.upvotes = Math.max(0, event.stats.upvotes - 1);
      }
    } else {
      // Add upvote
      if (userId && !hasUserUpvoted) {
        event.upvotedBy.push(userId);
      }
      if (!hasUserUpvoted) {
        event.stats.upvotes = (event.stats.upvotes || 0) + 1;
      }
    }

    await event.save();

    // Sync upvote status to corresponding Post document
    try {
      const post = await Post.findOne({ eventRef: id });
      if (post) {
        if (!post.upvotedBy) {
          post.upvotedBy = [];
        }
        const hasPostUpvoted = post.upvotedBy.some((uid) => String(uid) === String(userId));
        if (targetState && !hasPostUpvoted) {
          post.upvotedBy.push(userId);
          post.counts.upvotes = (post.counts.upvotes || 0) + 1;
        } else if (!targetState && hasPostUpvoted) {
          post.upvotedBy = post.upvotedBy.filter((uid) => String(uid) !== String(userId));
          post.counts.upvotes = Math.max(0, (post.counts.upvotes || 0) - 1);
        }
        await post.save();
      }
    } catch (postSyncErr) {
      console.error("[EVENT CONTROLLER] Error syncing upvote to Post:", postSyncErr);
    }

    // Emit live socket event to all clients
    try {
      const io = getIO();
      io.emit("event_like_updated", {
        eventId: event._id.toString(),
        upvotes: event.stats.upvotes,
        userId: userId ? userId.toString() : null,
        hasLiked: targetState,
      });

      const post = await Post.findOne({ eventRef: id });
      if (post) {
        io.emit("post_like_updated", {
          postId: post._id.toString(),
          eventId: event._id.toString(),
          upvotes: event.stats.upvotes,
          userId: userId ? userId.toString() : null,
          hasLiked: targetState,
        });
      }
    } catch (socketErr) {
      console.warn("[SOCKET] Notice: Socket emit failed:", socketErr.message);
    }

    return res.status(200).json({
      success: true,
      upvotes: event.stats.upvotes,
      hasUpvoted: targetState,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Register Event
export const registerEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    event.stats.applied += 1;
    event.buttonType = "JOIN_NOW";
    event.buttonText = "Join Now";
    await event.save();

    // Sync registration to corresponding Post document
    try {
      const post = await Post.findOne({ eventRef: id });
      if (post) {
        post.counts.registrations = (post.counts.registrations || 0) + 1;
        post.counts.applied = (post.counts.applied || 0) + 1;
        await post.save();
      }
    } catch (postSyncErr) {
      console.error("[EVENT CONTROLLER] Error syncing registration to Post:", postSyncErr);
    }

    return res.status(200).json({
      success: true,
      message: "Successfully registered for event",
      event,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

