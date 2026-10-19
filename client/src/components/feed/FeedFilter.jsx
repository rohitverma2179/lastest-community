import React from "react";
import { Flame } from "lucide-react";
import Tabs from "../common/Tabs";

export default function FeedFilter({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
  className = "mb-0"
}) {
  const categories = [
    { id: "ALL", label: "All" },
    { id: "QUESTION", label: "Questions" },
    { id: "RESOURCE", label: "Resources" },
    { id: "JOB", label: "Jobs" },
    { id: "EVENT", label: "Events" },
    { id: "POLL", label: "Poll" },
    { id: "QUIZ", label: "Quiz" }
  ];

  // Calculate coordinates for a 12-pointed starburst / rosette
  const starburstPoints = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI) / 12;
    const r = i % 2 === 0 ? 10 : 7.8;
    const x = 12 + r * Math.cos(angle);
    const y = 12 + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className={`flex items-center justify-between bg-white border border-gray-200/90 rounded-[16px] px-3 sm:px-6 py-2 sm:py-2.5 select-none shadow-[0_2px_12px_rgba(0,0,0,0.02)] w-full gap-3 sm:gap-6 overflow-x-auto scrollbar-hide ${className}`}>
      {/* Category Pills */}
      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        onChange={onCategoryChange}
        className="shrink-0"
      />

      {/* Sorting: Hot vs. Latest */}
      <div className="flex items-center gap-5 shrink-0 ml-auto">
        <button
          onClick={() => onSortChange("HOT")}
          className={`flex items-center gap-1.5 text-sm transition-colors duration-150 cursor-pointer select-none ${
            activeSort === "HOT"
              ? "text-slate-800 font-bold"
              : "text-slate-500 hover:text-slate-800  "
          }`}
        >
          <Flame className="w-4.5 h-4.5 fill-red-500 text-red-500 stroke-[2.2]" />
          <span>Hot</span>
        </button>

        <button
          onClick={() => onSortChange("LATEST")}
          className={`flex items-center gap-1.5 text-sm transition-colors duration-150 cursor-pointer select-none ${
            activeSort === "LATEST"
              ? "text-slate-800 font-bold"
              : "text-slate-500 hover:text-slate-800  "
          }`}
        >
          <svg
            className="w-[20px] h-[20px] text-[#8b5cf6] fill-[#8b5cf6] relative"
            viewBox="0 0 24 24"
          >
            <polygon points={starburstPoints} />
            <text
              x="12"
              y="14.2"
              textAnchor="middle"
              className="text-[6.5px] font-black fill-white tracking-tighter"
              style={{ fontSize: "6.5px", fontWeight: "900", fontFamily: "system-ui" }}
            >
              NEW
            </text>
          </svg>
          <span>Latest</span>
        </button>
      </div>
    </div>
  );
}

