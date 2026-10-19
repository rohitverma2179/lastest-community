
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Info, Check, ChevronDown, Search, Calendar, Upload, RefreshCw, Smile } from "lucide-react";
import { closeCreateModal } from "../../features/events/eventsSlice";
import { createEventThunk, fetchEventOptions } from "../../features/events/events.thunk";
import ImageEditorModal from "../common/ImageEditorModal";

// Import Default Category Banner Images
const imgQuality = "/assets/eventdefaultimages/0ac2dd9bbae31a846d354f5669da36d7b2c9c793.jpg";
const imgEnvironment = "/assets/eventdefaultimages/5f2c8b966b589d44561912a805c4dbfdf22e3b70.jpg";
const imgHealth = "/assets/eventdefaultimages/a660e6c183decd9a02d5f3c0879a7584d0c302e7.jpg";
const imgSafety = "/assets/eventdefaultimages/ac1c6f159690a01dc7a000463d118093dcae0b4a.jpg";
const imgWelfare = "/assets/eventdefaultimages/bde76ff870cccc5c783c044c742d54e7d149972d.jpg";
const imgEnergy = "/assets/eventdefaultimages/c3b2c48f569e044b099204074a82966c10c7d697.jpg";
const imgEsg = "/assets/eventdefaultimages/ca5e0817be71a10548edfe672bc634b708f03575.jpg";
const imgSustainability = "/assets/eventdefaultimages/de981d860f76669aa0f6316351259e21442abef4 (1).jpg";

