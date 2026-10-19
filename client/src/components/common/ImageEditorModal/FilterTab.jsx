import React from "react"; // React core import
import { FILTER_PRESETS } from "./canvasUtils"; // Preset filter definitions

/**
 * FilterTab Component
 * 
 * Displays visual filter preset tiles (Original, Vintage, Grayscale, Sepia, Warm, Cool, High Contrast, Vivid, Dim)
 * allowing real-time preview and selection.
 */
export default function FilterTab({
  activeFilterId,   // ID of currently selected filter preset
  onSelectFilter,   // Callback function when user selects a filter preset
  imageSrc,         // Image source URL to display on miniature filter preview tiles
}) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <p className="text-xs font-medium text-slate-500">
        Choose a filter style to apply to your banner photo:
      </p>

      {/* Grid container for filter cards */}
      <div className="grid grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
        {FILTER_PRESETS.map((filter) => {
          const isActive = activeFilterId === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSelectFilter(filter.id)}
              className={`group flex flex-col items-center p-1.5 rounded-xl border transition-all cursor-pointer text-center ${
                isActive
                  ? "border-[#057642] ring-2 ring-[#057642]/20 bg-emerald-50/40" // Selected filter highlight
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50" // Idle filter card style
              }`}
            >
              {/* Miniature Image Preview Box with CSS filter applied */}
              <div className="relative w-full h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mb-1.5">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={filter.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    style={{ filter: filter.cssFilter }} // Apply CSS filter live on preview thumbnail
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-tr from-emerald-500 to-sky-500"
                    style={{ filter: filter.cssFilter }}
                  />
                )}
              </div>

              {/* Filter Title Label */}
              <span
                className={`text-[11px] font-semibold transition-colors ${
                  isActive ? "text-[#057642]" : "text-slate-700 group-hover:text-slate-900"
                }`}
              >
                {filter.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
