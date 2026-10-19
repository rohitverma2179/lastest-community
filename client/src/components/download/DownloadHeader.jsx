import React from "react";
import { Plus } from "lucide-react";

/**
 * WishlistHeader Component
 * Displays the page title, description subtitle, and "+ Create a folder" action button.
 */
export default function DownloadHeader({ onOpenCreateFolder }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          My Downloads
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-xl leading-relaxed">
          Everything you own, everything you saved for later, and your collections. Re-downloading a file you already own is always free.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCreateFolder}
        className="self-start sm:self-auto px-5 py-2.5 bg-[#0096FF] hover:bg-[#0084e3] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Create a folder</span>
      </button>
    </div>
  );
}
