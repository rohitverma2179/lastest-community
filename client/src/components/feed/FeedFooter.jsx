import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLikePost } from "../../features/posts/posts.thunk";
import { toggleLike } from "../../features/posts/posts.slice";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
const likeIcon = "/assets/cardicon/LIKE.svg";
const commentIcon = "/assets/cardicon/COMMENT.svg";
const downlIcon = "/assets/cardicon/DOWNL.svg";
const connectionsIcon = "/assets/cardicon/MY-CONNECTIONS.svg";
const jobIcon = "/assets/cardicon/job-card.svg";
const saveIcon = "/assets/cardicon/SAVE.svg";
const shareIcon = "/assets/cardicon/SHARE.svg";

import { mapPostToWishlistItem } from "../../utils/wishlist";
import { toggleBookmarkEvent, toggleUpvoteEvent } from "../../features/events/eventsSlice";

export default function FeedFooter({
  postId,
  likes: initialLikes = 0,
  hasLiked: initialHasLiked = false,
  comments,
  downloads,
  votes,
  responses,
  registered,
  applied,
  isBookmarked: initialBookmark,
  type,
  actionLabel,
  post
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmark);

  useEffect(() => {
    if (postId) {
      const checkBookmark = () => {
        try {
          const stored = localStorage.getItem("egrowth_wishlist");
          if (stored) {
            const list = JSON.parse(stored);
            const exists = list.some((item) => String(item.id) === String(postId));
            setIsBookmarked(exists);
          } else {
            setIsBookmarked(false);
          }
        } catch (e) {
          console.error(e);
        }
      };

      checkBookmark();

      window.addEventListener("wishlist_updated", checkBookmark);
      window.addEventListener("storage", checkBookmark);
      return () => {
        window.removeEventListener("wishlist_updated", checkBookmark);
        window.removeEventListener("storage", checkBookmark);
      };
    }
  }, [postId]);

  const handleCommentClick = () => {
    if (postId) {
      navigate(`/portal/post/${postId}`);
    } else {
      navigate(`/portal/post/mock_post_1`);
    }
  };

  const handleShare = async (e) => {
    if (e) e.stopPropagation();
    const targetPostId = postId || "mock_post_1";
    const shareUrl = `${window.location.origin}/portal/post/${targetPostId}`;

    const shareData = {
      title: "eGrowth Community Post",
      text: "Check out this post on eGrowth Community!",
      url: shareUrl,
    };

    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled native share or browser fallback
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement("input");
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      toast.success("Post link copied! Link opens Post Detail page.", {
        icon: "🔗",
        style: {
          borderRadius: "12px",
          background: "#0F172A",
          color: "#fff",
        },
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast.error("Failed to copy link.");
    }
  };

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  useEffect(() => {
    setHasLiked(initialHasLiked);
  }, [initialHasLiked]);

  // Listen to Socket.io live like updates for this specific post or event
  useEffect(() => {
    if (!postId) return;

    const handleSocketLike = (data) => {
      if (
        data &&
        (String(data.postId) === String(postId) || String(data.eventId) === String(postId)) &&
        typeof data.upvotes === "number"
      ) {
        setLikes(data.upvotes);
      }
    };

    socket.on("post_like_updated", handleSocketLike);
    socket.on("event_like_updated", handleSocketLike);

    return () => {
      socket.off("post_like_updated", handleSocketLike);
      socket.off("event_like_updated", handleSocketLike);
    };
  }, [postId]);

  const handleLike = async () => {
    const newHasLiked = !hasLiked;
    const newLikesCount = newHasLiked ? likes + 1 : Math.max(0, likes - 1);

    // 1. Instant local component state update
    setHasLiked(newHasLiked);
    setLikes(newLikesCount);

    // 2. Instant Redux store update for live UI reactivity across Posts & Events
    if (postId) {
      dispatch(toggleLike(postId));
      dispatch(toggleUpvoteEvent(postId));
    }

    // 3. Persist to backend database if valid MongoDB ID
    const isMongoId = typeof postId === "string" && postId.length === 24 && /^[0-9a-fA-F]{24}$/.test(postId);
    if (isMongoId) {
      try {
        const res = await dispatch(toggleLikePost({ postId, voted: newHasLiked })).unwrap();
        if (res && typeof res.upvotes === "number") {
          setLikes(res.upvotes);
          if (res.hasLiked !== undefined) {
            setHasLiked(res.hasLiked);
          }
        }
      } catch (err) {
        console.warn("Backend like sync notice:", err);
      }
    }
  };

  const handleBookmark = () => {
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);

    try {
      const stored = localStorage.getItem("egrowth_wishlist");
      let list = stored ? JSON.parse(stored) : [];
      if (nextBookmarked) {
        const exists = list.some((item) => String(item.id) === String(postId));
        if (!exists) {
          const mapped = mapPostToWishlistItem(post, postId, type);
          if (mapped) {
            list.push(mapped);
          }
        }
        toast.success("Post saved to Wishlist!", {
          icon: "",
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
          },
        });
      } else {
        list = list.filter((item) => String(item.id) !== String(postId));
        toast.success("Post removed from Wishlist!", {
          icon: "",
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
          },
        });
      }
      localStorage.setItem("egrowth_wishlist", JSON.stringify(list));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  return (
    <div className="flex items-end justify-between border-t border-gray-100 text-gray-500 text-xs select-none w-full">
      {/* Styles to apply theme/state colors to footer SVG icons */}
      <style>{`
        .footer-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
        }
        .group:hover .footer-icon-filter, button:hover .footer-icon-filter {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
        .footer-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%) !important;
        }
        
        .bookmark-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
        }
        button:hover .bookmark-icon-filter {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
        .bookmark-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%) !important;
        }
      `}</style>

      {/* Left Action Stats */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Like/Upvote */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 hover:text-[#0096FF] transition duration-150 py-1.5 cursor-pointer group ${hasLiked ? "text-[#0096FF]" : ""
            }`}
        >
          <img
            src={likeIcon}
            className={`w-4 h-4 object-contain transition-all duration-150 footer-icon-filter ${hasLiked ? "active" : ""
              }`}
            alt="like"
          />
          <span>{likes}</span>
        </button>

        {/* Comments */}
        <button
          onClick={handleCommentClick}
          className="flex items-center gap-1.5 hover:text-[#0096FF] transition duration-150 py-1.5 cursor-pointer group"
        >
          <img
            src={commentIcon}
            className="w-4 h-4 object-contain transition-all duration-150 footer-icon-filter"
            alt="comment"
          />
          <span>{comments || 0} Comments</span>
        </button>

        {/* Dynamic Context Stat */}
        {downloads !== undefined &&
          type?.toUpperCase() !== "QUESTION" &&
          type?.toUpperCase() !== "REQUEST" &&
          !actionLabel?.toLowerCase().includes("question") &&
          !actionLabel?.toLowerCase().includes("request") && (
            <div className="flex items-center gap-1.5 py-1.5">
              <img src={downlIcon} className="w-4 h-4 object-contain opacity-60" alt="downloads" />
              <span>{downloads} Downloads</span>
            </div>
          )}

        {votes !== undefined && (
          <div className="flex items-center gap-1.5 py-1.5">
            <img src={connectionsIcon} className="w-4 h-4 object-contain opacity-60" alt="votes" />
            <span>{votes} Votes</span>
          </div>
        )}

        {type?.toUpperCase() === "QUIZ" && responses !== undefined && responses !== null && (
          <div className="flex items-center gap-1.5 py-1.5">
            <img src={connectionsIcon} className="w-4 h-4 object-contain opacity-60" alt="responses" />
            <span>{responses} {responses === 1 ? "Response" : "Responses"}</span>
          </div>
        )}

        {type?.toUpperCase() === "EVENT" && registered !== undefined && registered !== null && (
          <div className="flex items-center gap-1.5 py-1.5">
            <img src={connectionsIcon} className="w-4 h-4 object-contain opacity-60" alt="registered" />
            <span>{registered} Registered</span>
          </div>
        )}

        {applied !== undefined && (
          <div className="flex items-center gap-1.5 py-1.5">
            <img src={jobIcon} className="w-4 h-4 object-contain opacity-60" alt="applied" />
            <span>{applied} Applied</span>
          </div>
        )}
      </div>

      {/* Right Engagement Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={handleBookmark}
          className={`rounded-full hover:bg-gray-100 transition duration-150 flex items-center justify-center p-2 text-gray-500 hover:text-[#0096FF] cursor-pointer`}
          title={isBookmarked ? "Remove Bookmark" : "Save Post"}
        >
          <img
            src={saveIcon}
            className={`w-4 h-4 object-contain transition-all duration-150 bookmark-icon-filter ${isBookmarked ? "active" : ""
              }`}
            alt="save"
          />
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-full hover:bg-gray-100 transition duration-150 flex items-center justify-center p-2 text-gray-500 hover:text-[#0096FF] cursor-pointer -mr-2"
          title="Share Post"
        >
          <img
            src={shareIcon}
            className="w-4 h-4 object-contain transition-all duration-150 footer-icon-filter"
            alt="share"
          />
        </button>
      </div>
    </div>
  );
}