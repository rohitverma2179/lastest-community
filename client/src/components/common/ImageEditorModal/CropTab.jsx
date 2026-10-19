import React from "react"; // React core import
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react"; // Action icons for rotate & flip
import { GRADIENT_PRESETS } from "./canvasUtils"; // Gradient presets

/**
 * CropTab Component
 * 
 * Renders crop, rotate, flip, aspect ratio presets, zoom, fine straighten controls,
 * and background gradient selection for whitespace area.
 */
export default function CropTab({
  rotation90,        // Current 90-degree step rotation (0, 90, 180, 270)
  onRotateLeft,      // Handler to rotate 90 degrees counter-clockwise
  onRotateRight,     // Handler to rotate 90 degrees clockwise
  flipH,             // Boolean horizontal mirror flip state
  onToggleFlipH,     // Handler to toggle horizontal flip
  flipV,             // Boolean vertical mirror flip state
  onToggleFlipV,     // Handler to toggle vertical flip
  aspectRatioKey,    // Currently selected aspect ratio preset string ('Original', 'Square', '4:1', '3:4', '16:9')
  onSelectAspectRatio, // Handler when user selects aspect ratio pill
  bgGradientId = "dusk", // Currently selected background gradient preset ID
  onSelectBgGradient, // Handler when user selects a background gradient
  zoom,              // Zoom level slider value (1 to 3)
  onChangeZoom,      // Handler when user moves Zoom slider
  straighten,        // Straighten angle slider value (-45 to 45 deg)
  onChangeStraighten, // Handler when user moves Straighten slider
}) {
  // Preset Aspect Ratio option
  const ASPECT_RATIO_OPTIONS = ["4:1"];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* SECTION 1: Rotate & Flip Quick Tools */}
      <div className="flex items-center gap-3">
        {/* Rotate 90 deg Counter-Clockwise Button */}
        <button
          type="button"
          onClick={onRotateLeft}
          title="Rotate Counter-Clockwise (90°)"
          className="p-2 rounded-full border border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700 transition cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3 h-3 stroke-[1.8]" />
        </button>

        {/* Rotate 90 deg Clockwise Button */}
        <button
          type="button"
          onClick={onRotateRight}
          title="Rotate Clockwise (90°)"
          className="p-2 rounded-full border border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700 transition cursor-pointer active:scale-95"
        >
          <RotateCw className="w-3 h-3 stroke-[1.8]" />
        </button>

        {/* Flip Horizontal Button */}
        <button
          type="button"
          onClick={onToggleFlipH}
          title="Flip Horizontal"
          className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${flipH
              ? "bg-[#057642] text-white border-[#057642]" // Active state styling (LinkedIn Green)
              : "border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700" // Default state
            }`}
        >
          <FlipHorizontal className="w-3 h-3 stroke-[1.8]" />
        </button>

        {/* Flip Vertical Button */}
        <button
          type="button"
          onClick={onToggleFlipV}
          title="Flip Vertical"
          className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${flipV
              ? "bg-[#057642] text-white border-[#057642]" // Active state styling
              : "border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700" // Default state
            }`}
        >
          <FlipVertical className="w-3 h-3 stroke-[1.8]" />
        </button>
      </div>

      {/* SECTION 2: Aspect Ratio Preset Pills */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-slate-600 tracking-wide">
          Aspect Ratio
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {ASPECT_RATIO_OPTIONS.map((ratioOption) => {
            const isActive = aspectRatioKey === ratioOption;
            return (
              <button
                key={ratioOption}
                type="button"
                onClick={() => onSelectAspectRatio(ratioOption)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive
                    ? "bg-[#057642] text-white shadow-xs" // Active badge style
                    : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50" // Inactive badge style
                  }`}
              >
                {ratioOption}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Background Gradient Options (Whitespace Fill) */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-slate-600 tracking-wide flex items-center justify-between">
          <span>Background Gradient (Whitespace)</span>
          <span className="text-[10px] text-slate-400 font-normal">Default active</span>
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {GRADIENT_PRESETS.map((preset) => {
            const isActive = bgGradientId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectBgGradient && onSelectBgGradient(preset.id)}
                title={preset.name}
                className={`flex items-center gap-1.5 px-6 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive
                    ? "bg-slate-200 text-white shadow-xs"
                    : "bg-white text-slate-700 "
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 border border-slate-300/80 shadow-2xs"
                  style={{ background: preset.css }}
                />
                {/* <span>{preset.name}</span> */}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: Zoom Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Zoom</span>
          <span className="text-slate-400 font-normal">{Math.round(zoom * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.02"
          value={zoom}
          onChange={(e) => onChangeZoom(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#057642]"
        />
      </div>

      {/* SECTION 5: Straighten Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Straighten</span>
          <span className="text-slate-400 font-normal">{straighten}°</span>
        </div>
        <input
          type="range"
          min="-45"
          max="45"
          step="1"
          value={straighten}
          onChange={(e) => onChangeStraighten(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#057642]"
        />
      </div>
    </div>
  );
}