// Preset Gradients for "Use gradient" option
const PRESET_GRADIENTS = [
  { id: 1, name: "Sunset Coral", gradient: "linear-gradient(135deg, #d9534f 0%, #e06d53 100%)" },
  { id: 2, name: "Cyan Night", gradient: "linear-gradient(to top, #30cfd0 0%, #330867 100%)" },
  { id: 3, name: "Indigo Purple", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 4, name: "Spring Mint", gradient: "linear-gradient(180deg, #2af598 0%, #009efd 100%)" },
  { id: 5, name: "Aqua Seafoam", gradient: "linear-gradient(to top, #37ecba 0%, #72afd3 100%)" },
  { id: 6, name: "Metallic Slate", gradient: "linear-gradient(to right, #868f96 0%, #596164 100%)" },
  { id: 7, name: "Plum Dusk", gradient: "linear-gradient(to right, #a8caba 0%, #5d4157 100%)" },
  { id: 8, name: "Lime Spring", gradient: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" },
];

export default function CreateEventModal() {
  const dispatch = useDispatch();
  const { isCreateModalOpen } = useSelector((state) => state.events);

  // 3-Step Wizard Flow State
  const [step, setStep] = useState(1);

  // Step 1 Form State
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // Step 2 Banner Selection State (Default is Gradient)
  const [gradientIndex, setGradientIndex] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState({
    type: "gradient",
    id: "gradient-1",
    name: "Use gradient",
    gradient: PRESET_GRADIENTS[0].gradient,
  });
  const [uploadedBanners, setUploadedBanners] = useState([]);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState(null);

  // Step 2 LinkedIn Image Editor Modal State
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const [tempImageToEdit, setTempImageToEdit] = useState(null);

  // Step 3 Form State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [format, setFormat] = useState("");
  const [joiningLink, setJoiningLink] = useState("");

  const getTodayIsoString = () => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const formatDateTimeString = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const dateNum = d.getDate();

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${dayName}, ${monthName} ${dateNum} · ${hours}:${minutes} IST`;
  };

  const [rawWhenDate, setRawWhenDate] = useState(() => getTodayIsoString());
  const [when, setWhen] = useState(() => formatDateTimeString(getTodayIsoString()));

  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Validation Errors State
  const [errors, setErrors] = useState({});

  // Dropdowns & Refs
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  const domainOptions = [
    "Quality",
    "Environment",
    "Health",
    "Safety",
    "Welfare",
    "Energy",
    "ESG",
    "Sustainability "
  ];



  const defaultCategoryBanners = [
    { id: "Quality", name: "Quality", image: imgQuality },
    { id: "Environment", name: "Environment", image: imgEnvironment },
    { id: "Health", name: "Health", image: imgHealth },
    { id: "Safety", name: "Safety", image: imgSafety },
    { id: "Welfare", name: "Welfare", image: imgWelfare },
    { id: "Energy", name: "Energy", image: imgEnergy },
    { id: "ESG", name: "ESG", image: imgEsg },
    { id: "Sustainability", name: "Sustainability", image: imgSustainability },
  ];

  const tagOptions = [
    "Guide", "Training", "Hiring", "Consulting", "Poster", "Quiz", "Case-study",
    "ISO-9001", "ISO-50001", "ISO-14001", "NEBOSH", "ISO-45001", "GRI", "ESRS",
    "BRSR", "Audit", "RCA", "LOPA", "Implementation", "Certifications",
    "Risk-Assessments", "Scope-3", "HAZOP", "Documentation", "Compliance",
    "Awareness", "Six-Sigma", "Legal-Compliance", "Monitoring", "Emergency-Prep",
    "Gap-Assessments", "Continual-Improvement", "ISO-Standards", "Root-Cause",
    "Reports", "Toolbox-Talks", "Corrective-Actions", "Management-Reviews",
    "Integrated-Systems", "Inspections", "Incident-Investigation", "Work-Instructions",
    "Checklists", "Best-Practices", "Guidelines", "Job-Safety-Analysis",
    "Preventive-Action", "Benchmarking", "Waste-Management", "Supplier-Audits",
    "Competency-Mapping", "Job-Openings", "Announcement", "Procedures",
    "Workshops", "Discussion", "Permit-To-Work", "Policies", "Templates",
    "Webinars", "Regulatory-Update", "Near-Miss", "Performance-Metrics",
    "Carbon-Footprint", "Energy-Efficiency", "Mock-Drills", "Career-Guidance",
    "Success-Story"
  ];

  const formatOptions = [
    "Webinar",
    "Q&A",
    "Announcement",
    "Workshop",
    "Live-Demo",
    "Meetup",
    "Event"
  ];







  useEffect(() => {
    if (isCreateModalOpen) {
      dispatch(fetchEventOptions());

      // Pick a random gradient every time modal opens!
      const randomIdx = Math.floor(Math.random() * PRESET_GRADIENTS.length);
      setGradientIndex(randomIdx);
      const g = PRESET_GRADIENTS[randomIdx];
      setSelectedBanner({
        type: "gradient",
        id: `gradient-${g.id}`,
        name: "Use gradient",
        gradient: g.gradient
      });
    }
  }, [isCreateModalOpen, dispatch]);

  if (!isCreateModalOpen) return null;

  const handleDomainToggle = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? [] : [domain]
    );
    if (errors.domains) {
      setErrors((prev) => ({ ...prev, domains: null }));
    }
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => {
      let updated;
      if (prev.includes(type)) {
        updated = prev.filter((t) => t !== type);
      } else {
        if (prev.length >= 2) {
          return prev;
        }
        updated = [...prev, type];
      }
      if (updated.length > 0 && errors.types) {
        setErrors((err) => ({ ...err, types: null }));
      }
      return updated;
    });
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setRawWhenDate(val);
    const formatted = formatDateTimeString(val);
    setWhen(formatted);
    if (errors.when) {
      setErrors((prev) => ({ ...prev, when: null }));
    }
  };

  // Upload custom banner -> Launches LinkedIn-style ImageEditorModal
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // KB limit validation (must be < 1MB / < 1024KB)
      if (file.size >= 1024 * 1024) {
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
        setErrors((prev) => ({
          ...prev,
          banner: `File size is ${sizeInMb} MB. Image must be uploaded in KB only (less than 1 MB).`
        }));
        if (e.target) e.target.value = "";
        return;
      }

      setErrors((prev) => ({ ...prev, banner: null }));
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const rawUrl = uploadEvent.target.result;
        setTempImageToEdit(rawUrl);
        setEditingPhotoIndex(null);
        setIsImageEditorOpen(true);
      };
      reader.readAsDataURL(file);
      if (e.target) e.target.value = "";
    }
  };

  // Callback when image editing is completed in ImageEditorModal
  const handleSaveEditedImage = (editedDataUrl) => {
    setUploadedBanners((prev) => {
      let updated;
      if (editingPhotoIndex !== null && editingPhotoIndex >= 0) {
        updated = [...prev];
        updated[editingPhotoIndex] = editedDataUrl;
      } else if (prev.length >= 2) {
        updated = [prev[0], editedDataUrl];
      } else {
        updated = [...prev, editedDataUrl];
      }
      return updated;
    });

    setSelectedBanner({
      type: "custom",
      id: `custom-upload-${Date.now()}`,
      name: "Uploaded Photo",
      url: editedDataUrl,
    });
    setEditingPhotoIndex(null);
  };

  // Open ImageEditorModal for an existing selected photo banner
  const handleEditExistingPhoto = () => {
    if (selectedBanner && selectedBanner.url) {
      const idx = uploadedBanners.findIndex((u) => u === selectedBanner.url);
      setEditingPhotoIndex(idx >= 0 ? idx : null);
      setTempImageToEdit(selectedBanner.url);
      setIsImageEditorOpen(true);
    }
  };

  // Reset to default gradient mode
  const resetToDefaultGradient = () => {
    setSelectedBanner({
      type: "gradient",
      id: `gradient-${PRESET_GRADIENTS[gradientIndex].id}`,
      name: "Use gradient",
      gradient: PRESET_GRADIENTS[gradientIndex].gradient
    });
  };

  // Cycle gradient when refresh button on "Use gradient" card is clicked
  const handleGradientCycle = (e) => {
    e.stopPropagation();
    const nextIdx = (gradientIndex + 1) % PRESET_GRADIENTS.length;
    setGradientIndex(nextIdx);
    const g = PRESET_GRADIENTS[nextIdx];
    setSelectedBanner({
      type: "gradient",
      id: `gradient-${g.id}`,
      // name: "Use gradient",
      name: "Use gradient",
      gradient: g.gradient
    });
  };

  const handleClose = () => {
    setStep(1);
    setTitle("");
    setDetails("");
    setSelectedDomains([]);
    setGradientIndex(0);
    setSelectedBanner({
      type: "gradient",
      id: "gradient-1",
      name: "Use gradient",
      gradient: PRESET_GRADIENTS[0].gradient
    });
    setUploadedBanners([]);
    setEditingPhotoIndex(null);
    setSelectedTypes([]);
    setFormat("");
    setJoiningLink("");
    const todayIso = getTodayIsoString();
    setRawWhenDate(todayIso);
    setWhen(formatDateTimeString(todayIso));
    setErrors({});
    setIsTagDropdownOpen(false);
    setIsFormatDropdownOpen(false);
    setIsConfirmModalOpen(false);
    dispatch(closeCreateModal());
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (selectedDomains.length === 0) {
      newErrors.domains = "Please select at least 1 domain.";
    }
    if (!title.trim()) {
      newErrors.title = "Select role / title is required.";
    } else if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    }
    if (!details.trim()) {
      newErrors.details = "Details are required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    // Banner selection defaults to gradient if no photo is selected
    return true;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (selectedTypes.length === 0) {
      newErrors.types = "Please select at least 1 tag.";
    }
    if (!format || !format.trim()) {
      newErrors.format = "Please select a format.";
    }
    if (!joiningLink.trim()) {
      newErrors.joiningLink = "Joining link is required.";
    } else if (!/^https?:\/\/.+/i.test(joiningLink.trim())) {
      newErrors.joiningLink = "Please enter a valid URL (e.g. https://...).";
    }
    if (!when.trim()) {
      newErrors.when = "Date & time (When) is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setErrors({});
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setErrors({});
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep((prev) => prev - 1);
    }
  };

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleFinalSubmit = () => {
    const isGradient = !selectedBanner || selectedBanner.type === "gradient";
    const bannerUrl = isGradient ? "" : (selectedBanner?.url || imgQuality);
    const bannerGradient = selectedBanner?.gradient || PRESET_GRADIENTS[gradientIndex]?.gradient || PRESET_GRADIENTS[0].gradient;
    const bannerType = selectedBanner?.type || "gradient";

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      format: format,
      type: format.toUpperCase(),
      tag: selectedTypes[0] ? selectedTypes[0].toUpperCase() : (selectedDomains[0] || "QUALITY").toUpperCase(),
      tags: selectedTypes.length > 0 ? selectedTypes : [selectedDomains[0] || "Quality"],
      sector: selectedDomains[0] || "Health",
      domain: selectedDomains[0] || "Quality",
      description: details.trim(),
      banner: bannerUrl,
      bannerGradient: bannerGradient,
      bannerType: bannerType,
      eventDate: when || "Upcoming",
      date: when || "Upcoming",
      joiningLink: joiningLink || "#",
      badges: ["UPCOMING"],
      author: {
        name: "eGrowth Community",
        title: "LEAD ASSESSOR",
        badge: "CREATOR",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
      },
      stats: {
        applied: 0,
        upvotes: 0,
        comments: 0
      },
      isBookmarked: false,
      buttonText: "Register Free",
      buttonType: "REGISTER_FREE"
    };

    dispatch(createEventThunk(newEvent));
    handleClose();
  };

  return (
    <>
      {/* Main Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-all duration-200 overflow-y-auto select-none">
        <div className="relative bg-[#faf9f6] w-full max-w-xl rounded-2xl md:rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">

          {/* Top Header Bar */}
          <div className="bg-[#f4f1ea] px-5 sm:px-6 py-2 flex items-center justify-between border-b border-stone-200/80">
            <div className="flex items-center gap-2 text-slate-800 font-medium text-xs sm:text-sm md:text-base">
              <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-slate-800 text-[11px] font-bold shrink-0">
                i
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-black/5 transition cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <form onSubmit={step === 3 ? handleOpenConfirm : (e) => e.preventDefault()}>
            <div className="p-5 sm:p-7 space-y-5 sm:space-y-6 bg-white max-h-[calc(85vh-100px)] overflow-y-auto custom-scrollbar">

              {/* STEP 1: Domain, Title, Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F2942]">
                    Create Event
                  </h2>

                  {/* DOMAIN Section */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                      CATEGORY
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {domainOptions.map((domain) => {
                        const isSelected = selectedDomains.includes(domain);
                        return (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => handleDomainToggle(domain)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border transition cursor-pointer outline-none ${isSelected
                              ? "bg-[#0096FF] border-[#0096FF] text-white font-semibold shadow-2xs"
                              : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"
                              }`}
                          >
                            {domain}
                          </button>
                        );
                      })}
                    </div>
                    {errors.domains && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.domains}</p>
                    )}
                  </div>

                  {/* SELECT ROLE (Title) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                        SELECT ROLE
                      </label>
                      <span className={`text-[11px] font-medium ${title.length >= 120 ? "text-red-500 font-semibold" : "text-slate-400"}`}>
                        {title.length}/120
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={120}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                      }}
                      placeholder="e.g. Does ISO 9001 require a documented internal audit procedure?"
                      className={`w-full bg-[#f4f3ef] border-0 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-normal outline-none focus:ring-1 focus:ring-sky-500 transition ${errors.title ? "ring-1 ring-red-400 bg-red-50/20" : ""
                        }`}
                    />
                    {errors.title && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.title}</p>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                        DETAILS
                      </label>
                      <span className={`text-[11px] font-medium ${details.trim().length > 0 && details.trim().length < 50 ? "text-amber-500 font-semibold" : "text-slate-400"}`}>
                        {details.length} / Min 50 chars
                      </span>
                    </div>
                    <textarea
                      value={details}
                      onChange={(e) => {
                        setDetails(e.target.value);
                        if (errors.details) setErrors((prev) => ({ ...prev, details: null }));
                      }}
                      rows={4}
                      placeholder="Add detail, standard/clause, sector, and what you've already tried..."
                      className={`w-full bg-[#f4f3ef] border-0 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-normal outline-none resize-none focus:ring-1 focus:ring-sky-500 transition ${errors.details ? "ring-1 ring-red-400 bg-red-50/20" : ""
                        }`}
                    />
                    {errors.details && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.details}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Banner Upload & Category Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Top Preview Banner Container */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                    {selectedBanner && (selectedBanner.type === "category" || selectedBanner.type === "custom") ? (
                      <>
                        <img
                          src={selectedBanner.url}
                          alt="Selected Banner Preview"
                          className="w-full h-full object-cover"
                        />
                        {/* Top-Right X button to cut/remove photo */}
                        <button
                          type="button"
                          onClick={resetToDefaultGradient}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition cursor-pointer z-20 shadow-md flex items-center justify-center"
                          title="Remove photo (Revert to Gradient)"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>

                        {/* Edit Photo Button (Only for custom uploaded photos) */}
                        {selectedBanner?.type === "custom" && (
                          <button
                            type="button"
                            onClick={handleEditExistingPhoto}
                            className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-1.5 z-20 active:scale-95"
                            title="Edit Photo (Crop, Rotate, Filter, Adjust)"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-[#057642]" />
                            <span>Edit Photo</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center p-4 relative"
                        style={{ background: selectedBanner?.gradient || PRESET_GRADIENTS[gradientIndex].gradient }}
                      >
                        <span className="text-white font-bold text-base sm:text-lg drop-shadow-md">
                          {/* {PRESET_GRADIENTS[gradientIndex].name} */}
                        </span>
                      </div>
                    )}
                  </div>

                  {errors.banner && (
                    <p className="text-xs text-red-500 text-center mt-2 animate-in fade-in duration-150">
                      {errors.banner}
                    </p>
                  )}

                  {/* Choose a category Section */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">
                        Choose a category
                      </h3>
                      <p className="text-xs text-slate-400 font-normal mt-0.5">
                        Select banner, upload photo, or pick one category image.
                      </p>
                    </div>

                    {/* Category Cards Grid (4 columns layout) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">

                      {/* Card 1: Use gradient */}
                      <div
                        onClick={() => {
                          setSelectedBanner({
                            type: "gradient",
                            id: `gradient-${PRESET_GRADIENTS[gradientIndex].id}`,
                            name: "Use gradient",
                            gradient: PRESET_GRADIENTS[gradientIndex].gradient
                          });
                        }}
                        className={`relative h-24 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all ${!selectedBanner || selectedBanner.type === "gradient"
                          ? "ring-3 ring-[#0096FF] shadow-md scale-[1.02]"
                          : "hover:opacity-95"
                          }`}
                        style={{ background: PRESET_GRADIENTS[gradientIndex].gradient }}
                      >
                        <button
                          type="button"
                          onClick={handleGradientCycle}
                          className="absolute top-2 left-2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition cursor-pointer z-20"
                          title="Auto-change gradient"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* {(!selectedBanner || selectedBanner.type === "gradient") && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-white/30 text-white z-20">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )} */}

                        {/* <span className="relative z-10 text-white font-bold text-xs drop-shadow-md">
                          gradient
                        </span> */}
                      </div>

                      {/* Card 2: Upload Photo card */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative h-24 rounded-2xl border-2 border-dashed border-slate-300 hover:border-sky-400 bg-slate-50/80 hover:bg-sky-50/40 flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all group"
                      >
                        <Upload className="w-5 h-5 text-slate-500 group-hover:text-[#0096FF] mb-1" />
                        <span className="text-slate-700 group-hover:text-[#0096FF] font-bold text-xs">
                          Upload Photo
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          Max 1 MB
                        </span>
                      </div>

                      {/* Slot 3: Uploaded Photo 1 card or empty blank slot */}
                      {uploadedBanners[0] ? (
                        <div
                          onClick={() => {
                            const isSelected = selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[0];
                            if (isSelected) {
                              resetToDefaultGradient();
                            } else {
                              setSelectedBanner({
                                type: "custom",
                                id: "custom-upload-0",
                                name: "Uploaded Photo 1",
                                url: uploadedBanners[0],
                              });
                            }
                          }}
                          className={`relative h-24 rounded-2xl overflow-hidden flex items-center justify-center text-center p-2 cursor-pointer transition-all animate-in fade-in zoom-in-95 duration-200 ${selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[0]
                            ? "ring-3 ring-[#0096FF] shadow-md scale-[1.02]"
                            : "hover:opacity-95"
                            }`}
                        >
                          <img
                            src={uploadedBanners[0]}
                            alt="Uploaded Photo 1"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30" />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const isSelected = selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[0];
                              const updated = uploadedBanners.filter((_, i) => i !== 0);
                              setUploadedBanners(updated);
                              if (isSelected) {
                                resetToDefaultGradient();
                              }
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer z-20"
                            title="Remove photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          <span className="relative z-10 text-white font-bold text-xs drop-shadow-xs">
                            Photo 1
                          </span>
                        </div>
                      ) : (
                        <div className="relative h-24 rounded-2xl bg-stone-100/60 border border-dashed border-stone-200/80 flex items-center justify-center text-stone-300 text-xs select-none">
                          <span>Empty</span>
                        </div>
                      )}

                      {/* Slot 4: Uploaded Photo 2 card or empty blank slot */}
                      {uploadedBanners[1] ? (
                        <div
                          onClick={() => {
                            const isSelected = selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[1];
                            if (isSelected) {
                              resetToDefaultGradient();
                            } else {
                              setSelectedBanner({
                                type: "custom",
                                id: "custom-upload-1",
                                name: "Uploaded Photo 2",
                                url: uploadedBanners[1],
                              });
                            }
                          }}
                          className={`relative h-24 rounded-2xl overflow-hidden flex items-center justify-center text-center p-2 cursor-pointer transition-all animate-in fade-in zoom-in-95 duration-200 ${selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[1]
                            ? "ring-3 ring-[#0096FF] shadow-md scale-[1.02]"
                            : "hover:opacity-95"
                            }`}
                        >
                          <img
                            src={uploadedBanners[1]}
                            alt="Uploaded Photo 2"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30" />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const isSelected = selectedBanner?.type === "custom" && selectedBanner?.url === uploadedBanners[1];
                              const updated = uploadedBanners.filter((_, i) => i !== 1);
                              setUploadedBanners(updated);
                              if (isSelected) {
                                resetToDefaultGradient();
                              }
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer z-20"
                            title="Remove photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          <span className="relative z-10 text-white font-bold text-xs drop-shadow-xs">
                            Photo 2
                          </span>
                        </div>
                      ) : (
                        <div className="relative h-24 rounded-2xl bg-stone-100/60 border border-dashed border-stone-200/80 flex items-center justify-center text-stone-300 text-xs select-none">
                          <span>Empty</span>
                        </div>
                      )}

                      {/* Cards 5-12: The 8 Default System Category Banner Images (Always start on Row 2) */}
                      {defaultCategoryBanners.map((cat) => {
                        const isSelected = selectedBanner?.type === "category" && selectedBanner?.id === cat.id;

                        return (
                          <div
                            key={cat.id}
                            onClick={() => {
                              if (isSelected) {
                                resetToDefaultGradient();
                              } else {
                                setSelectedBanner({
                                  type: "category",
                                  id: cat.id,
                                  name: cat.name,
                                  url: cat.image
                                });
                              }
                            }}
                            className={`relative h-24 rounded-2xl overflow-hidden flex items-center justify-center text-center p-2 cursor-pointer transition-all ${isSelected
                              ? "ring-3 ring-[#0096FF] shadow-md scale-[1.02]"
                              : "hover:opacity-95"
                              }`}
                          >
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/35 hover:bg-black/25 transition-colors" />

                            <span className="relative z-10 text-white font-bold text-xs sm:text-sm drop-shadow-xs">
                              {cat.name}
                            </span>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Tags, Format, Joining Link, When, What You Earn */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F2942]">
                    Create Event
                  </h2>

                  {/* TAGS Section */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                      TAGS
                    </label>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Search Dropdown Selector */}
                      <div className="relative w-full sm:w-56">
                        <div className="relative w-full flex items-center bg-[#f4f3ef] border-0 rounded-2xl px-3.5 py-3 text-xs text-slate-700 font-normal outline-none focus-within:ring-1 focus-within:ring-sky-500 transition">
                          <input
                            type="text"
                            value={tagSearchQuery}
                            onFocus={() => setIsTagDropdownOpen(true)}
                            onChange={(e) => {
                              setTagSearchQuery(e.target.value);
                              if (!isTagDropdownOpen) setIsTagDropdownOpen(true);
                            }}
                            placeholder="Select tag..."
                            className="w-full bg-transparent border-0 outline-none text-slate-700 placeholder-slate-400 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => setIsTagDropdownOpen((prev) => !prev)}
                            className="p-1 text-slate-500 hover:text-slate-700 transition cursor-pointer shrink-0"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTagDropdownOpen ? "rotate-180 text-sky-600" : ""}`} />
                          </button>
                        </div>

                        {/* Dropdown Panel */}
                        {isTagDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-[90]"
                              onClick={() => setIsTagDropdownOpen(false)}
                            />

                            <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-2xl ring-1 ring-slate-900/10 border border-slate-200 p-2 z-[100] shadow-xl max-h-48 overflow-y-auto custom-scrollbar space-y-0.5">
                              {tagOptions
                                .filter((t) => t.toLowerCase().includes(tagSearchQuery.toLowerCase().trim()))
                                .map((type) => {
                                  const isSelected = selectedTypes.includes(type);
                                  return (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => handleTypeToggle(type)}
                                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${isSelected
                                        ? "bg-[#0096FF]/10 text-[#0096FF] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                      <span>{type}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0096FF]" />}
                                    </button>
                                  );
                                })}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Selected Tags Blue Pills */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedTypes.map((type) => (
                          <div
                            key={type}
                            className="bg-[#0096FF] text-white px-3.5 py-1.5 rounded-full text-xs font-normal shadow-2xs flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
                          >
                            <span>{type}</span>
                            <button
                              type="button"
                              onClick={() => handleTypeToggle(type)}
                              className="hover:bg-white/20 rounded-full p-0.5 transition cursor-pointer"
                            >
                              <X className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {errors.types && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.types}</p>
                    )}
                  </div>

                  {/* FORMAT Section */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                      FORMAT
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setIsFormatDropdownOpen((prev) => !prev)}
                        className="w-full bg-[#f4f3ef] border-0 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-slate-700 font-normal flex items-center justify-between cursor-pointer focus:ring-1 focus:ring-sky-500 transition"
                      >
                        <span>{format || "Select Format..."}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isFormatDropdownOpen ? "rotate-180 text-sky-600" : ""}`} />
                      </div>

                      {isFormatDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-[90]"
                            onClick={() => setIsFormatDropdownOpen(false)}
                          />
                          <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-2xl ring-1 ring-slate-900/10 border border-slate-200 p-2 z-[100] shadow-xl space-y-0.5">
                            {formatOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setFormat(opt);
                                  setIsFormatDropdownOpen(false);
                                  if (errors.format) setErrors((prev) => ({ ...prev, format: null }));
                                }}
                                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer ${format === opt
                                  ? "bg-[#0096FF]/10 text-[#0096FF] font-semibold"
                                  : "text-slate-700 hover:bg-slate-100"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {errors.format && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.format}</p>
                    )}
                  </div>

                  {/* JOINING LINK Section */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                      JOINING LINK
                    </label>
                    <input
                      type="url"
                      value={joiningLink}
                      onChange={(e) => {
                        setJoiningLink(e.target.value);
                        if (errors.joiningLink) setErrors((prev) => ({ ...prev, joiningLink: null }));
                      }}
                      placeholder="https://..."
                      className={`w-full bg-[#f4f3ef] border-0 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-normal outline-none focus:ring-1 focus:ring-sky-500 transition ${errors.joiningLink ? "ring-1 ring-red-400 bg-red-50/20" : ""
                        }`}
                    />
                    {errors.joiningLink && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.joiningLink}</p>
                    )}
                  </div>

                  {/* WHEN Section */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-[#3b5998] tracking-widest uppercase">
                      WHEN
                    </label>
                    <div className="relative w-full sm:w-72">
                      <input
                        ref={dateInputRef}
                        type="datetime-local"
                        value={rawWhenDate}
                        min={getTodayIsoString()}
                        onChange={handleDateChange}
                        onClick={(e) => {
                          try {
                            if (e.target.showPicker) e.target.showPicker();
                          } catch (err) { }
                        }}
                        className={`w-full bg-[#f4f3ef] border-0 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-700 font-normal outline-none focus:ring-1 focus:ring-sky-500 transition cursor-pointer ${errors.when ? "ring-1 ring-red-400 bg-red-50/20" : ""
                          }`}
                      />
                    </div>
                    {errors.when && (
                      <p className="text-[11px] text-red-500 font-semibold">{errors.when}</p>
                    )}
                  </div>

                  {/* WHAT YOU EARN Section */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-extrabold tracking-wider text-[#0F2942] uppercase">
                        WHAT YOU EARN
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#DCEBFE] text-[#1D4ED8] border border-[#BFDBFE] px-3 py-0.5 rounded-full text-xs font-semibold">
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-white text-[9px] font-black">
                          ★
                        </div>
                        <span>Costs 200 Chakra</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-normal">
                      <div>
                        <p>Ask 3 questions to earn 15 Merit.</p>
                        <p className="mt-1">Get 20 Merit when your 3 answers receive likes.</p>
                      </div>
                      <div>
                        <p>10 Merit is deducted for each question posted—ask genuine questions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer Bar */}
            <div className="bg-[#f4f1ea] px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-t border-stone-200/80">
              <span className="text-[11px] text-slate-500 font-normal truncate">
                {step === 2 ? (
                  <>
                    A cover image can help you stand out.{" "}
                    <span className="text-[#0096FF] font-medium cursor-pointer hover:underline">
                      Learn more
                    </span>
                  </>
                ) : (
                  "Posted to the community immediately · you'll be notified of responses"
                )}
              </span>

              <div className="flex items-center gap-2.5 shrink-0">
                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                  >
                    Next
                  </button>
                )}

                {step === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                    >
                      Next
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-[#0096FF] text-white hover:bg-[#0085f2] shadow-xs transition cursor-pointer active:scale-98"
                    >
                      Post
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-all duration-200 select-none">
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-center space-y-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center mx-auto text-[#0096FF]">
              <Smile className="w-9 h-9 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Confirm
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal px-2">
                Make sure all the details are correct before posting. You can go back to make any changes, or post when you're ready.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-white text-slate-800 border border-slate-200/90 font-medium text-xs sm:text-sm hover:bg-slate-50 transition cursor-pointer shadow-2xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-7 py-2.5 rounded-2xl bg-[#0096FF] hover:bg-[#0085f2] text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs active:scale-98"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn-Style Image Editor Modal Component */}
      <ImageEditorModal
        isOpen={isImageEditorOpen}
        imageSrc={tempImageToEdit}
        defaultGradient={selectedBanner?.gradient || PRESET_GRADIENTS[gradientIndex]?.gradient}
        onClose={() => setIsImageEditorOpen(false)}
        onSave={handleSaveEditedImage}
      />
    </>
  );
}