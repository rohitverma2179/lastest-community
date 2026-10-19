import React, { useState, useEffect } from "react";
import { ArrowUp, MessageSquare, MoreVertical, ThumbsUp, CornerDownRight, Send, ChevronUp, ChevronDown, Share2, AlertCircle } from "lucide-react";
import Avatar from "../common/Avatar";
import Dropdown from "../common/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { createNestedReply, voteCommentOrReply } from "../../features/comments/comments.thunk";
import { toggleLocalCommentVote } from "../../features/comments/comments.slice";
import { CURRENT_USER } from "../../data/users";
import toast from "react-hot-toast";
const like = "/assets/cardicon/LIKE.svg";
const commentIcon = "/assets/cardicon/COMMENT.svg";

export default function CommentItem({
  comment,
  postId,
  level = 0,
  isLast = false
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(comment.hasVoted || false);

  // Sync upvotes & voted state when comment prop updates
  useEffect(() => {
    setUpvotes(comment.upvotes || 0);
    const userId = user?._id || user?.id;
    const userVoted = comment.upvotedBy?.some(
      (uid) => (uid._id || uid).toString() === userId?.toString()
    );
    setHasVoted(userVoted !== undefined ? userVoted : Boolean(comment.hasVoted));
  }, [comment.upvotes, comment.upvotedBy, comment.hasVoted, user]);

  // Author details extraction
  const getAuthorName = () => {
    if (!comment.author) return comment.authorName || "Anonymous";
    if (typeof comment.author === "object") {
      const fullName = `${comment.author.firstName || ""} ${comment.author.lastName || ""}`.trim();
      if (fullName) return fullName;
    }
    if (typeof comment.author === "string" && !/^[0-9a-fA-F]{24}$/.test(comment.author)) {
      return comment.author;
    }
    if (user && (user._id === comment.author || user._id === comment.author?._id || user.id === comment.author)) {
      const myName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      if (myName) return myName;
    }
    return comment.authorName || "Anonymous";
  };

  const authorName = getAuthorName();

  const authorAvatar = comment.author?.avatar || comment.authorAvatar || null;

  // Format time
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "6d ago";
    if (dateStr.includes("ago")) return dateStr;
    const now = new Date();
    const created = new Date(dateStr);
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const timeAgo = comment.timeAgo || formatTimeAgo(comment.createdAt);

  const replies = comment.replies || [];
  const replyCount = replies.length;

  // Upvote / Like toggle handler
  const handleVote = () => {
    const nextVoted = !hasVoted;
    const increment = nextVoted ? 1 : -1;
    setHasVoted(nextVoted);
    setUpvotes((prev) => Math.max(0, prev + increment));

    const idToVote = comment._id || comment.id;
    if (idToVote) {
      dispatch(voteCommentOrReply({ answerId: idToVote, voted: nextVoted }));
      dispatch(toggleLocalCommentVote({ commentId: idToVote, increment }));
    }
  };

  // Submit nested reply handler
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const parentId = comment._id || comment.id;

    if (parentId) {
      dispatch(createNestedReply({ answerId: parentId, body: replyText.trim() }));
    }

    setReplyText("");
    setShowReplyBox(false);
    setShowReplies(true);
  };

  // Share comment handler (Web Share API + Clipboard Copy + Toast feedback)
  const handleShareComment = (close) => {
    if (close) close();
    const commentId = comment._id || comment.id;
    const shareUrl = `${window.location.origin}${window.location.pathname}#comment-${commentId}`;
    const shareTitle = `Comment by ${authorName}`;

    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: (comment.body || comment.content || "").slice(0, 100),
          url: shareUrl,
        })
        .then(() => toast.success("Comment shared successfully!"))
        .catch((err) => {
          if (err.name !== "AbortError") {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(shareUrl);
            }
            toast.success("Comment link copied to clipboard!");
          }
        });
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
      }
      toast.success("Comment link copied to clipboard!");
    }
  };

  // Report comment handler
  const handleReportComment = (close) => {
    if (close) close();
    toast.success("Comment reported to moderators.");
  };

  // Indentation and thread chain logic
  // Level 1: level = 0 (Main Comment)
  // Level 2: level = 1 (Reply)
  // Level 3: level = 2 (Reply to Reply)
  // Level 4+: level >= 3 (Reply to Level 3 / Level 4+ - max indent capped at 3, lines enabled)

  const renderReplies = () => {
    if (replies.length === 0 || !showReplies) return null;

    return (
      <div className="mt-2.5 sm:mt-3 relative space-y-3 sm:space-y-4">
        {replies.map((replyItem, idx) => {
          const isSubLast = idx === replies.length - 1;
          return (
            <div key={replyItem._id || replyItem.id || idx} className="relative">
              {/* SVG Connector Line: L-Curve for 1st reply (level 0 parent), Straight vertical line for subsequent replies */}
              <svg
                className="absolute -left-[23px] sm:-left-[30px] -top-4 w-[40px] sm:w-[48px] h-[calc(100%+16px)] pointer-events-none text-slate-300 overflow-visible z-0 block"
                fill="none"
              >
                {!isSubLast ? (
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ) : (
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="24"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}

                {/* Curved L-thread line ONLY for 1st reply (level === 0) */}
                {level === 0 && (
                  <>
                    {/* Mobile SVG Curve Path */}
                    <path
                      d="M 0 24 Q 0 34 10 34 H 18"
                      className="block sm:hidden"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Desktop SVG Curve Path */}
                    <path
                      d="M 0 24 Q 0 36 14 36 H 25"
                      className="hidden sm:block"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </>
                )}
              </svg>

              <CommentItem
                comment={replyItem}
                postId={postId}
                level={Math.min(level + 1, 3)}
                isLast={isSubLast}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const textContent = comment.body || comment.content || "";
  const linesCount = textContent.split("\n").length;
  const isLongText = linesCount > 5 || textContent.length > 250;

  return (
    <div className="relative flex flex-col w-full select-none">
      <div className="flex gap-2 sm:gap-3 items-start relative group -ml-2.5 sm:mx-2">
        {/* Left Avatar */}
        <div className="relative z-10 shrink-0 mt-0.5">
          <Avatar
            src={authorAvatar}
            name={authorName}
            size="sm"
            className="w-7 h-7 sm:w-8 sm:h-8 ring-2 ring-white shadow-xs"
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          {/* Parent Comment Content Area (Card, Footer, Reply Form) */}
          <div className="relative">
            {/* Vertical connector line from parent avatar down to replies section top */}
            {replies.length > 0 && showReplies && (
              <div className="absolute -left-[23px] sm:-left-[31px] top-[38px] sm:top-[44px] -bottom-4 w-[2px] bg-slate-300 pointer-events-none z-0" />
            )}

            {/* White Comment Card */}
            <div className="bg-[#F2F2F2] hover:border-[#0096FF]/30 transition duration-150 rounded-[14px] py-1 px-2.5 sm:px-3.5 text-slate-800 relative">
              {/* Header: Name, Time, Menu */}
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold text-[12px] sm:text-[12px] text-[#0f172a] hover:text-[#0096FF] transition cursor-pointer truncate">
                    {authorName}
                  </span>
                  <span className="text-[12px] text-slate-400 font-normal shrink-0">
                    {timeAgo}
                  </span>
                </div>

                <Dropdown
                  trigger={
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer rounded-full hover:bg-slate-200/60"
                      aria-label="Comment options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  }
                  align="right"
                >
                  {(close) => (
                    <div className="w-36 p-1.5 text-sm bg-white rounded-xl shadow-lg border border-gray-100/80 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleShareComment(close)}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left rounded-lg text-[#1e293b] hover:bg-slate-50 transition-colors duration-150 font-medium text-[13px] cursor-pointer"
                      >
                        <Share2 className="w-4 h-4 text-[#334155] stroke-[1.75]" />
                        <span>Share</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReportComment(close)}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left rounded-lg text-[#1e293b] hover:bg-slate-50 transition-colors duration-150 font-medium text-[13px] cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4 text-[#334155] stroke-[1.75]" />
                        <span>Report</span>
                      </button>
                    </div>
                  )}
                </Dropdown>
              </div>

              {/* Comment Text */}
              <p
                className={`text-[13px] sm:text-[14px] font-normal leading-relaxed text-slate-700 whitespace-pre-line ${
                  !isExpanded && isLongText ? "line-clamp-5" : ""
                }`}
              >
                {textContent}
              </p>
              {isLongText && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#0096FF] hover:text-[#0085f2] font-semibold text-xs mt-1 inline-block cursor-pointer transition select-none"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {/* Comment Footer Controls */}
            <div className="flex items-center justify-between mt-2 px-1 text-[13px]">
              {/* Upvote & Reply & Hide/Show triggers */}
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                {/* Upvote Button */}
                <button
                  type="button"
                  onClick={handleVote}
                  className="flex items-center transition cursor-pointer select-none p-1 rounded-full "
                  aria-label="Like comment"
                >
                  <img
                    src={like}
                    alt="Upvote"
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition duration-150 ${hasVoted ? "" : "opacity-60 hover:opacity-100"}`}
                    style={
                      hasVoted
                        ? { filter: "brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%)" }
                        : {}
                    }
                  />
                </button>

                {/* Reply Button */}
                <button
                  type="button"
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="flex items-center gap-1 sm:gap-1.5 text-slate-500 hover:text-[#0096FF] font-semibold transition cursor-pointer select-none text-xs px-2 sm:px-2.5 py-1 "
                >
                  <img src={commentIcon} className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" alt="Reply" />
                  <span>Reply</span>
                </button>

                {/* Hide / Show Replies Toggle Button */}
                {replyCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowReplies(!showReplies)}
                    className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-slate-600 hover:text-[#0096FF] transition cursor-pointer select-none bg-slate-100 hover:bg-slate-200/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                  >
                    {showReplies ? (
                      <>
                        <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Hide {replyCount} {replyCount === 1 ? "reply" : "replies"}</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Show {replyCount} {replyCount === 1 ? "reply" : "replies"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Like Counter Badge with Blue Thumbs-up */}
              {upvotes > 0 && (
                <div className="flex items-center gap-1 text-[12.5px] font-bold text-slate-600 select-none">
                  <span>{upvotes}</span>
                  <div className="w-4 h-4 rounded-full bg-[#0096FF] flex items-center justify-center text-white shadow-xs">
                    <ThumbsUp className="w-2.5 h-2.5 fill-white stroke-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Inline Reply Form */}
            {showReplyBox && (
              <form onSubmit={handleReplySubmit} className="mt-2.5 relative flex items-center w-full">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${authorName}...`}
                  className="w-full bg-white border border-gray-200 focus:border-[#0096FF] focus:ring-2 focus:ring-[#0096FF]/20 rounded-full pl-3 sm:pl-4 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-800 outline-none transition"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Post Reply"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Nested Replies Section: Only level 0 (main comment) indents its replies inside right content area */}
          <div className={level === 0 ? "block" : "hidden"}>
            {renderReplies()}
          </div>
        </div>
      </div>

      {/* Outer Replies Section: Level >= 1 keeps all sub-replies on the SAME vertical column line without adding extra left gap */}
      <div className={level >= 1 ? "block" : "hidden"}>
        {renderReplies()}
      </div>
    </div>
  );
}