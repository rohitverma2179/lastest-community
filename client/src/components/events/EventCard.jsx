import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Bookmark, ExternalLink, Check } from "lucide-react";
import toast from "react-hot-toast";
import { socket } from "../../utils/socket";
const teamsIcon = "/assets/cardicon/Microsoft Teams 2019.svg";
const likeIcon = "/assets/cardicon/LIKE.svg";
const commentIcon = "/assets/cardicon/COMMENT.svg";
const connectionsIcon = "/assets/cardicon/MY-CONNECTIONS.svg";
const shareIcon = "/assets/cardicon/SHARE.svg";
const save = "/assets/cardicon/SAVE.svg";
import {
  toggleBookmarkEvent,
  toggleUpvoteEvent,
  updateEventLikesFromSocket,
  bumpEventToTopOnComment,
  registerEvent
} from "../../features/events/eventsSlice";
import { toggleUpvoteEventThunk, registerEventThunk } from "../../features/events/events.thunk";
import { toggleLike } from "../../features/posts/posts.slice";
import { mapPostToWishlistItem } from "../../utils/wishlist";

// ==============================================================================
// EVENT CARD COMPONENT (Matching Exact Visual Design & Real-Time Footer Sync)
// ==============================================================================
export default function EventCard({ event }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const {
    id,
    _id,
    title,
    description,
    headerColor,
    badges = [],
    author,
    tags = [],
    eventDate,
    attendeeInfo,
    buttonType,
    buttonText,
    stats,
    isBookmarked: initialBookmark = false,
    hasUpvoted: initialHasUpvoted = false,
    type,
    format
  } = event;

  const eventId = _id || id;
  const linkedPostId = event.postId || event.linkedPostId || event.postRef?._id || event.postRef;

  // Local states for reactive real-time UI
  const [likes, setLikes] = useState(stats?.upvotes || 0);
  const [hasLiked, setHasLiked] = useState(Boolean(initialHasUpvoted));
  const [isBookmarked, setIsBookmarked] = useState(Boolean(initialBookmark));
  const [appliedCount, setAppliedCount] = useState(stats?.applied || 0);
  const [commentsCount, setCommentsCount] = useState(stats?.comments || 0);

  // Sync state if props change from Redux or parent
  useEffect(() => {
    setLikes(stats?.upvotes ?? 0);
  }, [stats?.upvotes]);

  useEffect(() => {
    setHasLiked(Boolean(initialHasUpvoted));
  }, [initialHasUpvoted]);

  useEffect(() => {
    if (eventId || linkedPostId) {
      const checkBookmark = () => {
        try {
          const stored = localStorage.getItem("egrowth_wishlist");
          if (stored) {
            const list = JSON.parse(stored);
            const exists = list.some((item) =>
              String(item.id) === String(eventId) ||
              (linkedPostId && String(item.id) === String(linkedPostId))
            );
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
  }, [eventId, linkedPostId]);

  useEffect(() => {
    setAppliedCount(stats?.applied ?? 0);
  }, [stats?.applied]);

  useEffect(() => {
    setCommentsCount(stats?.comments ?? 0);
  }, [stats?.comments]);

  // Real-time live Socket.io updates for likes and comments
  useEffect(() => {
    if (!eventId && !linkedPostId) return;

    const handleSocketLike = (data) => {
      if (!data) return;
      const isMatch =
        (data.eventId && (String(data.eventId) === String(eventId) || (linkedPostId && String(data.eventId) === String(linkedPostId)))) ||
        (data.postId && (String(data.postId) === String(eventId) || (linkedPostId && String(data.postId) === String(linkedPostId))));

      if (isMatch && typeof data.upvotes === "number") {
        setLikes(data.upvotes);
        dispatch(updateEventLikesFromSocket({ eventId, postId: linkedPostId, upvotes: data.upvotes }));
      }
    };

    const handleSocketComment = (data) => {
      if (!data) return;
      const isMatch =
        (data.eventId && (String(data.eventId) === String(eventId) || (linkedPostId && String(data.eventId) === String(linkedPostId)))) ||
        (data.postId && (String(data.postId) === String(eventId) || (linkedPostId && String(data.postId) === String(linkedPostId))));

      if (isMatch) {
        if (typeof data.commentsCount === "number") {
          setCommentsCount(data.commentsCount);
        } else {
          setCommentsCount((prev) => prev + 1);
        }
        dispatch(bumpEventToTopOnComment({ eventId, postId: linkedPostId, commentsCount: data.commentsCount }));
      }
    };

    socket.on("event_like_updated", handleSocketLike);
    socket.on("post_like_updated", handleSocketLike);
    socket.on("event_comment_updated", handleSocketComment);
    socket.on("post_comment_updated", handleSocketComment);

    return () => {
      socket.off("event_like_updated", handleSocketLike);
      socket.off("post_like_updated", handleSocketLike);
      socket.off("event_comment_updated", handleSocketComment);
      socket.off("post_comment_updated", handleSocketComment);
    };
  }, [eventId, linkedPostId, dispatch]);

  // Header gradient fallback mapping
  const getHeaderGradient = (colorKey) => {
    if (!colorKey) return "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]";
    if (colorKey.includes("from-")) return colorKey;
    return "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]";
  };

  // Author initial fallback
  const getAuthorInitials = (name) => {
    if (!name) return "A";
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  };

  // Handle Live Upvote / Like toggle
  const handleUpvote = async (e) => {
    if (e) e.stopPropagation();
    const newHasLiked = !hasLiked;
    const newLikesCount = newHasLiked ? likes + 1 : Math.max(0, likes - 1);

    // 1. Instant local component state update
    setHasLiked(newHasLiked);
    setLikes(newLikesCount);

    // 2. Instant Redux store update for live UI reactivity across Events & Posts
    if (eventId) {
      dispatch(toggleUpvoteEvent(eventId));
    }
    if (linkedPostId) {
      dispatch(toggleLike(linkedPostId));
    }

    // 3. Persist to backend database
    const targetId = _id || eventId;
    if (targetId) {
      try {
        const res = await dispatch(
          toggleUpvoteEventThunk({ eventId: targetId, targetHasUpvoted: newHasLiked })
        ).unwrap();
        if (res && typeof res.upvotes === "number") {
          setLikes(res.upvotes);
          if (res.hasUpvoted !== undefined) {
            setHasLiked(res.hasUpvoted);
          }
        }
      } catch (err) {
        console.warn("Backend upvote sync notice:", err);
      }
    }
  };

  // Handle Navigation to Comment / Discussion page
  const handleCommentClick = (e) => {
    if (e) e.stopPropagation();
    const targetId = linkedPostId || eventId;
    if (targetId) {
      navigate(`/portal/post/${targetId}`);
    } else {
      navigate(`/portal/post/mock_post_1`);
    }
  };

  // Handle Bookmark / Save toggle with notification
  const handleBookmark = (e) => {
    if (e) e.stopPropagation();
    const nextBookmarkState = !isBookmarked;
    setIsBookmarked(nextBookmarkState);
    dispatch(toggleBookmarkEvent(eventId));

    try {
      const stored = localStorage.getItem("egrowth_wishlist");
      let list = stored ? JSON.parse(stored) : [];
      const targetId = linkedPostId || eventId;

      if (nextBookmarkState) {
        const exists = list.some((item) => String(item.id) === String(targetId));
        if (!exists) {
          const mappedPost = {
            id: targetId,
            type: "EVENT",
            title: title || "Upcoming Event",
            event: {
              subtitle: attendeeInfo || format || "Anyone Can Join",
              actionLabel: buttonText || "Register Free"
            }
          };
          const mapped = mapPostToWishlistItem(mappedPost, targetId, "EVENT");
          if (mapped) {
            list.push(mapped);
          }
        }
        toast.success("Event saved to Wishlist!", {
          icon: "",
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
          },
        });
      } else {
        list = list.filter((item) =>
          String(item.id) !== String(eventId) &&
          (!linkedPostId || String(item.id) !== String(linkedPostId))
        );
        toast.success("Event removed from Wishlist!", {
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
      console.error("Error toggling bookmark on event:", err);
    }
  };

  // Handle Share with Web Share API and Clipboard Copy Fallback
  const handleShare = async (e) => {
    if (e) e.stopPropagation();
    const targetEventId = event.postId || event.linkedPostId || eventId || "event_1";
    const shareUrl = `${window.location.origin}/portal/post/${targetEventId}`;

    const shareData = {
      title: title || "eGrowth Community Event",
      text: `Check out this event: ${title}`,
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
      toast.success("Event link copied to clipboard!", {
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

  // Handle Registration
  const handleRegister = (e) => {
    if (e) e.stopPropagation();
    setAppliedCount((prev) => prev + 1);
    dispatch(registerEvent(eventId));
    if (_id) {
      dispatch(registerEventThunk(eventId));
    }
    if (event.joiningLink && event.joiningLink !== "#") {
      window.open(event.joiningLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 select-none">
      {/* Dynamic SVG Filter Styles matching FeedFooter */}
      <style>{`
        .event-footer-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
        }
        button:hover .event-footer-icon-filter {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
        .event-footer-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%) !important;
        }
        
        .event-bookmark-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
        }
        button:hover .event-bookmark-icon-filter {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
        .event-bookmark-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%) !important;
        }
      `}</style>

      {/* 1. TOP COLORED HEADER BANNER */}
      <div
        className={`relative h-24 ${!event?.bannerGradient ? `bg-gradient-to-r ${getHeaderGradient(headerColor)}` : ""} px-4 py-3 flex items-center justify-between overflow-hidden`}
        style={
          event?.bannerGradient
            ? { background: event.bannerGradient }
            : {}
        }
      >
        {/* Banner Image with faded edges */}
        {event?.banner && (
          <div
            className="absolute inset-0 bg-center bg-no-repeat z-0 pointer-events-none"
            style={{
              backgroundImage: `url(${event.banner})`,
              backgroundSize: event?.bannerGradient ? "contain" : "cover",
              maskImage: event?.bannerGradient
                ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                : "none",
              WebkitMaskImage: event?.bannerGradient
                ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                : "none",
            }}
          />
        )}

        {/* Badges on Top Left */}
        <div className="flex items-start gap-1.5 flex-wrap z-10 relative">
          {(type || format) && (
            <span className="bg-black/35 backdrop-blur-xs text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20 shadow-2xs">
              {type || format}
            </span>
          )}
          {badges.map((badgeText, idx) => {
            const uppercaseText = badgeText.toUpperCase();
            const isUpcoming = uppercaseText.includes("UPCOMING");
            const isCompleted = uppercaseText.includes("COMPLETED") || uppercaseText.includes("FINISHED");

            if (isUpcoming) {
              return (
                <span
                  key={idx}
                  className="bg-[#FF9500] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {badgeText}
                </span>
              );
            }

            if (isCompleted) {
              return (
                <span
                  key={idx}
                  className="bg-[#475569]/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 backdrop-blur-xs border border-white/10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  {badgeText}
                </span>
              );
            }

            return (
              <span
                key={idx}
                className="bg-black/30 backdrop-blur-xs text-white text-[9px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {badgeText}
              </span>
            );
          })}
        </div>

        {/* Three Dots Menu Button */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            {/* <MoreVertical className="w-4 h-4" /> */}
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-20 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    handleBookmark();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked ? "Remove Bookmark" : "Save Event"}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    handleShare(e);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Share Event</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. AUTHOR INFO & TAGS SECTION */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Author Header Row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {author?.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 text-xs shrink-0 font-bold">
                  {getAuthorInitials(author?.name)}
                </div>
              )}

              <div className="min-w-0">
                <h4 className="text-xs md:text-sm text-[#0F2942] truncate leading-snug font-semibold">
                  {author?.name || "Community Partner"}
                </h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                  {author?.title || "LEAD ASSESSOR"}
                </p>
              </div>
            </div>

            <span className="bg-[#EC4899] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-2xs">
              {author?.badge || "CREATOR"}
            </span>
          </div>

          {/* Tags Pills */}
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-[#EBF5FF] text-[#0096FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Event Title */}
          <h3 className="text-sm md:text-base font-bold text-[#0F2942] leading-snug mb-1.5">
            {title || event.title || "Community Event"}
          </h3>

          {/* Event Description */}
          <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 mb-0">
            {description || event.description || "Join this community session to learn and connect."}
          </p>
        </div>

        {/* 3. TEAMS LOGO & ACTION BOX */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-3">
          {/* Left: Microsoft Teams Icon + Date & Registration */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={teamsIcon}
              alt="Microsoft Teams"
              className="w-7 h-7 object-contain shrink-0"
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-slate-900 truncate leading-snug">
                {eventDate || event.when || "Upcoming"}
              </h5>
              <p className="text-[10px] font-medium text-slate-400 truncate">
                {attendeeInfo || event.format || "Anyone can join"}
              </p>
            </div>
          </div>

          {/* Right: Action CTA Button */}
          <div className="shrink-0">
            {(buttonType === "REGISTER_FREE" || (!buttonType && buttonText !== "JOIN_NOW" && buttonText !== "Watch Recording")) && (
              <button
                type="button"
                onClick={handleRegister}
                className="bg-[#0096FF] hover:bg-[#0085f2] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs transition duration-150 cursor-pointer active:scale-95"
              >
                {buttonText || "Register Free"}
              </button>
            )}

            {buttonType === "WATCH_RECORDING" && (
              <button
                type="button"
                className="bg-[#94A3B8] hover:bg-[#8292a6] text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition duration-150 cursor-pointer"
              >
                Watch Recording
              </button>
            )}

            {buttonType === "NOT_AVAILABLE" && (
              <button
                type="button"
                disabled
                className="bg-white border border-[#CBD5E1] text-[#94A3B8] text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-lg cursor-not-allowed"
              >
                Not Available
              </button>
            )}

            {buttonType === "JOIN_NOW" && (
              <button
                type="button"
                className="bg-[#0096FF] hover:bg-[#0085f2] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs transition duration-150 cursor-pointer active:scale-95 flex items-center gap-1"
              >
                <span>Join Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. CARD FOOTER (Stats & Actions matching FeedFooter) */}
      <div className="border-t border-slate-100 bg-[#FBFDFE] px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 select-none">
        {/* Left Side Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Upvotes / Like */}
          <button
            type="button"
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 hover:text-[#0096FF] transition duration-150 py-1.5 cursor-pointer group ${hasLiked ? "text-[#0096FF] font-bold" : "text-slate-500 font-medium"
              }`}
            title="Upvote Event"
          >
            <img
              src={likeIcon}
              alt="Like"
              className={`w-4 h-4 object-contain transition-all duration-150 event-footer-icon-filter ${hasLiked ? "active scale-110" : ""
                }`}
            />
            <span>{likes}</span>
          </button>
          
          {/* Comments */}
          <button
            type="button"
            onClick={handleCommentClick}
            className="flex items-center gap-1.5 hover:text-[#0096FF] text-slate-500 transition duration-150 py-1.5 cursor-pointer group"
            title="Comments & Discussion"
          >
            <img
              src={commentIcon}
              alt="Comments"
              className="w-4 h-4 object-contain transition-all duration-150 event-footer-icon-filter"
            />
            <span>{commentsCount}</span>
          </button>

          {/* Applied */}
          <div className="flex items-center gap-1.5 text-slate-500 py-1.5">
            <img src={connectionsIcon} alt="Applied" className="w-4 h-4 object-contain opacity-60" />
            <span>{appliedCount} Applied</span>
          </div>
        </div>

        {/* Right Side Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Bookmark */}
          <button
            type="button"
            onClick={handleBookmark}
            className={`p-1.5 rounded-full hover:bg-slate-100 hover:text-[#0096FF] transition cursor-pointer active:scale-90 ${isBookmarked ? "text-[#0096FF] font-bold" : "text-slate-400"
              }`}
            title={isBookmarked ? "Remove Bookmark" : "Save Event"}
          >
            <img
              src={save}
              className={`w-4 h-4 object-contain transition-all duration-150 event-bookmark-icon-filter ${isBookmarked ? "active scale-110" : ""
                }`}
              alt="Save"
            />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0096FF] transition cursor-pointer active:scale-90"
            title="Share Event"
          >
            <img
              src={shareIcon}
              className="w-4 h-4 object-contain transition-all duration-150 event-footer-icon-filter"
              alt="Share"
            />
          </button>
        </div>
      </div>
    </div>
  );
}