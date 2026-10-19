/**
 * canvasUtils.js
 * 
 * Production-level utility module for HTML5 Canvas manipulation and calculations
 * used by the ImageEditorModal component (LinkedIn-style Image Editor).
 */

// Filter preset definitions matching professional image processing defaults
export const FILTER_PRESETS = [
  { id: "original", name: "Original", cssFilter: "none" }, // Unmodified original photo
  { id: "vintage", name: "Vintage", cssFilter: "sepia(0.35) contrast(1.1) brightness(0.95) saturate(1.2)" }, // Warm retro look
  { id: "grayscale", name: "Grayscale", cssFilter: "grayscale(1) contrast(1.1)" }, // Classic black & white
  { id: "sepia", name: "Sepia", cssFilter: "sepia(0.85) saturate(1.1)" }, // Warm golden brown tone
  { id: "warm", name: "Warm", cssFilter: "sepia(0.2) saturate(1.3) brightness(1.05)" }, // Sun-kissed warmth
  { id: "cool", name: "Cool", cssFilter: "hue-rotate(180deg) saturate(0.9) brightness(1.02)" }, // Cool blue tones
  { id: "high-contrast", name: "High Contrast", cssFilter: "contrast(1.4) saturate(1.2)" }, // Punchy vivid colors
  { id: "vivid", name: "Vivid", cssFilter: "saturate(1.6) brightness(1.05) contrast(1.1)" }, // Ultra bright and saturated
  { id: "dim", name: "Dim", cssFilter: "brightness(0.85) contrast(0.95)" }, // Soft darkened style
];

/// Gradient background presets matching CreateEventModal PRESET_GRADIENTS
export const GRADIENT_PRESETS = [
  {
    id: 1,
    name: "Quality",
    css: "linear-gradient(135deg, #d9534f 0%, #e06d53 100%)",
    stops: [
      { offset: 0, color: "#d9534f" },
      { offset: 1, color: "#e06d53" },
    ],
  },
  {
    id: 2,
    name: "Environment",
    css: "linear-gradient(180deg, #30cfd0 0%, #330867 100%)",
    stops: [
      { offset: 0, color: "#30cfd0" },
      { offset: 1, color: "#330867" },
    ],
  },
  {
    id: 3,
    name: "Health",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    stops: [
      { offset: 0, color: "#667eea" },
      { offset: 1, color: "#764ba2" },
    ],
  },
  {
    id: 4,
    name: "Safety",
    css: "linear-gradient(180deg, #2af598 0%, #009efd 100%)",
    stops: [
      { offset: 0, color: "#2af598" },
      { offset: 1, color: "#009efd" },
    ],
  },
  {
    id: 5,
    name: "Welfare",
    css: "linear-gradient(180deg, #37ecba 0%, #72afd3 100%)",
    stops: [
      { offset: 0, color: "#37ecba" },
      { offset: 1, color: "#72afd3" },
    ],
  },
  {
    id: 6,
    name: "Energy",
    css: "linear-gradient(90deg, #868f96 0%, #596164 100%)",
    stops: [
      { offset: 0, color: "#868f96" },
      { offset: 1, color: "#596164" },
    ],
  },
  {
    id: 7,
    name: "ESG",
    css: "linear-gradient(90deg, #a8caba 0%, #5d4157 100%)",
    stops: [
      { offset: 0, color: "#a8caba" },
      { offset: 1, color: "#5d4157" },
    ],
  },
  {
    id: 8,
    name: "Sustainability",
    css: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    stops: [
      { offset: 0, color: "#d4fc79" },
      { offset: 1, color: "#96e6a1" },
    ],
  },
  {
    id: 9,
    name: "White",
    css: "#ffffff",
    stops: [
      { offset: 0, color: "#ffffff" },
      { offset: 1, color: "#ffffff" },
    ],
  },
];



/**
 * Calculates numeric ratio (width / height) from key string
 * @param {string} key - 'Original' | 'Square' | '4:1' | '3:4' | '16:9'
 * @param {number} naturalWidth - Natural width of loaded HTMLImageElement
 * @param {number} naturalHeight - Natural height of loaded HTMLImageElement
 * @returns {number} Numeric aspect ratio value
 */

export function getAspectRatioValue(key, naturalWidth = 16, naturalHeight = 9) {
  switch (key) {
    case "Square":
      return 1; // 1:1 ratio
    case "4:1":
      return 4 / 1; // 4:1 banner ratio
    // case "3:4":
    //   return 3 / 4; // 3:4 portrait ratio
    case "16:9":
      return 16 / 9; // 16:9 widescreen ratio
    case "Original":
    default:
      return naturalWidth > 0 && naturalHeight > 0 ? naturalWidth / naturalHeight : 16 / 9;
  }
}

