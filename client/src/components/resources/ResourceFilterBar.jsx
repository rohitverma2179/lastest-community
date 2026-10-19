import React, { useState, useRef, useEffect } from "react";
import { Users, ChevronDown } from "lucide-react";

export default function ResourceFilterBar({
  activeCategory,
  onCategoryChange,
  activeFileType,
  onFileTypeChange,
  activeSort,
  onSortChange
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const categories = [
    { id: "ALL", label: "All" },
    { id: "QUALITY", label: "Quality" },
    { id: "ENVIRONMENT", label: "Environment" },
    { id: "HEALTH", label: "Health" },
    { id: "SAFETY", label: "Safety" },
    { id: "ENERGY", label: "Energy" },
    { id: "SUSTAINABILITY", label: "Sustainability" },
    { id: "ESG", label: "ESG" }
  ];

  const fileTypes = [
    { id: "ALL", label: "All" },
    { id: "PDF", label: "PDF" },
    { id: "DOC", label: "Documents" },
    { id: "XLS", label: "Spreadsheets" },
    { id: "PPT", label: "Presentations" },
    { id: "VIDEO", label: "Videos" },
    { id: "DRIVE", label: "Drive links" },
    { id: "ZIP", label: "Zip" }
  ];

  const sortOptions = [
    { id: "TRENDING", label: "Trending" },
    { id: "MOST_DOWNLOADED", label: "Most downloaded" },
    { id: "MOST_RECENT", label: "Most recent" }
  ];

  const currentSortLabel = sortOptions.find((opt) => opt.id === activeSort)?.label || "Trending";

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-3.5 mb-6">
      {/* Row 1: Category / Domain Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 select-none cursor-pointer ${
                isActive
                  ? "bg-[#0096FF] hover:bg-[#0085f2]  text-white shadow-md shadow-sky-900/10 scale-102"
                  : "bg-gray-100/90 text-slate-700 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {/* Following Gradient Badge Pill */}
        <button
          onClick={() => onCategoryChange("FOLLOWING")}
          className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition-all shrink-0 select-none cursor-pointer flex items-center gap-1.5 ${
            activeCategory === "FOLLOWING"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
              : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300/80 hover:border-amber-400"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Following</span>
          <span className="bg-black/20 text-white px-1.5 py-0.2 rounded-full text-[10px] font-black">
            8
          </span>
        </button>
      </div>

      {/* Row 2: File Type Filter & Sorting Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-gray-200/60">
        {/* File Type Filters */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide py-1">
          <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider shrink-0 mr-1 select-none">
            FILE TYPE:
          </span>
          {fileTypes.map((ft) => {
            const isActive = activeFileType === ft.id;
            return (
              <button
                key={ft.id}
                onClick={() => onFileTypeChange(ft.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-gray-100"
                }`}
              >
                {ft.label}
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative shrink-0 self-end sm:self-auto" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-white to-slate-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-100 transition shadow-xs cursor-pointer select-none"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onSortChange(opt.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold transition cursor-pointer flex items-center justify-between ${
                    activeSort === opt.id
                      ? "bg-gradient-to-r from-[#0096FF] to-[#0284c7] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
