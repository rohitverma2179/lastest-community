import React, { useState } from "react";
import Chip from "../common/Chip";

export default function FeedBody({ title, content, tags = [], children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_CHAR = 250;
  const lines = content ? content.split("\n") : [];
  const isLongContent = content && (content.length > MAX_CHAR || lines.length > 4);

  const renderContent = () => {
    if (!content || content.trim() === title?.trim()) return null;

    if (!isLongContent) {
      return (
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      );
    }

    if (!isExpanded) {
      let preview = content;
      if (lines.length > 4) {
        preview = lines.slice(0, 3).join("\n");
      }
      if (preview.length > MAX_CHAR) {
        preview = preview.slice(0, MAX_CHAR);
      }
      preview = preview.trim() + "...";

      return (
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          <span>{preview} </span>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline font-semibold text-[#0096FF] hover:underline cursor-pointer focus:outline-none"
          >
            Read more
          </button>
        </p>
      );
    }

    return (
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        <span>{content} </span>
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="inline font-semibold text-[#0096FF] hover:underline cursor-pointer focus:outline-none ml-1"
        >
          Show less
        </button>
      </p>
    );
  };

  return (
    <div className="space-y-3">
      {/* Category Tag Chips */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.1">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      )}

      {/* Post Title */}
      {title && (
        <h3 className="text-sm md:text-base mb-1 font-bold text-slate-800 leading-snug">
          {title}
        </h3>
      )}

      {/* Content Text */}
      {renderContent()}

      {/* Embedded Component Attachments (Polls, Resources, Events, Jobs) */}
      {children && <div className="mt-0">{children}</div>}
    </div>
  );
}


