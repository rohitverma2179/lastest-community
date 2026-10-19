'use client';

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ArrowUp, MessageSquare, Bookmark, Share2, MoreVertical, Plus, Check } from "lucide-react";
import Avatar from "../components/common/Avatar";
import Card from "../components/common/Card";
import CommentTree from "../components/comments/CommentTree";
import AddCommentBox from "../components/comments/AddCommentBox";
import { ProfileCard, QuickMenu, LearnCard, InviteCard } from "../components/layout/LeftSidebar";
import { DailyMission, UpcomingEvent, TopContributors } from "../components/layout/RightSidebar";
import { fetchPostWithComments } from "../features/comments/comments.thunk";
import { clearCurrentPost } from "../features/comments/comments.slice";
import { toggleLikePost } from "../features/posts/posts.thunk";
import { toggleFollow, toggleLike } from "../features/posts/posts.slice";
import { FEED_POSTS } from "../data/posts";
const like = "/assets/cardicon/LIKE.svg";
const shareIcon = "/assets/cardicon/SHARE.svg";
import toast from "react-hot-toast";
const questionicon = "/assets/cardicon/request-card.svg";
import { mapPostToWishlistItem } from "../utils/wishlist";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: feedPosts } = useSelector((state) => state.posts);
  const { events = [] } = useSelector((state) => state.events || {});
  const { currentPost, comments, isLoading } = useSelector((state) => state.comments);

  const [isBookmarked, setIsBookmarked] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      dispatch(fetchPostWithComments(id));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [id, dispatch]);

  const matchedFeedPost = feedPosts.find(
    (p) => String(p.id) === String(id) || String(p._id) === String(id) || String(p.raw?.eventRef) === String(id)
  );
  const matchedEvent = events.find((e) => String(e.id) === String(id) || String(e._id) === String(id));
  const mappedEventPost = matchedEvent
    ? {
        id: matchedEvent._id || matchedEvent.id,
        type: "EVENT",
        title: matchedEvent.title,
        content: matchedEvent.description,
        author: {
          name: matchedEvent.author?.name || "Community Partner",
          avatar: matchedEvent.author?.avatar || "",
          badge: matchedEvent.author?.badge || "CREATOR",
          badgeColor: "bg-red-50 text-red-600 border-red-200",
          title: matchedEvent.author?.title || "LEAD ASSESSOR",
          timeAgo: "Upcoming",
        },
        tags: matchedEvent.tags || [],
        likes: matchedEvent.stats?.upvotes || 0,
        comments: matchedEvent.stats?.comments || 0,
        event: {
          icon: "TEAMS",
          title: matchedEvent.eventDate || "Upcoming",
          subtitle: matchedEvent.format || "Anyone can join",
          joiningLink: matchedEvent.joiningLink || "#",
          actionLabel: matchedEvent.buttonText || "Register Free",
        },
      }
    : null;

  const matchedStaticPost = FEED_POSTS.find((p) => String(p.id) === String(id));
  const post = currentPost || matchedFeedPost || mappedEventPost || matchedStaticPost || FEED_POSTS[0];
  const commentsList = comments
    ? [...comments].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    : [];

  const [likes, setLikes] = React.useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = React.useState(Boolean(post?.hasLiked));

  React.useEffect(() => {
    if (post) {
      setLikes(post.likes || 0);
      setHasLiked(Boolean(post.hasLiked));
    }
  }, [post?.likes, post?.hasLiked, post?.id]);

  React.useEffect(() => {
    const targetId = post?.id || post?._id || id;
    if (targetId) {
      const checkBookmark = () => {
        try {
          const stored = localStorage.getItem("egrowth_wishlist");
          if (stored) {
            const list = JSON.parse(stored);
            const exists = list.some((item) => String(item.id) === String(targetId));
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
  }, [post?.id, post?._id, id]);

  // Toggle upvote on current post
  const handlePostLike = async () => {
    const nextHasLiked = !hasLiked;
    const nextLikes = nextHasLiked ? likes + 1 : Math.max(0, likes - 1);

    setHasLiked(nextHasLiked);
    setLikes(nextLikes);

    if (post && (post.id || post._id)) {
      const targetId = post.id || post._id;
      dispatch(toggleLike(targetId));
      const isMongoId = typeof targetId === "string" && targetId.length === 24 && /^[0-9a-fA-F]{24}$/.test(targetId);
      if (isMongoId) {
        try {
          const res = await dispatch(toggleLikePost({ postId: targetId, voted: nextHasLiked })).unwrap();
          if (res && typeof res.upvotes === "number") {
            setLikes(res.upvotes);
            if (res.hasLiked !== undefined) {
              setHasLiked(res.hasLiked);
            }
          }
        } catch (err) {
          console.warn("Post like sync notice:", err);
        }
      }
    }
  };

  // Toggle follow status
  const handleFollow = () => {
    if (post && post.id) {
      dispatch(toggleFollow(post.id));
    }
  };

  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen">
      <div className="community-grid">
        {/* Column 1: Left Sidebar (Visible on lg screens and up, e.g. Desktop / TV) */}
        <div className="community-col-left space-y-3 lg:space-y-4">
          <ProfileCard />
          <QuickMenu />
          <LearnCard />
          <InviteCard />
        </div>

        {/* Column 2: Center Main Content (Post Detail & Comments) */}
        <div className="community-col-main space-y-3 sm:space-y-4 min-w-0 bg-white p-3 rounded-[16px]">
          {/* Top Back Navigation Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb gap-1.5 text-[#0096FF] hover:text-[#0085f2] font-bold text-sm transition cursor-pointer select-none mb-[-3px] "
          >
            <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>Back</span>
          </button>

          {/* Main Post Card */}
          <Card className="bg-white border border-gray-200/90 rounded-[20px] p-4 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4">
            {/* Post Author Header */}
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <Avatar src={post?.author?.avatar} name={post?.author?.name || "Kunal Singh"} size="md" />

                <div className="flex flex-col min-w-0">
                  {/* Line 1: Name, Badge, Follow */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-[14px] sm:text-[16px] font-extrabold text-[#0f172a] truncate">
                      {post?.author?.name || "Kunal Singh"}
                    </span>

                    {/* Badge */}
                    <span className="bg-slate-500 text-white text-[9px] sm:text-[9.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider select-none shrink-0">
                      {post?.author?.badge || "EXPLORER"}
                    </span>

                    {/* Follow CTA */}
                    <button
                      type="button"
                      onClick={handleFollow}
                      className={`text-[11px] sm:text-[12px] font-bold transition cursor-pointer flex items-center gap-0.5 sm:gap-1 shrink-0 ${post?.author?.isFollowing
                          ? "text-slate-400"
                          : "text-[#0096FF] hover:text-[#0085f2]"
                        }`}
                    >
                      {post?.author?.isFollowing ? (
                        <>
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Line 2: Designation, Time & Question Badge (on Mobile) */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] sm:text-[12px] text-slate-400 font-normal mt-0.5">
                    <span className="truncate max-w-full">
                      {post?.author?.title || "ISO 50001 Lead • Hindustan Unilever"} · {post?.time || "2 hrs ago"}
                    </span>

                    {/* Post Type Badge for Mobile (on Line 2) */}
                    <span className="border border-amber-400 text-amber-500 bg-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 select-none sm:hidden shrink-0">
                      <img src={questionicon} alt="questionicon" className="w-3 h-3" />
                      <span>{post?.type === "QUESTION" ? "Questions" : post?.actionLabel || "Questions"}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Header Actions */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Post Type Badge for Desktop */}
                <span className="border border-amber-400 text-amber-500 bg-white font-bold text-[11px] px-3 py-1 rounded-full items-center gap-1 select-none hidden sm:inline-flex">
                  <img src={questionicon} alt="questionicon" className="w-3.5 h-3.5" />
                  <span>{post?.type === "QUESTION" ? "Questions" : post?.actionLabel || "Questions"}</span>
                </span>

                <button type="button" className="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#e0f2fe]/60 text-[#0284c7] font-semibold text-[11.5px] px-3 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Title & Content */}
            <div className="space-y-2 pt-1">
              <h1 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a] leading-snug">
                {post?.title || "ISO 14001:20005 New Act ?"}
              </h1>
              <p className="text-[14px] text-slate-600 font-normal leading-relaxed whitespace-pre-line">
                {post?.content ||
                  "Cleaned up our version so it is generic. Use it, improve it, share it back. Critical for Use it, improve it, share it back. Critical for tracking long-term deviations across multiple facilities."}
              </p>
            </div>

            {/* Post Footer Actions Bar */}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-slate-600 text-[13px] font-semibold">
              <div className="flex items-center gap-6">
                {/* Upvote Button */}
                <button
                  type="button"
                  onClick={handlePostLike}
                  className={`flex items-center gap-1.5 transition cursor-pointer select-none py-1.5 px-2.5   ${hasLiked ? "text-[#0096FF] font-bold" : "text-slate-600 hover:text-[#0096FF]"
                    }`}
                  aria-label="Like post"
                >
                  <img
                    src={like}
                    alt="Upvote"
                    className={`w-4.5 h-4.5 transition duration-150 ${hasLiked ? "" : "opacity-60 hover:opacity-100"}`}
                    style={
                      hasLiked
                        ? { filter: "brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%)" }
                        : {}
                    }
                  />
                  <span>{likes}</span>
                </button>

                {/* Comment Counter */}
                <div className="flex items-center gap-1.5 text-slate-700">
                  {/* <MessageSquare className="w-4.5 h-4.5 stroke-[2]" /> */}
                  <span>{commentsList.length} Comments</span>
                </div>
              </div>

              {/* Bookmark & Share */}
              <div className="flex items-center gap-4 text-slate-400">
                <button
                  onClick={() => {
                    const nextBookmarked = !isBookmarked;
                    setIsBookmarked(nextBookmarked);

                    try {
                      const stored = localStorage.getItem("egrowth_wishlist");
                      let list = stored ? JSON.parse(stored) : [];
                      const targetId = post?.id || post?._id || id;

                      if (nextBookmarked) {
                         const exists = list.some((item) => String(item.id) === String(targetId));
                         if (!exists) {
                           const mapped = mapPostToWishlistItem(post, targetId, post?.type);
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
                         list = list.filter((item) => String(item.id) !== String(targetId));
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
                      console.error("Error toggling bookmark on detail page:", err);
                    }
                  }}
                  className={`hover:text-slate-600 transition cursor-pointer p-1 ${isBookmarked ? "text-[#0096FF] fill-[#0096FF]" : ""
                    }`}
                >
                  <Bookmark className="w-4.5 h-4.5 stroke-[2]" />
                </button>
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    const shareUrl = window.location.href;
                    if (navigator.share && typeof navigator.share === "function") {
                      try {
                        await navigator.share({
                          title: currentPost?.title || "eGrowth Community Post",
                          url: shareUrl,
                        });
                        return;
                      } catch (err) {
                        // User cancelled
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
                      toast.success("Post link copied to clipboard!", {
                        icon: "🔗",
                        style: { borderRadius: "12px", background: "#0F172A", color: "#fff" },
                      });
                    } catch (err) {
                      toast.error("Failed to copy link.");
                    }
                  }}
                  className="hover:text-slate-600 transition cursor-pointer p-1"
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
          </Card>

          {/* Comment Section Heading */}
          <div className="pt-2 mb-[-5px]">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0f172a]">
              {commentsList.length} Comments
            </h2>
          </div>

          {/* Add New Top Level Comment Input Box */}

          {/* Comments Nested Thread Tree */}
          <CommentTree comments={commentsList} postId={id} />

          {/* Sticky Bottom Add Comment Input Box */}
          <div className="sticky bottom-[72px] sm:bottom-[76px] md:bottom-3 z-30 pt-1 pb-1  backdrop-blur-md rounded-[18px] ">
            <AddCommentBox postId={id} />
          </div>
        </div>

        {/* Column 3: Right Sidebar (Visible on md screens and up, e.g. tablet / laptop / TV) */}
        <div className="community-col-right space-y-3 lg:space-y-4">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
        </div>
      </div>
    </div>
  );
}