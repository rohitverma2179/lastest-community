import React, { useState } from "react";
import { Plus, MessageSquare, AlertCircle, Info, ChevronDown, Download, Bookmark, Check } from "lucide-react";

export default function ResourceHeroBanner({ onUploadClick, onRequestClick }) {
  const [showAboutInfo, setShowAboutInfo] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const toggleAboutInfo = () => {
    if (showAboutInfo) {
      setShowAboutInfo(false);
    } else {
      setShowAboutInfo(true);
      setShowHowItWorks(false);
    }
  };

  const toggleHowItWorks = () => {
    if (showHowItWorks) {
      setShowHowItWorks(false);
    } else {
      setShowHowItWorks(true);
      setShowAboutInfo(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#e0f2fe] via-[#ecfdf5] to-[#fef3c7] border border-[#bae6fd]/60 rounded-[24px] p-5 sm:p-7 lg:p-9 shadow-sm overflow-hidden mb-5 transition-all duration-300">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-gradient-to-br from-emerald-300/30 to-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-gradient-to-tr from-sky-300/30 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Badge & Info Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Top Pill Badge with Gradient */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0b4b66] to-[#0284c7] text-white text-[10px] sm:text-[11px] font-black tracking-wider uppercase shadow-sm">
            100% FREE • 100% COMMUNITY-BUILT
          </div>

          {/* Info Pill Buttons at the Top */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* How it works */}
            <button
              onClick={toggleHowItWorks}
              className={`bg-gradient-to-r ${
                showHowItWorks
                  ? "from-sky-500/30 to-blue-500/30 text-sky-950 border-sky-500 shadow-xs"
                  : "from-sky-500/15 to-blue-500/15 hover:from-sky-500/25 hover:to-blue-500/25 text-sky-900 border-sky-400/70"
              } border px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs`}
            >
              <Info className="w-3.5 h-3.5 text-sky-600 stroke-[2.2]" />
              <span>How it works</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showHowItWorks ? "rotate-180" : ""}`} />
            </button>

            {/* About files shared here */}
            <button
              onClick={toggleAboutInfo}
              className={`bg-gradient-to-r ${
                showAboutInfo
                  ? "from-amber-500/30 to-orange-500/30 text-amber-950 border-amber-500 shadow-xs"
                  : "from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 text-amber-900 border-amber-400/70"
              } border px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 stroke-[2.2]" />
              <span>About files shared here</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAboutInfo ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Top Hero Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Column: Text & CTAs */}
          <div className="max-w-2xl">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The QEHS Library
            </h1>

            {/* Subtitle */}
            <p className="text-slate-700 text-xs sm:text-sm lg:text-base mt-2 leading-relaxed font-medium">
              4,219 templates, checklists, decks, and audit kits, shared by professionals like you. Download anything, upload yours, and earn Merit.
            </p>

            {/* Main Action CTAs Row */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {/* Primary Upload CTA with Gradient */}
              <button
                onClick={onUploadClick}
                className="bg-[#0096FF] hover:bg-[#0085f2] text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Upload a resource</span>
              </button>

              {/* Request CTA Button */}
              <button
                // onClick={onRequestClick}
                className="bg-gradient-to-r from-white to-slate-50 hover:to-slate-100 active:scale-95 text-slate-800 border border-slate-300/90 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                <span>Request a resource</span>
              </button>
            </div>
          </div>

          {/* Right Column: Decorative Gradient Floating Badges */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 pr-4 select-none">
            <div className="bg-gradient-to-br from-[#ff4d4d] via-[#f97316] to-[#ea580c] text-white font-black text-lg px-4 py-7 rounded-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300 flex items-center justify-center tracking-wider">
              PDF
            </div>
            <div className="bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] text-white font-black text-lg px-4 py-7 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center justify-center tracking-wider">
              XLS
            </div>
            <div className="bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] text-white font-black text-lg px-4 py-7 rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center justify-center tracking-wider">
              PPT
            </div>
          </div>
        </div>
       

        {/* 1. Smooth Expandable "HOW THE LIBRARY WORKS" section INSIDE Hero Banner */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            showHowItWorks
              ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-sky-200/60"
              : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <h4 className="text-[11px] font-black text-sky-800 uppercase tracking-wider mb-3 sm:mb-4">
              HOW THE LIBRARY WORKS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Step 1 */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-200/70 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      Download with Merit
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                      Files are priced by length — 10 Merit/page, minimum 100. External links are free to open.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-200/70 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      Share to earn
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                      Upload a resource and earn Merit each time someone downloads it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-200/70 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      Save for later
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                      Bookmark any file into a collection — no Merit spent until you download.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-200/70 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      Request anything
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                      Can't find it? Post a request with an optional Merit bounty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Smooth Expandable "About files shared here" section INSIDE Hero Banner */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            showAboutInfo
              ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-amber-300/60"
              : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-amber-50/80 backdrop-blur-md rounded-2xl border border-amber-200/90 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-black text-base shadow-xs mt-0.5">
                  !
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    About files shared here
                  </h4>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
                    All resources are <strong className="font-bold text-slate-900">uploaded by community members</strong>. eGrowth does not pre-review uploads and cannot verify authorship, accuracy, or whether a file contains confidential material. <strong className="font-bold text-slate-900">You are responsible for what you share.</strong> Spotted something inappropriate or copyrighted?{" "}
                    <button
                      onClick={() => alert("Thank you. Our moderation team will review this notice.")}
                      className="text-sky-600 hover:text-sky-700 underline font-semibold cursor-pointer"
                    >
                      Report it
                    </button>.
                  </p>
                  <button
                    onClick={() => setShowAboutInfo(false)}
                    className="mt-3 px-3.5 py-1.5 bg-white border border-slate-300/80 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>I understand</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
