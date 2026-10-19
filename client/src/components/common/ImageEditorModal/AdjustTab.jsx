import React from "react"; // React core import
import { RefreshCw } from "lucide-react"; // Reset icon

/**
 * AdjustTab Component
 * 
 * Provides slider controls for fine image adjustments: Brightness, Contrast, and Saturation,
 * with a single-click reset feature to restore defaults.
 */
export default function AdjustTab({
  brightness,        // Brightness value (0% to 200%, default 100%)
  onChangeBrightness, // Handler when user moves Brightness slider
  contrast,          // Contrast value (0% to 200%, default 100%)
  onChangeContrast,   // Handler when user moves Contrast slider
  saturation,        // Saturation value (0% to 200%, default 100%)
  onChangeSaturation, // Handler when user moves Saturation slider
  onResetAdjustments, // Handler to reset brightness, contrast, saturation to 100%
}) {
  return (
    <div className="space-y-5 select-none animate-in fade-in duration-200">
      {/* SECTION 1: Brightness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Brightness</span>
          <span className="text-slate-400 font-normal">{brightness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          value={brightness}
          onChange={(e) => onChangeBrightness(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#057642]"
        />
      </div>

      {/* SECTION 2: Contrast Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Contrast</span>
          <span className="text-slate-400 font-normal">{contrast}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          value={contrast}
          onChange={(e) => onChangeContrast(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#057642]"
        />
      </div>

      {/* SECTION 3: Saturation Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Saturation</span>
          <span className="text-slate-400 font-normal">{saturation}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          value={saturation}
          onChange={(e) => onChangeSaturation(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#057642]"
        />
      </div>

      {/* SECTION 4: Reset Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onResetAdjustments}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Adjustments</span>
        </button>
      </div>
    </div>
  );
}
