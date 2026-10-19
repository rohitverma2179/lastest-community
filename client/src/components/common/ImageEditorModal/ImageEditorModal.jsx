import React, { useState, useRef, useEffect } from "react"; // React hooks
import { X, ArrowLeft, Loader2 } from "lucide-react"; // Icons for modal controls
import CropTab from "./CropTab"; // Crop tab component
import FilterTab from "./FilterTab"; // Filter tab component
import AdjustTab from "./AdjustTab"; // Adjust tab component
import {
  getAspectRatioValue,
  getCombinedFilterString,
  renderEditedImageToDataUrl,
  GRADIENT_PRESETS,
} from "./canvasUtils"; // Canvas rendering utilities

/**
 * ImageEditorModal Component
 * 
 * Professional LinkedIn-style Image Editor Modal supporting:
 * - Rotate 90° steps + fine Straighten slider (-45° to +45°)
 * - Horizontal & Vertical Flip mirror effects
 * - Aspect Ratio cropping presets ('Original', 'Square', '4:1', '3:4', '16:9')
 * - Zoom & Interactive Pan dragging
 * - Color Filter Presets (Vintage, Grayscale, Sepia, Warm, Cool, Vivid, etc.)
 * - Brightness, Contrast, and Saturation adjustments
 * - Background gradient selection for whitespace/blank canvas areas
 * - Offscreen canvas export to high quality banner Data URL
 */
