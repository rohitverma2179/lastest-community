import React, { useState } from "react";
import { Trash2, Filter, Check, RotateCcw } from "lucide-react";

/**
 * WishlistActionBar Component
 * Top control bar containing Select-All checkbox, Trash (Delete Selected) button,
 * Category Filter checkboxes, and Latest/Oldest Sort options.
 */
export default function WishlistActionBar({
  isAllChecked,
  selectedCount,
  onToggleSelectAll,
  onDeleteSelected,
  selectedCategories = [],
  onToggleCategory,
  onSelectAllCategories,
  sortBy = "latest",
  onSelectSortBy,
  // Fallbacks for backwards compatibility
  activeFilter,
  onSelectFilter,
}) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const categoryOptions = [
    { id: "all", label: "All" },
    { id: "discussions", label: "Questions" },
    { id: "files", label: "Resources" },
    { id: "jobs", label: "Jobs" },
    { id: "meetings", label: "Events" },
    { id: "polls", label: "Poll" },
    { id: "quizzes", label: "Quiz" },
  ];

  const sortOptions = [
    { id: "latest", label: "Latest (Newest first)" },
    { id: "oldest", label: "Oldest (Oldest first)" },
  ];

  // Resolve active category selections
  const effectiveCategories = selectedCategories.length > 0 
    ? selectedCategories 
    : (activeFilter && activeFilter !== "latest" && activeFilter !== "oldest" ? [activeFilter] : ["all"]);

  const isAllActive = effectiveCategories.includes("all") || effectiveCategories.length === 0;

  const handleCategoryClick = (catId) => {
    if (onToggleCategory) {
      onToggleCategory(catId);
    } else if (onSelectFilter) {
      onSelectFilter(catId);
    }
  };

  const handleSortClick = (sortId) => {
    if (onSelectSortBy) {
      onSelectSortBy(sortId);
    } else if (onSelectFilter) {
      onSelectFilter(sortId);
    }
  };

  const hasActiveFilters = !isAllActive || sortBy !== "latest";

  return (
    <div className="bg-[#E9E9E9] rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs px-4 sm:px-6 py-3 flex items-center justify-between relative">
      {/* Left Side Controls: Select All Checkbox & Delete Trash Icon */}
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={onToggleSelectAll}
            className="w-4 h-4 rounded text-[#0096ff] border-slate-300 focus:ring-[#0096ff] cursor-pointer"
          />
        </label>

        <button
          type="button" 
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            selectedCount > 0
              ? "text-slate-500 hover:text-red-600 cursor-pointer"
              : "text-slate-300 hidden cursor-not-allowed"
          }`}
          title={selectedCount > 0 ? `Delete selected (${selectedCount})` : "Select items to delete"}
        >
          <Trash2 className="w-4 h-4 text-red-600 stroke-[1.75]" />
          {selectedCount > 0 && (
            <span className="text-xs font-bold text-red-600">({selectedCount})</span>
          )}
        </button>
      </div>

      {/* Right Side Controls: Filters & Sort Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
          className={`text-xs sm:text-sm font-semibold flex items-center gap-2 px-3 py-1.5 rounded-xl transition cursor-pointer ${
            hasActiveFilters
              ? "bg-white text-[#0096ff] shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
          }`}
        >
          <Filter className={`w-4 h-4 stroke-[1.75] ${hasActiveFilters ? "text-[#0096ff]" : "text-slate-500"}`} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#0096ff]" />
          )}
        </button>

        {isFilterDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsFilterDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-30 animate-in fade-in duration-150 space-y-2">
              
              {/* Category Filter Section with Checkboxes */}
              <div>
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Categories</span>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectAllCategories) onSelectAllCategories();
                        if (onSelectSortBy) onSelectSortBy("latest");
                      }}
                      className="text-[#0096ff] hover:underline flex items-center gap-1 font-semibold normal-case text-[11px] cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                <div className="space-y-0.5 mt-1">
                  {categoryOptions.map((opt) => {
                    const isChecked = opt.id === "all" ? isAllActive : effectiveCategories.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleCategoryClick(opt.id)}
                        className={`w-full px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition select-none text-left ${
                          isChecked
                            ? "bg-sky-50 text-[#0096ff] font-bold shadow-2xs"
                            : "text-slate-700 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                              isChecked
                                ? "bg-[#0096ff] border-[#0096ff] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>
                        {isChecked && <Check className="w-4 h-4 text-[#0096ff] stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Sort Order Section (Latest / Oldest) */}
              <div>
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Sort Order
                </div>

                <div className="space-y-0.5 mt-1">
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSortClick(opt.id)}
                        className={`w-full px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition select-none text-left ${
                          isSelected
                            ? "bg-sky-50 text-[#0096ff] font-bold shadow-2xs"
                            : "text-slate-700 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                              isSelected
                                ? "bg-[#0096ff] border-[#0096ff] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#0096ff] stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
