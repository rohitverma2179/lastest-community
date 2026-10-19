import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost, toggleLikePost, votePollOption, voteQuizOption } from "./posts.thunk";
import { createEventThunk } from "../events/events.thunk";
import { createTopLevelComment } from "../comments/comments.thunk";
import { FEED_POSTS } from "../../data/posts";

// Helper to format relative time
const formatRelativeTime = (dateStr) => {
  if (!dateStr) return "Just now";
  const now = new Date();
  const created = new Date(dateStr);
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours < 24) return `${diffHours} hrs ago`;
  return `${diffDays} days ago`;
};

// Helper to map backend Post schema to frontend structure
export const mapBackendPostToFrontend = (post) => {
  if (!post) return null;

  const firstName = post.author?.firstName || "";
  const lastName = post.author?.lastName || "";
  const authorName = `${firstName} ${lastName}`.trim() || "Anonymous";

  const reputation = post.author?.reputation || 0;
  let badge = "EXPLORER";
  let badgeColor = "bg-amber-50 text-amber-700 border-amber-200";

  if (reputation >= 10000) {
    badge = "LEGEND";
    badgeColor = "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]";
  } else if (reputation >= 4000) {
    badge = "PIONEER";
    badgeColor = "bg-purple-50 text-purple-600 border-purple-200";
  } else if (reputation >= 2000) {
    badge = "CREATOR";
    badgeColor = "bg-red-50 text-red-600 border-red-200";
  }

  // Use backend author avatar if available, otherwise map known demo emails or fallback
  let avatar = post.author?.avatar || null;
  const email = post.author?.email || "";
  if (!avatar) {
    if (email.includes("ananya")) {
      avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("nakul")) {
      avatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("sonu")) {
      avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("mukul")) {
      avatar = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("manish")) {
      avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("pushpender")) {
      avatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80";
    } else if (email.includes("amit")) {
      avatar = "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&h=150&q=80";
    }
  }

  const kind = post.kind || "question";
  let type = kind.toUpperCase();
  if (kind === "question" || kind === "request") {
    type = "QUESTION";
  }

  // Map attachments based on kind
  let attachment = undefined;
  let job = undefined;
  let event = undefined;
  let poll = undefined;
  let quiz = undefined;

  if (kind === "poll" && post.pollOptions) {
    const totalVotes = post.pollOptions.reduce((acc, curr) => acc + (curr.votes || 0), 0);
    const maxVotes = Math.max(...post.pollOptions.map(o => o.votes || 0));
    poll = {
      allowMultipleAnswers: !!post.allowMultipleAnswers,
      totalVotes,
      options: post.pollOptions.map((opt, idx) => ({
        id: opt._id || idx,
        index: idx,
        text: opt.text,
        votes: opt.votes || 0,
        percentage: totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0,
        isWinner: totalVotes > 0 && opt.votes === maxVotes,
        votedUsers: opt.votedUsers || []
      }))
    };
  } else if (kind === "quiz" && post.quizOptions) {
    const totalVotes = post.quizOptions.reduce((acc, curr) => acc + (curr.votes || 0), 0);
    quiz = {
      totalVotes,
      correctIndex: post.quizCorrectIndex ?? post.quizOptions.findIndex(o => o.isCorrect),
      options: post.quizOptions.map((opt, idx) => ({
        id: opt._id || idx,
        index: idx,
        text: opt.text,
        isCorrect: !!opt.isCorrect,
        votes: opt.votes || 0,
        votedUsers: opt.votedUsers || []
      }))
    };
  } else if (kind === "resource" && post.file) {
    attachment = {
      type: (post.file.type || "EXCEL").toUpperCase() === "XLS" ? "EXCEL" : (post.file.type || "PDF").toUpperCase(),
      name: post.file.name || "Attachment",
      size: post.file.size || "Unknown size",
      actionLabel: "Get +1200",
      actionPoints: 1200
    };
  } else if (kind === "job") {
    job = {
      type: "Full-time",
      sector: "Industry & Operations",
      location: post.location || "Remote",
      compensation: post.salary || "Competitive",
      applyTill: "30 Aug",
      actionLabel: "Apply Now"
    };
  } else if (kind === "event") {
    const ref = typeof post.eventRef === 'object' && post.eventRef !== null ? post.eventRef : {};
    const eventRefId = ref._id || ref.id || (typeof post.eventRef === 'string' ? post.eventRef : undefined);
    event = {
      id: eventRefId,
      _id: eventRefId,
      icon: "TEAMS",
      title: ref.eventDate || post.eventDate || "Upcoming",
      subtitle: ref.format || "Anyone can join",
      joiningLink: ref.joiningLink || "#",
      actionLabel: ref.buttonText || "Register Now",
      badges: ref.badges || ["UPCOMING"],
      headerColor: ref.headerColor,
      banner: ref.banner,
      bannerGradient: ref.bannerGradient,
      stats: ref.stats || {
        applied: ref.stats?.applied || 0,
        upvotes: post.counts?.upvotes || 0,
        comments: post.counts?.answers || post.counts?.comments || 0
      },
      hasUpvoted: ref.hasUpvoted,
      isBookmarked: ref.isBookmarked
    };
  }

  const rawAuthorId = post.author?._id || (typeof post.author === 'string' ? post.author : undefined);

  return {
    id: post._id,
    authorId: rawAuthorId,
    isDynamic: true,
    type: type,
    author: {
      id: rawAuthorId,
      _id: rawAuthorId,
      name: authorName,
      firstName: post.author?.firstName || "",
      lastName: post.author?.lastName || "",
      email: post.author?.email || "",
      avatar: avatar,
      coverPhoto: post.author?.coverPhoto || "",
      badge: badge,
      badgeColor: badgeColor,
      title: post.author?.designation || "Community Member",
      company: post.author?.company || "",
      location: post.author?.location || "",
      bio: post.author?.bio || "",
      reputation: post.author?.reputation || 0,
      timeAgo: formatRelativeTime(post.createdAt),
      isFollowing: false
    },
    time: formatRelativeTime(post.createdAt),
    createdAt: post.createdAt || new Date().toISOString(),
    tags: post.tags || [],
    title: post.title,
    content: post.body,
    actionLabel: kind === "request" ? "Request" : "Questions",
    likes: post.counts?.upvotes || 0,
    comments: (post.counts?.answers !== undefined && post.counts?.answers !== null)
      ? post.counts.answers
      : ((post.counts?.comments !== undefined && post.counts?.comments !== null)
        ? post.counts.comments
        : 0),
    responses: post.counts?.responses || 0,
    downloads: post.counts?.downloads,
    registered: post.counts?.registrations || 0,
    isBookmarked: false,
    attachment,
    job,
    event,
    poll,
    quiz,
    hasLiked: reqUserHasLiked(post, post.author?._id),
    raw: post
  };
};

