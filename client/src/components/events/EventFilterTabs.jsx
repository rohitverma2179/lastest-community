import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../features/events/eventsSlice";

// ==============================================================================
// EVENTS CATEGORY FILTER TABS COMPONENT (Pixel-Perfect Matching Screenshot)
// ==============================================================================
// Visual Specs:
// - Active Pill: Bright Blue (#0096FF), white bold text, rounded-full
// - Inactive Pills: Soft Light Gray (#F1F3F5), slate font (#2C3E50), rounded-full
// ==============================================================================
export default function EventFilterTabs() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.events?.selectedCategory || "All");

  const categories = [
    "All",
    // "Quality",
    // "Environment",
    // "Health",
    // "Safety",
    // "Welfare",
    // "ESG",
    // "Sustainability",
     "Quality",
    "Environment",
    "Health",
    "Safety",
    "Welfare",
    "Energy",
    "ESG",
    "Sustainability "
  ];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide select-none">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => dispatch(setCategory(cat))}
            className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shrink-0 transition-all duration-150 cursor-pointer ${isActive
                ? "bg-[#0096FF] text-white shadow-xs"
                : "bg-[#F3F4F6] text-[#334155] border border-slate-200/60 hover:bg-[#E5E7EB] hover:text-[#0F172A]"
              }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
