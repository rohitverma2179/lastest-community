import React, { useState } from "react";
import { Trash2, Filter, ChevronDown, Check } from "lucide-react";

/**
 * WishlistActionBar Component
 * Selection bar containing Select-All checkbox, Delete Selected button, and Filters dropdown menu.
 */
export default function DownloadActionBar({
  isAllSelected,
  selectedCount,
  onToggleSelectAll,
  onDeleteSelected,
  activeFilter,
  onSelectFilter,
}) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filterOptions = [
    { id: "all", label:   "Latest" },
    { id: "xlsx", label:  "This Week" },
    { id: "pdf", label:   "This Month" },
    { id: "ppt", label:   "Oldest" },
  ];

  return (
    <div className="bg-[#E9E9E9] rounded-xl border border-slate-200/80 shadow-xs px-4 py-2.5 flex items-center justify-between relative">
      {/* Left side controls: Checkbox & Trash */}
      <div className="flex items-center gap-3">
        {/* Checkbox (Select All) */}
        <label className="flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={onToggleSelectAll}
            className="w-4 h-4 rounded text-[#0096FF] border-slate-300 focus:ring-[#0096FF] cursor-pointer"
          />
        </label>

        {/* Trash Delete Icon */}
        <button
          type="button"
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className={`p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${selectedCount > 0
              ? "text-red-500 hover:bg-red-50 hover:text-red-600"
              : "text-slate-50 hidden cursor-not-allowed"
            }`}
          title={selectedCount > 0 ? `Delete (${selectedCount}) selected` : "Select items to delete"}
        >
          <Trash2 className="w-4 h-4 stroke-[1.8]" />
          {selectedCount > 0 && (
            <span className="text-xs font-bold text-red-500">({selectedCount})</span>
          )}
        </button>
      </div>

      {/* Right side controls: Filters Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsFilterMenuOpen((prev) => !prev)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          {/* <Filter className="w-3.5 h-3.5" /> */}
          <span>Filters</span>
          <ChevronDown className="w-3 h-3 stroke-[2]" />
        </button>

        {/* Dropdown Menu */}
        {isFilterMenuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 animate-in fade-in duration-100">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSelectFilter(opt.id);
                  setIsFilterMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3.5 py-2 text-xs text-left font-medium transition ${activeFilter === opt.id
                    ? "bg-sky-50 text-[#0096FF] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <span>{opt.label}</span>
                {activeFilter === opt.id && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