/**
 * Combines active filter preset string with custom slider adjustments (brightness, contrast, saturation)
 * @param {string} filterId - ID of active filter preset
 * @param {number} brightness - Brightness percentage offset (0 - 200, default 100)
 * @param {number} contrast - Contrast percentage offset (0 - 200, default 100)
 * @param {number} saturation - Saturation percentage offset (0 - 200, default 100)
 * @returns {string} Compiled CSS filter string for canvas/image preview
 */


export function getCombinedFilterString(filterId, brightness = 100, contrast = 100, saturation = 100) {
  // Find active preset css filter string
  const preset = FILTER_PRESETS.find((f) => f.id === filterId);
  const baseFilter = preset && preset.cssFilter !== "none" ? preset.cssFilter : "";

  // Convert slider values to CSS filter expressions
  const sliderFilters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  return `${baseFilter} ${sliderFilters}`.trim();
}


/**
 * Exports final cropped, transformed, filtered image to base64 Data URL using HTML5 Canvas.
 * 
 * @param {HTMLImageElement} image - Raw loaded image element
 * @param {Object} editorState - Current editor parameters
 * @returns {Promise<string>} Base64 Data URL of processed image
 */

export function renderEditedImageToDataUrl(image, editorState) {
  return new Promise((resolve, reject) => {
    try {
      // Create offscreen canvas for rendering
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx || !image) {
        reject(new Error("Canvas context or image unavailable"));
        return;
      }

      const naturalW = image.naturalWidth || image.width;
      const naturalH = image.naturalHeight || image.height;

      // Determine output canvas size based on target aspect ratio
      const targetRatio = getAspectRatioValue(
        editorState.aspectRatioKey,
        naturalW,
        naturalH
      );

      // Max output width for crisp banner quality (e.g. 1600px width)
      let outputW = Math.min(naturalW, 1600);
      let outputH = Math.round(outputW / targetRatio);

      if (outputH > 1200) {
        outputH = 1200;
        outputW = Math.round(outputH * targetRatio);
      }

      canvas.width = outputW;
      canvas.height = outputH;

      // Fill canvas background with selected gradient preset matching CreateEventModal
      const selectedBgId = editorState.bgGradientId;
      const bgPreset =
        GRADIENT_PRESETS.find((g) => g.id === selectedBgId || g.id === Number(selectedBgId) || g.css === selectedBgId) ||
        GRADIENT_PRESETS[0];

      if (bgPreset && bgPreset.stops && bgPreset.stops.length > 1) {
        const grad = ctx.createLinearGradient(0, 0, outputW, outputH);
        bgPreset.stops.forEach((stop) => {
          grad.addColorStop(stop.offset, stop.color);
        });
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = bgPreset?.css || "#ffffff";
      }
      ctx.fillRect(0, 0, outputW, outputH);

      // Save canvas state before transformations
      ctx.save();

      // Move canvas origin to center for rotation & flip scaling
      ctx.translate(outputW / 2, outputH / 2);

      // Apply total rotation angle (90 deg steps + fine straighten angle)
      const totalAngleDeg = (editorState.rotation90 || 0) + (editorState.straighten || 0);
      const totalAngleRad = (totalAngleDeg * Math.PI) / 180;
      ctx.rotate(totalAngleRad);

      // Apply horizontal and vertical flip scaling
      const scaleX = editorState.flipH ? -1 : 1;
      const scaleY = editorState.flipV ? -1 : 1;
      ctx.scale(scaleX, scaleY);

      // Apply color filter effects directly on canvas context
      const filterString = getCombinedFilterString(
        editorState.filterId,
        editorState.brightness,
        editorState.contrast,
        editorState.saturation
      );
      ctx.filter = filterString;

      // Calculate zoomed scale and crop positioning taking rotation into account
      const zoom = editorState.zoom || 1;

      // Calculate rotated bounding dimensions to ensure full canvas cover without accidental white space
      const cos = Math.abs(Math.cos(totalAngleRad));
      const sin = Math.abs(Math.sin(totalAngleRad));
      const rotatedW = naturalW * cos + naturalH * sin;
      const rotatedH = naturalW * sin + naturalH * cos;

      // Base cover scale factor to fit rotated image into crop canvas box
      const scaleToFit = Math.max(outputW / rotatedW, outputH / rotatedH);
      const finalWidth = naturalW * scaleToFit * zoom;
      const finalHeight = naturalH * scaleToFit * zoom;

      // Include pan offset normalized to canvas space
      const previewWidth = editorState.previewWidth || 500;
      const panScale = outputW / previewWidth;
      const offsetX = (editorState.panOffset?.x || 0) * panScale;
      const offsetY = (editorState.panOffset?.y || 0) * panScale;

      // Draw transformed image centered at origin
      ctx.drawImage(
        image,
        -finalWidth / 2 + offsetX,
        -finalHeight / 2 + offsetY,
        finalWidth,
        finalHeight
      );

      // Restore canvas context
      ctx.restore();

      // Export canvas to high-quality WebP or PNG Data URL
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      resolve(dataUrl);
    } catch (err) {
      reject(err);
    }
  });
}