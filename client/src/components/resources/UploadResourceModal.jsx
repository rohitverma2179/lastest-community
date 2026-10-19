import React, { useState, useRef } from "react";
import { Info, X, Upload, ChevronDown, Check, FileText, Trash2, Award, Search, Loader2 } from "lucide-react";
import api from "../../utils/axios";

export default function UploadResourceModal({ isOpen, onClose, onUploadSuccess }) {
  const [step, setStep] = useState(1); // 1: Details & Upload, 2: Domain & Tags, 3: Confirmation Dialog
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [questionTitle, setQuestionTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(50);
  const [selectedDomains, setSelectedDomains] = useState(["Health"]);
  const [selectedTypes, setSelectedTypes] = useState(["Templates", "Checklists"]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [resourceType, setResourceType] = useState("Free or coin copyright");
  const [fileTypeOption, setFileTypeOption] = useState("XLSX");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const fileTypeOptions = [
    { label: "Spreadsheet (XLS/XLSX)", value: "XLSX" },
    { label: "Document (PDF)", value: "PDF" },
    { label: "Document (DOC/DOCX)", value: "DOCX" },
    { label: "Presentation (PPT/PPTX)", value: "PPTX" },
    { label: "Archive (ZIP)", value: "ZIP" },
  ];

  const domains = [
    "Quality",
    "Environment",
    "Health",
    "Safety",
    "Welfare",
    "Energy",
    "ESG",
    "Sustainability ",
  ];

  const types = [
    "Guide",
    "Training",
    "Hiring",
    "Consulting",
    "Poster",
    "Quiz",
    "Case-study",
    "ISO-9001",
    "ISO-50001",
    "ISO-14001",
    "NEBOSH",
    "ISO-45001",
    "GRI",
    "ESRS",
    "BRSR",
    "Audit",
    "RCA",
    "LOPA",
    "Implementation",
    "Certifications",
    "Risk-Assessments",
    "Scope-3",
    "HAZOP",
    "Documentation",
    "Compliance",
    "Awareness",
    "Six-Sigma",
    "Legal-Compliance",
    "Monitoring",
    "Emergency-Prep",
    "Gap-Assessments",
    "Continual-Improvement",
    "ISO-Standards",
    "Root-Cause",
    "Reports",
    "Toolbox-Talks",
    "Corrective-Actions",
    "Management-Reviews",
    "Integrated-Systems",
    "Inspections",
    "Incident-Investigation",
    "Work-Instructions",
    "Checklists",
    "Best-Practices",
    "Guidelines",
    "Job-Safety-Analysis",
    "Preventive-Action",
    "Benchmarking",
    "Waste-Management",
    "Supplier-Audits",
    "Competency-Mapping",
    "Job-Openings",
    "Announcement",
    "Procedures",
    "Workshops",
    "Discussion",
    "Permit-To-Work",
    "Policies",
    "Templates",
    "Webinars",
    "Regulatory-Update",
    "Near-Miss",
    "Performance-Metrics",
    "Carbon-Footprint",
    "Energy-Efficiency",
    "Mock-Drills",
    "Career-Guidance",
    "Success-Story",
  ];

  const detectFileType = (fileName) => {
    if (!fileName) return;
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "xls" || ext === "xlsx") setFileTypeOption("XLSX");
    else if (ext === "pdf") setFileTypeOption("PDF");
    else if (ext === "doc" || ext === "docx") setFileTypeOption("DOCX");
    else if (ext === "ppt" || ext === "pptx") setFileTypeOption("PPTX");
    else if (ext === "zip" || ext === "rar" || ext === "7z") setFileTypeOption("ZIP");
  };

  const handleDomainToggle = (domain) => {
    if (selectedDomains.includes(domain)) {
      const updated = selectedDomains.filter((d) => d !== domain);
      setSelectedDomains(updated);
      if (updated.length > 0 && errors.domains) {
        setErrors((prev) => ({ ...prev, domains: null }));
      }
    } else {
      setSelectedDomains([...selectedDomains, domain]);
      if (errors.domains) {
        setErrors((prev) => ({ ...prev, domains: null }));
      }
    }
  };

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      if (selectedTypes.length >= 2) {
        setSelectedTypes([selectedTypes[1], type]);
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    }
  };

  const handleTitleChange = (e) => {
    setQuestionTitle(e.target.value);
    if (errors.questionTitle) {
      setErrors((prev) => ({ ...prev, questionTitle: null }));
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setQuestionTitle("");
    setDetails("");
    setPrice(50);
    setSelectedDomains(["Health"]);
    setSelectedTypes(["Templates", "Checklists"]);
    setTagSearchQuery("");
    setIsTagDropdownOpen(false);
    setErrors({});
    setResourceType("Free or coin copyright");
    setFileTypeOption("XLSX");
    setFile(null);
    onClose();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      detectFileType(droppedFile.name);
      if (errors.file) setErrors((prev) => ({ ...prev, file: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      detectFileType(selectedFile.name);
      if (errors.file) setErrors((prev) => ({ ...prev, file: null }));
    }
  };

  const handleNextStep1 = () => {
    const newErrors = {};
    if (!questionTitle.trim()) {
      newErrors.questionTitle = "Title is required. Please enter a question or title.";
    } else if (questionTitle.trim().length < 3) {
      newErrors.questionTitle = "Title must be at least 3 characters long.";
    }
    if (!file) {
      newErrors.file = "Please attach or drop a file to upload.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleNextStep2 = () => {
    const newErrors = {};
    if (!selectedDomains || selectedDomains.length === 0) {
      newErrors.domains = "Please select at least 1 category.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    const fileExt = fileTypeOption || (file ? file.name.split(".").pop().toUpperCase() : "XLSX");
    const fileSizeFormatted = file
      ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
      : "1.5 MB";

    const primaryDomain = selectedDomains[0] || "Health";

    const fallbackResource = {
      id: Date.now().toString(),
      title: questionTitle.trim() || "ISO 9001 Internal Audit Procedure & Checklist",
      type: fileExt,
      category: primaryDomain.toUpperCase(),
      domain: primaryDomain,
      selectedDomains,
      fileSize: fileSizeFormatted,
      tags: selectedTypes.length > 0 ? selectedTypes : [primaryDomain],
      summary: details.trim() || "Community shared resource for QEHS professionals.",
      uploaderName: "You",
      timeAgo: "Just now",
      downloads: 0,
      meritPoints: Number(price) || 50,
      resourceType,
      fileName: file ? file.name : "resource_document.pdf"
    };

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", questionTitle.trim() || "ISO 9001 Internal Audit Procedure & Checklist");
      formData.append("summary", details.trim() || "Community shared resource for QEHS professionals.");
      formData.append("domain", primaryDomain);
      formData.append("fileType", fileExt);
      formData.append("tags", JSON.stringify(selectedTypes.length > 0 ? selectedTypes : [primaryDomain]));
      if (file) {
        formData.append("file", file);
      }

      const response = await api.post("/resources", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.resource) {
        const saved = response.data.resource;
        const newResource = {
          id: saved._id || fallbackResource.id,
          title: saved.title || fallbackResource.title,
          type: (saved.type || fileExt).toUpperCase(),
          category: (saved.domain || primaryDomain).toUpperCase(),
          domain: saved.domain || primaryDomain,
          selectedDomains,
          fileSize: saved.size || fileSizeFormatted,
          tags: saved.tags && saved.tags.length > 0 ? saved.tags : selectedTypes,
          summary: saved.summary || details,
          uploaderName: saved.uploadedBy ? `${saved.uploadedBy.firstName} ${saved.uploadedBy.lastName || ""}`.trim() : "You",
          timeAgo: "Just now",
          downloads: saved.downloads || 0,
          meritPoints: Number(price) || 50,
          resourceType,
          fileName: file ? file.name : "resource_document.pdf",
          externalUrl: saved.externalUrl || ""
        };
        if (onUploadSuccess) onUploadSuccess(newResource);
      } else {
        if (onUploadSuccess) onUploadSuccess(fallbackResource);
      }
    } catch (err) {
      console.warn("[UPLOAD] Backend save skipped or endpoint offline, using local state update:", err?.message || err);
      if (onUploadSuccess) onUploadSuccess(fallbackResource);
    } finally {
      setIsUploading(false);
      handleResetAndClose();
    }
  };

  const keepChakra = Math.floor(price / 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200/80 animate-in zoom-in-95 duration-200 font-sans">

        {/* Step 3 Confirmation Card Layout */}
        {step === 3 ? (
          <div className="p-8 text-center flex flex-col items-center">
            {/* Blue Smile Circle Icon */}
            <div className="w-14 h-14 rounded-full bg-sky-50 border-2 border-sky-400/40 flex items-center justify-center text-[#0096FF] mb-4 shadow-xs">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
              Confirmed 🎉
            </h2>

            <p className="text-sm text-slate-600 max-w-md leading-relaxed mb-8">
              Make sure all the details are correct before posting. You can go back to make any changes, or post when you're ready.
            </p>

            {/* Footer Buttons for Step 3 */}
            <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-sm font-semibold transition cursor-pointer shadow-xs disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isUploading}
                onClick={handleFinalSubmit}
                className="px-7 py-2.5 bg-[#0096FF] hover:bg-[#0080FF] text-white rounded-xl text-sm font-semibold transition cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post</span>
                )}
              </button>
            </div>
          </div>  
        ) : (
          <>
            {/* Header Bar */}
            <div className="px-6 py-1.5 bg-[#F8F7F3] border-b border-stone-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#132B45]">
                <div className="w-5 h-5 rounded-full border-1.5 border-[#132B45] flex items-center justify-center text-[#132B45] text-xs font-bold font-serif">
                  i
                </div>
                {/* <span className="font-semibold text-sm tracking-tight">
                  
                </span> */}
              </div>
              <button
                onClick={handleResetAndClose}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-200/50 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-6 max-h-[82vh] overflow-y-auto">
              {/* Modal Sub-Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#132B45] tracking-tight">
                Share Resource
              </h2>

              {/* STEP 1: Details & Upload */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Your Question / Title Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-1.5">
                      Your Question <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={questionTitle}
                      onChange={handleTitleChange}
                      placeholder="e.g. Does ISO 9001 require a documented internal audit procedure?"
                      className={`w-full px-4 py-3 bg-[#F4F3EE] focus:bg-white border rounded-2xl text-sm text-slate-800 placeholder-slate-400 transition-all font-normal outline-none ${errors.questionTitle
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-transparent focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                        }`}
                    />
                    {errors.questionTitle && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.questionTitle}
                      </p>
                    )}
                  </div>

                  {/* Details / Textarea */}
                  {/* <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-1.5">
                      Details
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Add detail, standard/clause, sector, and what you've already tried..."
                      className="w-full px-4 py-3 bg-[#F4F3EE] focus:bg-white border border-transparent focus:border-sky-400 focus:ring-2 focus:ring-sky-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 transition-all font-normal outline-none resize-none min-h-[90px]"
                    />
                  </div> */}

                  {/* Price & Chakra Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-[#132B45] uppercase tracking-wider">
                        Your Price · Suggested 50 Chakra
                      </label>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Custom styled range slider */}
                      <input
                        type="range"
                        min="50"
                        max="4000"
                        step="10"
                        value={Number(price) || 50}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full h-2 bg-[#0096FF] rounded-lg appearance-none cursor-pointer accent-[#132B45]"
                      />
                      {/* Price Editable Input Badge with Star Coin */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-[#F4F3EE] border border-slate-200/80 rounded-xl shrink-0 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                        <span className="w-4 h-4 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 select-none">
                          ★
                        </span>
                        <input
                          type="number"
                          min="50"
                          max="4000"
                          value={price === 0 ? "" : price}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setPrice("");
                            } else {
                              const numVal = Number(val);
                              if (numVal > 4000) {
                                setPrice(4000);
                              } else {
                                setPrice(numVal);
                              }
                            }
                          }}
                          onBlur={() => {
                            if (!price || Number(price) < 50) {
                              setPrice(50);
                            } else if (Number(price) > 4000) {
                              setPrice(4000);
                            }
                          }}
                          className="w-9 bg-transparent text-xs font-bold text-slate-900 outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Fine print calculation explanation */}
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-2">
                      You keep {keepChakra} Chakra + 3 Karma per download. Floor 50, Ceiling 4,000, Steps of 10.
                    </p>
                  </div>

                  {/* FILE TYPE Dropdown Selection (matching user screenshot) */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>FILE TYPE</span>
                      <span className="text-[10px] text-slate-400 font-normal lowercase">(auto-detected from file)</span>
                    </label>
                    <div className="relative">
                      <select
                        value={fileTypeOption}
                        onChange={(e) => setFileTypeOption(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-[#F4F3EE] hover:bg-[#EFECE6] border border-transparent focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100 rounded-2xl text-xs font-semibold text-slate-800 pr-10 focus:outline-none cursor-pointer transition-all"
                      >
                        {fileTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Drag and Drop File Container */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-1.5">
                      Upload File <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx,.zip,.rar,.7z"
                    />

                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-7 text-center transition-all cursor-pointer ${errors.file
                          ? "border-red-400 bg-red-50/30 hover:bg-red-50/50"
                          : dragActive
                            ? "border-[#0096FF] bg-sky-50/50"
                            : file
                              ? "border-emerald-400 bg-emerald-50/20"
                              : "border-slate-300/80 hover:border-sky-400 bg-[#FAF9F6] hover:bg-slate-50"
                        }`}
                    >
                      {file ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-7 h-7 text-emerald-600" />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-800 truncate max-w-[280px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to publish
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-slate-400 mb-3 stroke-[1.5]" />
                          <p className="text-sm font-medium text-slate-800 mb-1">
                            Drop your PDF, PPT, XLS, DOC or ZIP here
                          </p>
                          <p className="text-xs text-slate-400">
                            Max 25 MB · CC-BY-SA · an admin approves it before it goes live
                          </p>
                        </div>
                      )}
                    </div>
                    {errors.file && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.file}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Domain, Tags, Type & Earnings */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* CATEGORY Section */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                        CATEGORY
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {domains.map((domain) => {
                        const isSelected = selectedDomains.includes(domain);
                        return (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => handleDomainToggle(domain)}
                            className={`px-5 py-2 rounded-full text-xs border transition-all duration-150 cursor-pointer ${isSelected
                                ? "bg-[#0096FF] border-[#0096FF] text-white shadow-xs"
                                : "bg-white border-slate-300/80 text-slate-700 hover:border-slate-400"
                              }`}
                          >
                            {domain}
                          </button>
                        );
                      })}
                    </div>
                    {errors.domains && (
                      <p className="text-[11px] text-red-500">{errors.domains}</p>
                    )}
                  </div>

                  {/* TAGS Section */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                        TAGS
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">(max 2)</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Left: Custom Popover */}
                      <div className="relative min-w-[190px] sm:min-w-[210px]">
                        <div className="relative w-full flex items-center bg-[#F6F5F2] hover:bg-[#F2EFEA] border-0 rounded-2xl px-3.5 py-2 text-xs md:text-sm text-slate-700 outline-none focus-within:ring-1 focus-within:ring-[#0096FF]/30 transition duration-150">
                          <Search className="w-3.5 h-3.5 stroke-[2.5] text-slate-400 shrink-0 mr-2" />
                          <input
                            type="text"
                            value={tagSearchQuery}
                            onFocus={() => setIsTagDropdownOpen(true)}
                            onChange={(e) => {
                              setTagSearchQuery(e.target.value);
                              if (!isTagDropdownOpen) setIsTagDropdownOpen(true);
                            }}
                            placeholder="Select or search tag..."
                            className="w-full bg-transparent border-0 outline-none text-slate-700 placeholder-slate-400 text-xs md:text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setIsTagDropdownOpen((prev) => !prev)}
                            className="p-1 text-slate-500 hover:text-slate-700 transition cursor-pointer shrink-0"
                          >
                            <ChevronDown
                              className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${isTagDropdownOpen ? "rotate-180 text-[#0096FF]" : ""
                                }`}
                            />
                          </button>
                        </div>

                        {isTagDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-[90]"
                              onClick={() => setIsTagDropdownOpen(false)}
                            />
                            <div className="absolute left-0 bottom-full mb-2 w-52 sm:w-56 bg-white rounded-2xl ring-1 ring-slate-900/10 border border-slate-200/90 p-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150">
                              <div className="max-h-56 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
                                {types
                                  .filter((t) =>
                                    t
                                      .toLowerCase()
                                      .includes(tagSearchQuery.toLowerCase().trim())
                                  )
                                  .map((type) => {
                                    const isSelected = selectedTypes.includes(type);
                                    return (
                                      <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleTypeToggle(type)}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm flex items-center justify-between transition-colors duration-150 cursor-pointer ${isSelected
                                            ? "bg-[#0096FF]/10 text-[#0096FF]"
                                            : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                          }`}
                                      >
                                        <span>{type}</span>
                                        {isSelected && (
                                          <Check className="w-3.5 h-3.5 stroke-[3] text-[#0096FF]" />
                                        )}
                                      </button>
                                    );
                                  })}
                                {types.filter((t) =>
                                  t
                                    .toLowerCase()
                                    .includes(tagSearchQuery.toLowerCase().trim())
                                ).length === 0 && (
                                    <div className="p-3 text-center text-xs text-slate-400 font-medium">
                                      No matching tags found
                                    </div>
                                  )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Right: Selected Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedTypes.map((type) => (
                          <div
                            key={type}
                            className="bg-[#0096FF] text-white px-4 py-2 rounded-full text-xs shadow-xs flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
                          >
                            <span>{type}</span>
                            <button
                              type="button"
                              onClick={() => handleTypeToggle(type)}
                              className="hover:bg-white/20 rounded-full p-0.5 transition cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {errors.types && (
                      <p className="text-[11px] text-red-500">{errors.types}</p>
                    )}
                  </div>

                  {/* Select Your Type */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-2">
                      Select Your Type
                    </label>
                    <div className="relative">
                      <select
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-[#F4F3EE] hover:bg-[#EFECE6] border border-transparent rounded-2xl text-xs font-medium text-slate-800 pr-10 focus:outline-none cursor-pointer"
                      >
                        <option value="Free or coin copyright">Free or coin copyright</option>
                        <option value="Premium Download">Premium Download</option>
                        <option value="Open Access Template">Open Access Template</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* What You Earn */}
                  {/* <div>
                    <label className="block text-[11px] font-bold text-[#132B45] uppercase tracking-wider mb-2">
                      What You Earn
                    </label>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-100/70 border border-sky-200 rounded-full">
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold flex items-center justify-center">
                        ★
                      </span>
                      <span className="text-xs font-bold text-slate-800">100</span>
                    </div>
                  </div> */}
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-6 py-4 bg-[#F8F7F3] border-t border-stone-200/70 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-normal">
                Posted to the community immediately · you'll be notified of responses
              </span>

              <div className="flex items-center gap-2.5">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    Back
                  </button>
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleNextStep1}
                    className="px-6 py-2 bg-[#0096FF] hover:bg-[#0080FF] text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer active:scale-95"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep2}
                    className="px-6 py-2 bg-[#0096FF] hover:bg-[#0080FF] text-white rounded-xl text-xs font-semibold shadow-md transition cursor-pointer active:scale-95"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


