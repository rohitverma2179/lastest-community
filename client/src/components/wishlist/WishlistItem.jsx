import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MoreVertical,
  Coins,
  Share2,
  ExternalLink,
  Link as LinkIcon,
  Trash,
  Megaphone,
} from "lucide-react";

/**
 * Announcement Badge Icon Component (matching screenshot with Megaphone)
 */
function AnnouncementIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#3730a3] text-white flex items-center justify-center shrink-0 shadow-2xs select-none">
      <Megaphone className="w-5 h-5 stroke-[2] fill-white/20" />
    </div>
  );
}

/**
 * Excel Format Badge Icon Component
 */
function ExcelIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#007a3d] text-white flex items-center justify-center text-[11px] font-black tracking-tight shrink-0 shadow-2xs select-none">
      XLS
    </div>
  );
}

/**
 * WishlistItem Component
 * Production-level card matching exact mobile UI design screenshot.
 */
export default function WishlistItem({
  item,
  onToggleCheck,
  onActionClick,
  onShowToast,
  onDelete,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to resolve URL for the wishlist item
  const getItemUrl = () => {
    const isPortal = typeof window !== "undefined" && window.location.pathname.startsWith("/portal");
    const targetId = item?.originalPost?._id || item?.originalPost?.id || item?.id;
    const basePath = isPortal ? "/portal/post" : "/post";
    return `${window.location.origin}${basePath}/${targetId}`;
  };

  // Helper to safely copy text to clipboard with fallback
  const copyToClipboard = async (text) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      return false;
    }
  };

  // Display toast feedback via prop and react-hot-toast fallback
  const triggerToastFeedback = (message, isError = false) => {
    if (onShowToast) {
      onShowToast(message);
    } else {
      if (isError) {
        toast.error(message);
      } else {
        toast.success(message, {
          icon: "🔗",
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
          },
        });
      }
    }
  };

  // Handle Share (Web Share API with Clipboard Copy Fallback)
  const handleShare = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(false);

    const shareUrl = getItemUrl();
    const shareData = {
      title: item.title || "eGrowth Community Item",
      text: item.description || item.subtitle || `Check out ${item.title} on eGrowth Community!`,
      url: shareUrl,
    };

    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        triggerToastFeedback("Item link shared!");
        return;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.warn("Navigator share failed, copying link instead", err);
      }
    }

    // Fallback: Copy to clipboard
    const copied = await copyToClipboard(shareUrl);
    if (copied) {
      triggerToastFeedback("Link copied to clipboard!");
    } else {
      triggerToastFeedback("Failed to copy link.", true);
    }
  };

  // Handle Copy Link
  const handleCopyLink = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(false);

    const shareUrl = getItemUrl();
    const copied = await copyToClipboard(shareUrl);
    if (copied) {
      triggerToastFeedback("Link copied to clipboard!");
    } else {
      triggerToastFeedback("Failed to copy link.", true);
    }
  };

  // Handle View / Navigate to post detail
  const handleNavigateToPost = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(false);
    const isPortal = typeof window !== "undefined" && window.location.pathname.startsWith("/portal");
    const targetId = item?.originalPost?._id || item?.originalPost?.id || item?.id;
    if (targetId) {
      navigate(isPortal ? `/portal/post/${targetId}` : `/post/${targetId}`);
    }
  };

  // Render 3-dots dropdown menu
  const renderMenu = () => (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition cursor-pointer"
        title="More options"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Options Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1.5 w-44 sm:w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 max-w-[calc(100vw-2rem)]">
            <button
              type="button"
              onClick={handleShare}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <LinkIcon className="w-4 h-4 text-slate-400" />
              <span>Copy link</span>
            </button>

            <button
              type="button"
              onClick={handleNavigateToPost}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>View Details</span>
            </button>

            <div className="border-t border-slate-100 my-1 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  if (onDelete) onDelete(item.id);
                }}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2.5 text-xs font-semibold text-red-600 transition cursor-pointer"
              >
                <Trash className="w-4 h-4 text-red-500" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-200 p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs ${
        item.isChecked
          ? "border-[#0096ff]/60 bg-sky-50/20"
          : "border-slate-100/90 hover:border-slate-200"
      }`}
    >
      {/* Top Main Section (Checkbox + Icon + Text Content + Top-Right 3-Dots on mobile) */}
      <div className="flex items-start justify-between gap-3 min-w-0 flex-1">
        
        {/* Left: Checkbox + Avatar/Badge + Texts */}
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={item.isChecked}
            onChange={() => onToggleCheck(item.id)}
            className="w-4.5 h-4.5 rounded-md text-[#0096ff] border-slate-300 focus:ring-[#0096ff] cursor-pointer shrink-0 mt-0.5"
          />

          {/* Format Badge / Avatar */}
          {item.type === "teams" || item.type === "announcement" || item.subtitle?.toLowerCase().includes("announcement") ? (
            <AnnouncementIcon />
          ) : item.type === "excel" ? (
            <ExcelIcon />
          ) : (
            <img
              src={item.avatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200/80 shadow-2xs"
            />
          )}

          {/* Text Details Column */}
          <div className="min-w-0 flex-1">
            {/* Subtitle */}
            {item.subtitle && (
              <p className="text-xs text-slate-400 font-medium leading-none mb-1 tracking-tight">
                {item.subtitle}
              </p>
            )}

            {/* Title */}
            <h3
              onClick={handleNavigateToPost}
              className="text-[14px] sm:text-[15px] font-bold text-slate-900 tracking-tight leading-snug cursor-pointer hover:text-[#0096ff] transition line-clamp-1"
              title={item.title}
            >
              {item.title}
            </h3>

            {/* Description */}
            {item.description && (
              <div className="mt-1 text-xs text-slate-500 font-normal leading-relaxed break-words">
                {item.description.length > 100 ? (
                  <p className="inline">
                    <span>{isExpanded ? item.description : `${item.description.slice(0, 100)}...`}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                      }}
                      className="text-[#0096ff] font-semibold hover:underline inline ml-1.5 cursor-pointer text-xs select-none"
                    >
                      {isExpanded ? "read less" : "read more.."}
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 font-normal">{item.description}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3-Dots Menu ONLY on mobile inside top row */}
        <div className="sm:hidden shrink-0">
          {renderMenu()}
        </div>
      </div>

      {/* Action Button & Desktop 3-dots */}
      <div className={`flex items-center gap-3 shrink-0 ${item.action ? "w-full sm:w-auto" : "hidden sm:flex"}`}>
        {item.action && (
          <div className="w-full sm:w-auto">
            {item.action === "join" && (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-[#0096ff] hover:bg-[#0082de] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-full shadow-2xs hover:shadow-xs transition active:scale-95 cursor-pointer whitespace-nowrap text-center"
              >
                {item.actionText || "Register Free"}
              </button>
            )}

            {item.action === "disabled" && (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-slate-100 text-slate-400 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-full select-none cursor-not-allowed whitespace-nowrap text-center"
              >
                {item.actionText || "Not Available"}
              </button>
            )}

            {item.action === "coin" && (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-[#0096ff] hover:bg-[#0082de] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-full shadow-2xs hover:shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Get</span>
                <Coins className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>{item.coins || 1200}</span>
              </button>
            )}
          </div>
        )}

        {/* 3-Dots Menu on desktop (sm+) */}
        <div className="hidden sm:block">
          {renderMenu()}
        </div>
      </div>
    </div>
  );
}
