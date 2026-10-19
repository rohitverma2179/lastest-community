import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Info, Check, ChevronDown, Search } from "lucide-react";
import { closeModal } from "../../features/posts/posts.slice";
import { createPost } from "../../features/posts/posts.thunk";
const dragdropIcon = "/assets/Chomeicon/dragdrop.svg";

// ==============================================================================
// QUESTION CARD MODAL (ASK / Poll / Quiz / Request Creator)
// ==============================================================================
export default function QuestionCard() {
  const dispatch = useDispatch();
  const { isModalOpen, isLoading } = useSelector((state) => state.posts);

  // Step state (1 or 2)
  const [step, setStep] = useState(1);

  // Form State: "question" (ASK), "poll" (Poll), "quiz" (Quiz), "request" (Request)
  const [kind, setKind] = useState("question");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Quiz correct answer index (defaults to 0)
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);

  // Poll allow multiple answers state (defaults to false / single choice)
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);

  // Poll / Quiz options state
  const [pollOptions, setPollOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);

  // Drag & Drop tracking refs and state
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const isHandleActive = useRef(false);

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Custom Tag Dropdown state
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  // Reset form when modal closes/opens
  useEffect(() => {
    if (isModalOpen) {
      setStep(1);
      setKind("question");
      setSelectedDomains([]);
      setSelectedTypes([]);
      setTitle("");
      setBody("");
      setQuizCorrectIndex(0);
      setAllowMultipleAnswers(false);
      setIsTagDropdownOpen(false);
      setTagSearchQuery("");
      setPollOptions([
        { id: 1, text: "" },
        { id: 2, text: "" },
      ]);
      setErrors({});
      setDraggedIdx(null);
      setDragOverIdx(null);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

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

  const handleDomainToggle = (domain) => {
    setSelectedDomains((prev) => (prev.includes(domain) ? [] : [domain]));
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, type];
    });
  };

  // ----------------------------------------------------------------------------
  // DRAG AND DROP HANDLERS
  // ----------------------------------------------------------------------------
  const handleDragStart = (e, index) => {
    if (!isHandleActive.current) {
      e.preventDefault();
      return;
    }
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIdx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      isHandleActive.current = false;
      return;
    }

    setPollOptions((prev) => {
      const updated = [...prev];
      const [draggedItem] = updated.splice(draggedIdx, 1);
      updated.splice(dropIdx, 0, draggedItem);
      return updated;
    });

    // Update Quiz Correct Answer index relative to moved item
    if (kind === "quiz") {
      setQuizCorrectIndex((prevCorrectIdx) => {
        if (prevCorrectIdx === draggedIdx) {
          return dropIdx;
        }
        if (draggedIdx < prevCorrectIdx && dropIdx >= prevCorrectIdx) {
          return prevCorrectIdx - 1;
        }
        if (draggedIdx > prevCorrectIdx && dropIdx <= prevCorrectIdx) {
          return prevCorrectIdx + 1;
        }
        return prevCorrectIdx;
      });
    }

    setDraggedIdx(null);
    setDragOverIdx(null);
    isHandleActive.current = false;
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
    isHandleActive.current = false;
  };

  // ----------------------------------------------------------------------------
  // STEP 1 VALIDATION
  // ----------------------------------------------------------------------------
  const validateStep1 = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Question is required.";
    } else if (title.trim().length < 5) {
      newErrors.title = "Question must be at least 5 characters.";
    } else if (title.trim().length > 120) {
      newErrors.title = "Question cannot exceed 120 characters.";
    }

    if (kind === "poll" || kind === "quiz") {
      const validOptions = pollOptions.filter((o) => o.text.trim().length > 0);
      if (validOptions.length < 2) {
        newErrors.pollOptions = `Please enter at least 2 ${kind} options.`;
      } else {
        const lowerTexts = validOptions.map((o) => o.text.trim().toLowerCase());
        if (new Set(lowerTexts).size !== lowerTexts.length) {
          newErrors.pollOptions = "This is already an option";
        }
      }
    } else {
      if (!body.trim()) {
        newErrors.body = "Details are required.";
      } else if (body.trim().length < 50) {
        newErrors.body = "Details must be at least 50 characters.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  // ----------------------------------------------------------------------------
  // STEP 2 VALIDATION
  // ----------------------------------------------------------------------------
  const validateStep2 = () => {
    const newErrors = {};
    if (selectedDomains.length === 0) {
      newErrors.domains = "Please select a Category.";
    }
    if (selectedTypes.length === 0) {
      newErrors.types = "Please select at least one Tag.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------------------------------------------------------
  // FORM SUBMISSION
  // ----------------------------------------------------------------------------
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    const allTags = [...selectedDomains, ...selectedTypes];
    const postData = {
      kind,
      title: title.trim(),
      body: kind === "poll" || kind === "quiz" ? title.trim() : body.trim(),
      tags: allTags,
      bounty: 500,
    };

    if (kind === "poll") {
      postData.pollOptions = pollOptions
        .map((o) => o.text.trim())
        .filter((t) => t.length > 0);
      postData.allowMultipleAnswers = allowMultipleAnswers;
    } else if (kind === "quiz") {
      const validOpts = pollOptions.filter((o) => o.text.trim().length > 0);
      postData.quizCorrectIndex =
        quizCorrectIndex < validOpts.length ? quizCorrectIndex : 0;
      postData.quizOptions = validOpts.map((o, idx) => ({
        text: o.text.trim(),
        isCorrect: idx === quizCorrectIndex,
      }));
    }

    dispatch(createPost(postData));
  };

  const handleKindChange = (newKind) => {
    setKind(newKind);
    setStep(1);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white w-full max-w-[560px] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-2 bg-[#F6F5F2] border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-black text-[#0F2942] tracking-tight">
            {kind === "quiz"
              ? "Create a Quiz"
              : kind === "poll"
                ? "Create a Poll"
                : kind === "request"
                  ? "Create a Request"
                  : "Ask a Question"}
          </h2>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
          {/* Action Toggle */}
          <div className="bg-[#F2EFEA] p-1.5 rounded-2xl w-fit flex items-center gap-1.5 mb-6">
            {["question", "poll", "quiz", "request"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleKindChange(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-xl capitalize transition-all duration-150 cursor-pointer ${
                  kind === tab
                    ? "bg-[#0096FF] text-white shadow-xs"
                    : "bg-white text-slate-800 shadow-2xs hover:bg-slate-50"
                }`}
              >
                {tab === "question" ? "ASK" : tab}
              </button>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              {/* YOUR QUESTION Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                    YOUR QUESTION
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      title.length >= 120 ? "text-red-500 font-bold" : "text-slate-400"
                    }`}
                  >
                    {title.length}/120
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={120}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Does ISO 9001 require a documented internal audit procedure?"
                  className={`w-full bg-[#F6F5F2] border-0 rounded-2xl px-4 py-3.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-[#F2EFEA] focus:ring-1 focus:ring-[#0096FF]/30 transition duration-150 ${
                    errors.title ? "ring-1 ring-red-400 bg-red-50/20" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-red-500 font-semibold">{errors.title}</p>
                )}
              </div>

              {/* OPTIONS Section for Poll & Quiz */}
              {kind === "poll" || kind === "quiz" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                      OPTIONS
                    </span>
                    {kind === "quiz" && (
                      <span className="text-[11px] text-[#0096FF]">
                        Check the box next to the correct answer
                      </span>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    {pollOptions.map((opt, idx) => {
                      const isCorrect = quizCorrectIndex === idx;
                      const isDuplicate =
                        opt.text.trim() !== "" &&
                        pollOptions.some(
                          (o, i) =>
                            i !== idx &&
                            o.text.trim().toLowerCase() === opt.text.trim().toLowerCase()
                        );
                      const isDragging = draggedIdx === idx;
                      const isOver = dragOverIdx === idx && draggedIdx !== idx;

                      return (
                        <div
                          key={opt.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragEnd={handleDragEnd}
                          className={`relative flex items-center gap-2.5 transition-all duration-150 rounded-2xl ${
                            isDragging ? "opacity-40 scale-[0.98]" : "opacity-100"
                          } ${isOver ? "border-t-2 border-[#0096FF] pt-1" : ""}`}
                        >
                          {/* Checkbox for Quiz Correct Answer */}
                          {kind === "quiz" && (
                            <button
                              type="button"
                              onClick={() => setQuizCorrectIndex(idx)}
                              title="Set as correct answer"
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                isCorrect
                                  ? "bg-[#0096FF] border-[#0096FF] text-white shadow-xs"
                                  : "bg-white border-slate-300 hover:border-slate-400 text-transparent"
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </button>
                          )}
                          <div className="relative flex-1 flex items-center">
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPollOptions((prev) => {
                                  let next = prev.map((item, i) =>
                                    i === idx ? { ...item, text: val } : item
                                  );

                                  if (
                                    idx === prev.length - 1 &&
                                    val.trim() !== "" &&
                                    prev.length < 10
                                  ) {
                                    next = [...next, { id: Date.now(), text: "" }];
                                  }

                                  while (
                                    next.length > 2 &&
                                    next[next.length - 1].text.trim() === "" &&
                                    next[next.length - 2].text.trim() === ""
                                  ) {
                                    next.pop();
                                  }

                                  const validTexts = next
                                    .map((o) => o.text.trim().toLowerCase())
                                    .filter(Boolean);
                                  const hasDupes =
                                    new Set(validTexts).size !== validTexts.length;
                                  if (hasDupes) {
                                    setErrors((err) => ({
                                      ...err,
                                      pollOptions: "This is already an option",
                                    }));
                                  } else {
                                    setErrors((err) => {
                                      if (
                                        err.pollOptions === "This is already an option"
                                      ) {
                                        const { pollOptions, ...rest } = err;
                                        return rest;
                                      }
                                      return err;
                                    });
                                  }

                                  return next;
                                });
                              }}
                              onBlur={() => {
                                setPollOptions((prev) => {
                                  if (prev.length <= 2) return prev;
                                  if (opt.text.trim() === "") {
                                    const emptyCount = prev.filter(
                                      (o) => o.text.trim() === ""
                                    ).length;
                                    if (
                                      idx !== prev.length - 1 ||
                                      emptyCount > 1
                                    ) {
                                      const updated = prev.filter((_, i) => i !== idx);
                                      if (
                                        quizCorrectIndex >= idx &&
                                        quizCorrectIndex > 0
                                      ) {
                                        setQuizCorrectIndex((qIdx) =>
                                          Math.max(0, qIdx - 1)
                                        );
                                      }
                                      return updated.length >= 2 ? updated : prev;
                                    }
                                  }
                                  return prev;
                                });
                              }}
                              placeholder={`Option ${idx + 1}`}
                              className={`w-full bg-[#F6F5F2] border-0 rounded-2xl pl-4 ${
                                pollOptions.length > 2 ? "pr-14" : "pr-9"
                              } py-3.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-[#F2EFEA] focus:ring-1 focus:ring-[#0096FF]/30 transition duration-150 ${
                                isDuplicate
                                  ? "ring-1 ring-red-500/50 bg-red-50/20"
                                  : kind === "quiz" && isCorrect
                                    ? "ring-1 ring-[#0096FF]/50 bg-sky-50/30"
                                    : ""
                              }`}
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
                              <span
                                onMouseDown={() => {
                                  isHandleActive.current = true;
                                }}
                                onMouseUp={() => {
                                  isHandleActive.current = false;
                                }}
                                className="cursor-grab active:cursor-grabbing p-1 flex items-center justify-center select-none"
                                title="Drag to reorder"
                              >
                                <img
                                  src={dragdropIcon}
                                  alt="Drag handle"
                                  className="w-3 h-auto opacity-60 pointer-events-none"
                                />
                              </span>
                              {pollOptions.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPollOptions((prev) =>
                                      prev.filter((_, i) => i !== idx)
                                    );
                                    if (
                                      quizCorrectIndex >= idx &&
                                      quizCorrectIndex > 0
                                    ) {
                                      setQuizCorrectIndex((prev) => prev - 1);
                                    }
                                  }}
                                  className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition flex items-center justify-center"
                                  title="Remove option"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {kind === "poll" && (
                    <div className="flex items-center justify-end pt-1 select-none">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">
                          Allow multiple answers
                        </span>
                        <button
                          type="button"
                          onClick={() => setAllowMultipleAnswers((prev) => !prev)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            allowMultipleAnswers ? "bg-[#0096FF]" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              allowMultipleAnswers ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {errors.pollOptions && (
                    <p className="text-[11px] text-red-500">{errors.pollOptions}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                      DETAILS
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        body.trim().length > 0 && body.trim().length < 50
                          ? "text-amber-500 font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      {body.length} / Min 50 chars
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={body}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBody(val);
                      if (errors.body && val.trim().length >= 50) {
                        setErrors((prev) => {
                          const { body, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                    placeholder="Add detail, standard/clause, sector, and what you've already tried..."
                    className={`w-full bg-[#F6F5F2] border-0 rounded-2xl px-4 py-3.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none min-h-[140px] resize-none focus:bg-[#F2EFEA] focus:ring-1 focus:ring-[#0096FF]/30 transition duration-150 ${
                      errors.body ? "ring-1 ring-red-400 bg-red-50/20" : ""
                    }`}
                  />
                  {errors.body && (
                    <p className="text-[11px] text-red-500 font-semibold">
                      {errors.body}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
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
                        className={`px-5 py-2 rounded-full text-xs border transition-all duration-150 cursor-pointer ${
                          isSelected
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
                          className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${
                            isTagDropdownOpen ? "rotate-180 text-[#0096FF]" : ""
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
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                                      isSelected
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

              {/* WHAT YOU EARN Section */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] font-extrabold tracking-wider text-[#0F2942] uppercase">
                    WHAT YOU EARN
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#DCEBFE] text-[#1D4ED8] border border-[#BFDBFE] px-3 py-0.5 rounded-full text-xs font-bold">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-white text-[9px] font-black">
                      ★
                    </div>
                    <span>Costs 25 Chakra</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-medium">
                  <div>
                    <p className="text-slate-600 font-medium">
                      Ask 3 questions to earn 15 Merit.
                    </p>
                    <p className="mt-1 text-slate-600 font-medium">
                      Get 20 Merit when your 3 answers receive likes.
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 font-medium">
                      10 Merit is deducted for each question posted—ask genuine
                      questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F6F5F2] px-6 py-4 border-t border-slate-200/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            Posted to the community immediately · you'll be notified of responses
          </span>
          <div className="flex items-center gap-2.5">
            {step === 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-white text-slate-900 px-7 py-2 rounded-xl text-sm shadow-2xs hover:bg-slate-50 border border-slate-200/80 cursor-pointer transition"
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-white text-slate-900 px-6 py-2 rounded-xl text-sm shadow-2xs hover:bg-slate-50 border border-slate-200/80 cursor-pointer transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-[#0096FF] text-white px-7 py-2 rounded-xl text-sm hover:bg-[#0085f2] shadow-sm cursor-pointer transition disabled:opacity-50"
                >
                  {isLoading ? "Posting..." : "Post"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}