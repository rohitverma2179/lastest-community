import React, { useState, useEffect } from "react";
const likeIcon = "/assets/cardicon/LIKE.svg";
const commentIcon = "/assets/cardicon/COMMENT.svg";
const downlIcon = "/assets/cardicon/DOWNL.svg";
const saveIcon = "/assets/cardicon/SAVE.svg";

export default function ResourceCard({ resource, onSelect, onDownload }) {
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(resource?.likes ?? resource?.upvotes ?? resource?.stats?.upvotes ?? 0);
  const [hasLiked, setHasLiked] = useState(Boolean(resource?.hasLiked || resource?.hasUpvoted));
  const [commentsCount, setCommentsCount] = useState(resource?.commentsCount ?? resource?.stats?.comments ?? resource?.comments ?? 0);

  const getAuthorInitials = (name) => {
    if (!name) return "A";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  };

  const author = resource?.author || (typeof resource?.uploadedBy === "object" ? resource?.uploadedBy : null);
  const authorName =
    resource?.uploaderName ||
    (author
      ? typeof author === "object"
        ? `${author.firstName || author.name || ""} ${author.lastName || ""}`.trim()
        : author
      : "Community Member") ||
    "Community Member";
  const authorAvatar = author?.avatar || resource?.uploaderAvatar || resource?.avatar;
  const authorColor = author?.color;

  useEffect(() => {
    setLikes(resource?.likes ?? resource?.upvotes ?? resource?.stats?.upvotes ?? 0);
  }, [resource?.likes, resource?.upvotes, resource?.stats?.upvotes]);

  useEffect(() => {
    setCommentsCount(resource?.commentsCount ?? resource?.stats?.comments ?? resource?.comments ?? 0);
  }, [resource?.commentsCount, resource?.stats?.comments, resource?.comments]);

  const handleUpvote = (e) => {
    if (e) e.stopPropagation();
    setHasLiked((prev) => {
      const next = !prev;
      setLikes((curr) => (next ? curr + 1 : Math.max(0, curr - 1)));
      return next;
    });
  };

  const handleCommentClick = (e) => {
    if (e) e.stopPropagation();
    if (onSelect) {
      onSelect(resource);
    }
  };

  // Define vibrant gradient background styles by file type
  const typeConfigs = {
    XLS: {
      bg: "bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c]",
      glow: "from-emerald-400/20 to-teal-500/0",
      label: "XLS"
    },
    XLSX: {
      bg: "bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c]",
      glow: "from-emerald-400/20 to-teal-500/0",
      label: "XLS"
    },
    PDF: {
      bg: "bg-gradient-to-br from-[#9e2a2b] via-[#d94e18] to-[#f97316]",
      glow: "from-orange-400/20 to-red-500/0",
      label: "PDF"
    },
    DOC: {
      bg: "bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]",
      glow: "from-blue-400/20 to-indigo-500/0",
      label: "DOC"
    },
    DOCX: {
      bg: "bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]",
      glow: "from-blue-400/20 to-indigo-500/0",
      label: "DOC"
    },
    PPT: {
      bg: "bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#f59e0b]",
      glow: "from-amber-400/20 to-yellow-500/0",
      label: "PPT"
    },
    PPTX: {
      bg: "bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#f59e0b]",
      glow: "from-amber-400/20 to-yellow-500/0",
      label: "PPT"
    },
    ZIP: {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6]",
      glow: "from-purple-400/20 to-indigo-500/0",
      label: "ZIP"
    }
  };

  const fileType = (resource?.type || "XLS").toUpperCase();
  const config = typeConfigs[fileType] || {
    bg: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600",
    glow: "from-slate-400/20 to-slate-500/0",
    label: fileType
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-0.5">
      {/* Dynamic SVG Filter Styles matching EventCard */}
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
      `}</style>

      {/* Clickable Card Body Area */}
      <div onClick={() => onSelect && onSelect(resource)}>
        {/* Top File Gradient Header Block */}
        <div className={`relative h-28 sm:h-32 ${config.bg} flex items-center justify-center p-4 select-none overflow-hidden`}>
          {/* Subtle Radial Glow Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${config.glow} opacity-60 pointer-events-none`} />
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />

          {/* Header Badges top right: Download Count & File Size */}
          <div className="absolute top-2.5 right-2.5 bg-black/35 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs flex items-center gap-2 select-none z-10">
            <span className="flex items-center gap-1">
              <img src={downlIcon} className="w-3 h-3 object-contain brightness-0 invert opacity-90" alt="downloads" />
              <span>{(resource?.downloads || 1200).toLocaleString()}</span>
            </span>
            <span className="text-white/40 font-normal">•</span>
            <span>{resource?.fileSize || "1.5MB"}</span>
          </div>


          {/* Large File Format Text */}
          <span className="text-white font-black text-2xl sm:text-3xl tracking-widest uppercase drop-shadow-md">
            {config.label}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className=" text-slate-900 text-sm sm:text-base line-clamp-2  transition-colors leading-snug">
              {resource?.title}
            </h3>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {(resource?.tags || ["esg", "reporting"]).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-600 text-[10.5px] font-bold px-2 py-0.5 rounded-md border border-slate-200/80  transition-colors"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Uploader Profile Row */}
          <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-gray-100">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs"
              />
            ) : (
              <div
                style={authorColor ? { backgroundColor: authorColor } : undefined}
                className={`w-7 h-7 rounded-full ${!authorColor ? "bg-gradient-to-tr from-slate-800 to-[#0b4b66]" : ""} text-white font-bold text-[10px] flex items-center justify-center shrink-0 uppercase shadow-2xs border border-white/20`}
              >
                {getAuthorInitials(authorName)}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-700 truncate">
              {authorName}
            </span>
            <span className="text-[11px] text-gray-400 shrink-0">
              • {resource?.timeAgo || "1w"}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
        {/* Left Side Actions: Upvote, Comments & Download Count */}
        <div className="flex items-center gap-3 text-xs text-slate-500 select-none">
          {/* Upvote Button */}
          <button
            type="button"
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 hover:text-[#0096FF] transition duration-150 py-1.5 cursor-pointer group ${hasLiked ? "text-[#0096FF] font-bold" : "text-slate-500 font-medium"
              }`}
            title="Upvote Resource"
          >
            <img
              src={likeIcon}
              alt="Like"
              className={`w-4 h-4 object-contain transition-all duration-150 event-footer-icon-filter ${hasLiked ? "active scale-110" : ""
                }`}
            />
            <span>{likes}</span>
          </button>

          {/* Comments Button */}
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

          {/* Download Count with DOWNL.svg Icon */}

        </div>

        {/* Right Side Actions: Bookmark & Download Button */}
        <div className="flex items-center gap-2">
          {/* Bookmark Ribbon Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className={`p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer active:scale-90 ${isSaved ? "text-[#0096FF] font-bold" : "text-slate-400"
              }`}
            title={isSaved ? "Saved" : "Save to wishlist"}
          >
            <img
              src={saveIcon}
              className={`w-4 h-4 object-contain transition-all duration-150 event-footer-icon-filter ${isSaved ? "active scale-110" : ""
                }`}
              alt="Save"
            />
          </button>

          {/* Pill Merit Download Button matching design */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onDownload) onDownload(resource);
            }}
            className="bg-gradient-to-r from-[#ff6500] to-[#ff8500] hover:from-[#ea580c] hover:to-[#f97316] active:scale-95 text-white pl-2 pr-1 py-1 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0"
            title="Download Resource"
          >
            <img src={downlIcon} className="w-3.5 h-3.5 object-contain brightness-0 invert ml-0.5" alt="Download" />
            <span className="bg-black/25 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight">
              M {resource?.meritPoints || 100}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