const reqUserHasLiked = (post) => {
  return false;
};

const initialState = {
  items: FEED_POSTS,
  isLoading: false,
  error: null,
  isModalOpen: false
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleFollow: (state, action) => {
      const postId = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (post && post.author) {
        post.author.isFollowing = !post.author.isFollowing;
      }
    },
    toggleLike: (state, action) => {
      const targetId = String(action.payload);
      const post = state.items.find(
        (p) =>
          String(p.id) === targetId ||
          String(p._id) === targetId ||
          String(p.raw?.eventRef) === targetId ||
          String(p.raw?.eventRef?._id) === targetId
      );
      if (post) {
        post.hasLiked = !post.hasLiked;
        post.likes = post.hasLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1);
      }
    },
    updatePostLikesFromSocket: (state, action) => {
      const { postId, eventId, upvotes } = action.payload;
      const post = state.items.find(
        (p) =>
          (postId && (String(p.id) === String(postId) || String(p._id) === String(postId))) ||
          (eventId &&
            (String(p.id) === String(eventId) ||
              String(p.raw?.eventRef) === String(eventId) ||
              String(p.raw?.eventRef?._id) === String(eventId)))
      );
      if (post && typeof upvotes === "number") {
        post.likes = upvotes;
      }
    },
    bumpPostToTopOnComment: (state, action) => {
      const { postId, eventId, commentsCount } = action.payload;
      const index = state.items.findIndex(
        (p) =>
          (postId && (String(p.id) === String(postId) || String(p._id) === String(postId))) ||
          (eventId &&
            (String(p.id) === String(eventId) ||
              String(p.raw?.eventRef) === String(eventId) ||
              String(p.raw?.eventRef?._id) === String(eventId)))
      );
      if (index !== -1) {
        const post = state.items[index];
        if (typeof commentsCount === "number") {
          post.comments = commentsCount;
        } else {
          post.comments = (post.comments || 0) + 1;
        }
        state.items.splice(index, 1);
        state.items.unshift(post);
      }
    },
    updatePostSuccess: (state, action) => {
      const updatedPost = action.payload;
      const mapped = mapBackendPostToFrontend(updatedPost);
      if (mapped) {
        const index = state.items.findIndex(
          (p) => String(p.id) === String(mapped.id) || String(p.id) === String(updatedPost._id)
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...mapped };
        }
      }
    },
    deletePostSuccess: (state, action) => {
      const postId = action.payload;
      state.items = state.items.filter(
        (p) => String(p.id) !== String(postId) && String(p._id) !== String(postId)
      );
    }
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload && Array.isArray(action.payload)) {
        const dynamicItems = action.payload
          .map(mapBackendPostToFrontend)
          .filter(Boolean);

        const staticItems = FEED_POSTS.filter(
          (staticPost) => !dynamicItems.some((dyn) => dyn.id === staticPost.id)
        );

        state.items = [...dynamicItems, ...staticItems];
      }
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      const mapped = mapBackendPostToFrontend(action.payload);
      if (mapped) {
        state.items.unshift(mapped);
      }
      state.isModalOpen = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Toggle Like
    builder.addCase(toggleLikePost.fulfilled, (state, action) => {
      const { postId, upvotes, hasLiked } = action.payload;
      const target = state.items.find((p) => p.id === postId);
      if (target) {
        target.likes = upvotes;
        if (hasLiked !== undefined) {
          target.hasLiked = hasLiked;
        }
      }
    });

    // Vote Poll
    builder.addCase(votePollOption.fulfilled, (state, action) => {
      const mapped = mapBackendPostToFrontend(action.payload);
      if (mapped) {
        const index = state.items.findIndex((item) => item.id === mapped.id);
        if (index !== -1) {
          state.items[index] = mapped;
        }
      }
    });

    // Vote Quiz
    builder.addCase(voteQuizOption.fulfilled, (state, action) => {
      const mapped = mapBackendPostToFrontend(action.payload);
      if (mapped) {
        const index = state.items.findIndex((item) => item.id === mapped.id);
        if (index !== -1) {
          state.items[index] = mapped;
        }
      }
    });

    // Create Event (Adds Event to Main Feed)
    builder.addCase(createEventThunk.fulfilled, (state, action) => {
      const postData = action.payload?.post;
      if (postData) {
        const mapped = mapBackendPostToFrontend(postData);
        if (mapped) {
          state.items.unshift(mapped);
        }
      } else if (action.payload?.event || action.payload) {
        const evt = action.payload?.event || action.payload;
        const mappedEventPost = {
          id: evt._id || evt.id || `event-${Date.now()}`,
          type: "EVENT",
          author: {
            id: evt.author?.userRef || "creator",
            name: evt.author?.name || "eGrowth Community",
            avatar: evt.author?.avatar || "",
            badge: evt.author?.badge || "CREATOR",
            badgeColor: "bg-red-50 text-red-600 border-red-200",
            title: evt.author?.title || "LEAD ASSESSOR",
            timeAgo: "Just now",
            isFollowing: false
          },
          time: "Just now",
          createdAt: new Date().toISOString(),
          tags: evt.tags || (evt.domain ? [evt.domain] : []),
          title: evt.title,
          content: evt.description,
          actionLabel: "Event",
          likes: 0,
          comments: 0,
          registered: 0,
          isBookmarked: false,
          event: {
            icon: "TEAMS",
            title: evt.eventDate || evt.when || "Upcoming",
            subtitle: evt.attendeeInfo || evt.format || "Anyone can join",
            joiningLink: evt.joiningLink || "#",
            actionLabel: evt.buttonText || "Register Now"
          }
        };
        state.items.unshift(mappedEventPost);
      }
    });

    // When top level comment is added, increment comment count and move post to top of feed!
    builder.addCase(createTopLevelComment.fulfilled, (state, action) => {
      const answer = action.payload;
      const postId = answer?.post;
      if (postId) {
        const index = state.items.findIndex(
          (p) =>
            String(p.id) === String(postId) ||
            String(p._id) === String(postId) ||
            String(p.raw?.eventRef) === String(postId) ||
            String(p.raw?.eventRef?._id) === String(postId)
        );
        if (index !== -1) {
          const post = state.items[index];
          post.comments = (post.comments || 0) + 1;
          state.items.splice(index, 1);
          state.items.unshift(post);
        }
      }
    });
  }
});

export const {
  openModal,
  closeModal,
  clearError,
  toggleFollow,
  toggleLike,
  updatePostLikesFromSocket,
  bumpPostToTopOnComment,
  updatePostSuccess,
  deletePostSuccess
} = postsSlice.actions;

export default postsSlice.reducer;