export default function ImageEditorModal({
  isOpen,          // Modal visible state boolean
  imageSrc,        // Source image URL/base64 string to edit
  defaultGradient, // Default gradient CSS or object from parent modal (e.g. CreateEventModal)
  onClose,         // Callback when modal is closed/cancelled
  onSave,          // Callback when user clicks 'Apply' with edited data URL output
}) {
  // Active tab selection state: 'crop' | 'filter' | 'adjust'
  const [activeTab, setActiveTab] = useState("crop");

  // Transform states
  const [rotation90, setRotation90] = useState(0); // 90 deg step rotation (0, 90, 180, 270)
  const [straighten, setStraighten] = useState(0); // Fine angle rotation (-45 to +45)
  const [flipH, setFlipH] = useState(false); // Horizontal flip state
  const [flipV, setFlipV] = useState(false); // Vertical flip state
  const [aspectRatioKey, setAspectRatioKey] = useState("4:1"); // Selected aspect ratio preset
  const [zoom, setZoom] = useState(1); // Zoom level (1x to 3x)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); // Drag offset {x, y}

  // Background Gradient state for empty whitespace
  const [bgGradientId, setBgGradientId] = useState(1);

  // Filter & Color Adjustment states
  const [filterId, setFilterId] = useState("original"); // Active filter preset ID
  const [brightness, setBrightness] = useState(100); // Brightness percentage (0-200, default 100)
  const [contrast, setContrast] = useState(100); // Contrast percentage (0-200, default 100)
  const [saturation, setSaturation] = useState(100); // Saturation percentage (0-200, default 100)

  // Loading state during export
  const [isApplying, setIsApplying] = useState(false);

  // References
  // References
  const imageRef = useRef(null); // Reference to loaded HTMLImageElement
  const previewBoxRef = useRef(null); // Reference to preview box container
  const isDraggingRef = useRef(false); // Ref tracking active drag state
  const dragStartRef = useRef({ x: 0, y: 0 }); // Ref tracking initial cursor position

  // Natural image dimensions state
  const [naturalDim, setNaturalDim] = useState({ width: 1600, height: 900 });

  const [boxDim, setBoxDim] = useState({ width: 0, height: 0 });

  // Helper to match initial gradient from prop
  const resolveInitialGradientId = () => {
    if (!defaultGradient) return GRADIENT_PRESETS[0].id;
    const found = GRADIENT_PRESETS.find(
      (g) => g.css === defaultGradient || g.id === defaultGradient || g.id === defaultGradient?.id || g.css === defaultGradient?.gradient
    );
    return found ? found.id : GRADIENT_PRESETS[0].id;
  };

  // Measure crop box dimensions to keep background image and crop box image in 100% scale sync
  useEffect(() => {
    if (!previewBoxRef.current) return;

    const updateBoxDim = () => {
      if (previewBoxRef.current) {
        setBoxDim({
          width: previewBoxRef.current.clientWidth || 0,
          height: previewBoxRef.current.clientHeight || 0,
        });
      }
    };

    updateBoxDim();

    const resizeObserver = new ResizeObserver(updateBoxDim);
    resizeObserver.observe(previewBoxRef.current);

    return () => resizeObserver.disconnect();
  }, [aspectRatioKey, isOpen, naturalDim]);

  // Reset editor state when a new image is loaded or modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("crop");
      setRotation90(0);
      setStraighten(0);
      setFlipH(false);
      setFlipV(false);
      setAspectRatioKey("4:1");
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      setBgGradientId(resolveInitialGradientId());
      setFilterId("original");
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
    }
  }, [isOpen, imageSrc, defaultGradient]);

  // Handle 90° rotation counter-clockwise
  const handleRotateLeft = () => {
    setRotation90((prev) => (prev - 90 + 360) % 360);
  };

  // Handle 90° rotation clockwise
  const handleRotateRight = () => {
    setRotation90((prev) => (prev + 90) % 360);
  };

  // Toggle horizontal flip
  const handleToggleFlipH = () => setFlipH((prev) => !prev);

  // Toggle vertical flip
  const handleToggleFlipV = () => setFlipV((prev) => !prev);

  // Reset brightness, contrast, saturation sliders to 100%
  const handleResetAdjustments = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  // Mouse & Touch drag handlers for panning zoomed image
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStartRef.current.x;
    const newY = e.touches[0].clientY - dragStartRef.current.y;
    setPanOffset({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Compute live visual styles for preview container
  const totalRotationAngle = rotation90 + straighten; // Combined rotation angle in degrees
  const combinedFilter = getCombinedFilterString(filterId, brightness, contrast, saturation); // CSS filter string
  const targetRatio = getAspectRatioValue(aspectRatioKey, naturalDim.width, naturalDim.height); // Ratio value
  const activeBgPreset =
    GRADIENT_PRESETS.find(
      (g) => g.id === bgGradientId || g.id === Number(bgGradientId) || g.css === bgGradientId
    ) || GRADIENT_PRESETS[0];

  // Calculate exact base dimensions so background image and crop image match 100% in scale & alignment
  const imgWidth = naturalDim.width || 1;
  const imgHeight = naturalDim.height || 1;
  const imgRatio = imgWidth / imgHeight;

  let baseW = 0;
  let baseH = 0;

  if (boxDim.width > 0 && boxDim.height > 0) {
    const boxRatio = boxDim.width / boxDim.height;
    if (imgRatio > boxRatio) {
      baseH = boxDim.height;
      baseW = boxDim.height * imgRatio;
    } else {
      baseW = boxDim.width;
      baseH = boxDim.width / imgRatio;
    }
  }

  const sharedImageStyle = {
    width: baseW ? `${baseW}px` : "100%",
    height: baseH ? `${baseH}px` : "100%",
    minWidth: baseW ? `${baseW}px` : "100%",
    minHeight: baseH ? `${baseH}px` : "100%",
    maxWidth: "none",
    maxHeight: "none",
    transform: `
      translate(${panOffset.x}px, ${panOffset.y}px)
      scale(${zoom})
      rotate(${totalRotationAngle}deg)
      scaleX(${flipH ? -1 : 1})
      scaleY(${flipV ? -1 : 1})
    `,
    filter: combinedFilter,
    transformOrigin: "center center",
  };

  // Export edited canvas image when user clicks 'Apply'
  const handleApply = async () => {
    if (!imageRef.current) return;
    setIsApplying(true);

    try {
      // Compiled editor parameters
      const editorState = {
        rotation90,
        straighten,
        flipH,
        flipV,
        aspectRatioKey,
        zoom,
        panOffset,
        bgGradientId,
        filterId,
        brightness,
        contrast,
        saturation,
        previewWidth: previewBoxRef.current?.clientWidth || 500,
      };

      // Export processed image to base64 Data URL
      const dataUrl = await renderEditedImageToDataUrl(imageRef.current, editorState);
      onSave(dataUrl); // Trigger save callback in parent CreateEventModal
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to render edited image:", err);
    } finally {
      setIsApplying(false);
    }
  };

  if (!isOpen || !imageSrc) return null; // Do not render if closed or image source is missing

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Main Modal Card Container */}
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER BAR: Title "Editor" on left, Close (X) button on right */}
        <div className="h-14 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            Editor
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY CONTAINER: 2-Column Responsive Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* LEFT COLUMN: Main Image Workspace & Interactive Crop Preview */}
          <div
            className="flex-1 bg-[#ffffff] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none cursor-grab active:cursor-grabbing touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Hidden loaded img tag for aspect ratio & canvas rendering source */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Source Canvas Target"
              crossOrigin="anonymous"
              onLoad={(e) => {
                setNaturalDim({
                  width: e.target.naturalWidth || 1600,
                  height: e.target.naturalHeight || 900,
                });
              }}
              className="hidden"
            />

            {/* Workspace Container showing full image context in background with bright crop window in center */}
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Background Full Image (Dimmed context outside crop area as shown in screenshot) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <img
                  src={imageSrc}
                  alt="Full Image Context"
                  className="shrink-0 opacity-35 brightness-75 transition-transform duration-75 pointer-events-none"
                  style={sharedImageStyle}
                />
              </div>

              {/* Bright Center Crop Viewport Window Box */}
              <div
                ref={previewBoxRef}
                className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-lg border-2 border-white/90 shadow-2xl transition-all z-10"
                style={{
                  aspectRatio: `${targetRatio}`,
                  width: targetRatio >= 1 ? "92%" : "auto",
                  height: targetRatio < 1 ? "85%" : "auto",
                  background: activeBgPreset?.css || "transparent",
                }}
              >
                {/* Live Transformed Crop Image Element */}
                <img
                  src={imageSrc}
                  alt="Edited Preview"
                  className="shrink-0 transition-transform duration-75 pointer-events-none"
                  style={sharedImageStyle}
                />

                {/* Crop Grid Guidelines Overlay */}
                <div className="absolute inset-0 border border-white/50 pointer-events-none grid grid-cols-3 grid-rows-3 z-20">
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-white/30" />
                  <div className="border-r border-white/30" />
                  <div className="" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: LinkedIn Controls Sidebar */}
          <div className="w-full md:w-88 border-t md:border-t-0 md:border-l border-slate-200 bg-white flex flex-col shrink-0">

            {/* Sidebar Title Header */}
            <div className="px-6 pt-5 pb-3 flex items-center gap-2 text-slate-800 font-bold text-sm">
              {/* <ArrowLeft className="w-4 h-4 text-slate-600" /> */}
              {/* <span>Edit</span> */}
            </div>

            {/* TAB NAVIGATION: Crop | Filter | Adjust */}
            <div className="px-6 flex items-center gap-6 border-b border-slate-200">
              {/* Crop Tab Header */}
              <button
                type="button"
                onClick={() => setActiveTab("crop")}
                className={`py-2.5 text-xs font-bold transition-all relative cursor-pointer ${activeTab === "crop"
                  ? "text-[#057642]" // Active tab green highlight
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Crop
                {activeTab === "crop" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642] rounded-t-full" />
                )}
              </button>

              {/* Filter Tab Header */}
              <button
                type="button"
                onClick={() => setActiveTab("filter")}
                className={`py-2.5 text-xs font-bold transition-all relative cursor-pointer ${activeTab === "filter"
                  ? "text-[#057642]"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Filter
                {activeTab === "filter" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642] rounded-t-full" />
                )}
              </button>

              {/* Adjust Tab Header */}
              <button
                type="button"
                onClick={() => setActiveTab("adjust")}
                className={`py-2.5 text-xs font-bold transition-all relative cursor-pointer ${activeTab === "adjust"
                  ? "text-[#057642]"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Adjust
                {activeTab === "adjust" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642] rounded-t-full" />
                )}
              </button>
            </div>

            {/* TAB CONTENT BODY */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === "crop" && (
                <CropTab
                  rotation90={rotation90}
                  onRotateLeft={handleRotateLeft}
                  onRotateRight={handleRotateRight}
                  flipH={flipH}
                  onToggleFlipH={handleToggleFlipH}
                  flipV={flipV}
                  onToggleFlipV={handleToggleFlipV}
                  aspectRatioKey={aspectRatioKey}
                  onSelectAspectRatio={setAspectRatioKey}
                  bgGradientId={bgGradientId}
                  onSelectBgGradient={setBgGradientId}
                  zoom={zoom}
                  onChangeZoom={setZoom}
                  straighten={straighten}
                  onChangeStraighten={setStraighten}
                />
              )}

              {activeTab === "filter" && (
                <FilterTab
                  activeFilterId={filterId}
                  onSelectFilter={setFilterId}
                  imageSrc={imageSrc}
                />
              )}

              {activeTab === "adjust" && (
                <AdjustTab
                  brightness={brightness}
                  onChangeBrightness={setBrightness}
                  contrast={contrast}
                  onChangeContrast={setContrast}
                  saturation={saturation}
                  onChangeSaturation={setSaturation}
                  onResetAdjustments={handleResetAdjustments}
                />
              )}
            </div>

            {/* SIDEBAR FOOTER: Apply Button */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={handleApply}
                disabled={isApplying}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#057642] hover:bg-[#046237] text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isApplying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Apply</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
