import React from "react";
import { Folder, FileSpreadsheet, FileText, Presentation } from "lucide-react";

/**
 * WishlistFolderGrid Component
 * Renders user collections/folders grid matching the screenshot thumbnail design.
 */
export default function DownloadFolderGrid({ folders = [], activeFolderId, onSelectFolder }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
      {folders.map((folder) => {
        const isSelected = activeFolderId === folder.id;

        return (
          <div
            key={folder.id}
            onClick={() => onSelectFolder(folder.id === activeFolderId ? null : folder.id)}
            className="flex flex-col items-center group cursor-pointer shrink-0"
          >
            {/* Folder Thumbnail Box */}
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2.5 flex items-center justify-center shadow-xs transition-all duration-200 ${isSelected
                  ? "ring-2 ring-[#0096FF] scale-105 shadow-md"
                  : "group-hover:scale-105 group-hover:shadow-md"
                } bg-gradient-to-br ${folder.colorGradient || "from-amber-500 to-orange-600"}`}
            >
              {/* Folder Inner Badge Graphic */}
              {/* <div className="bg-white/20 backdrop-blur-xs rounded-xl p-2 flex items-center justify-center gap-1">
                <span className="bg-emerald-600 text-white font-bold text-[8px] sm:text-[9px] px-1 py-0.5 rounded flex items-center gap-0.5">
                  <FileSpreadsheet className="w-2.5 h-2.5" />
                  XLS
                </span>
                <span className="bg-amber-600 text-white font-bold text-[8px] sm:text-[9px] px-1 py-0.5 rounded flex items-center gap-0.5">
                  <Presentation className="w-2.5 h-2.5" />
                  PPT
                </span>
              </div> */}
            </div>

            {/* Folder Title Label */}
            <span className={`text-[11px] sm:text-xs font-semibold mt-2 text-center max-w-[100px] truncate transition-colors ${isSelected ? "text-[#0096FF] font-bold" : "text-slate-700 group-hover:text-slate-900"
              }`}>
              {folder.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
