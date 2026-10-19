import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Info, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

// Custom Checkbox component matching screenshot styling
const Checkbox = ({ checked, label, onChange }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-center justify-between cursor-pointer select-none py-4 px-1 rounded-xl hover:bg-slate-50/45 transition"
    >
      <div className="flex items-center gap-4">
        <TrendingUp className="w-5 h-5 text-slate-800 stroke-[2] shrink-0" />
        <span className="text-[#1e293b] font-medium text-[15px]">{label}</span>
      </div>
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
        checked ? "border-[#0096FF] bg-[#0096FF] text-white" : "border-slate-350 bg-white"
      }`}>
        {checked && (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default function ContentTab({ onBack }) {
  // Sub-view state: 'main' | 'interests'
  const [subView, setSubView] = useState("main");

  // Checkbox states (defaults to all checked/true as in screenshot)
  const [trendingTopics, setTrendingTopics] = useState(true);
  const [trendingVideos, setTrendingVideos] = useState(true);
  const [trendingEvents, setTrendingEvents] = useState(true);
  const [trendingJobs, setTrendingJobs] = useState(true);

  // Interest tags
  const allInterests = [
    "Quality", 
    "Environment", 
    "Health", 
    "Safety", 
    "Welfare", 
    "Energy", 
    "ESG", 
    "Subtainability"
  ];
  
  // Default selected interests as in screenshot
  const [selectedInterests, setSelectedInterests] = useState(["Health", "Energy"]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
      toast.success(`Removed interest: ${interest}`);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
      toast.success(`Added interest: ${interest}`);
    }
  };

  // --- SUB-VIEW: YOUR INTERESTS ---
  if (subView === "interests") {
    return (
      <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-2 select-none border-b border-gray-100/60">
          <button 
            onClick={() => setSubView("main")}
            className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-800 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Your interests</span>
        </div>

        {/* Info text */}
        <p className="text-[13.5px] text-[#475569] mb-8 font-normal leading-relaxed">
          Your selected interests help us serve you content you care about.
        </p>

        {/* Tags container */}
        <div className="flex flex-wrap gap-2.5 pb-4">
          {allInterests.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition duration-150 select-none cursor-pointer border ${
                  isSelected 
                    ? "bg-[#0096FF] text-white border-transparent shadow-[0_2px_8px_rgba(0,150,255,0.2)]" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- SUB-VIEW: MAIN CONTENT LIST ---
  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-3.5 mb-7 pb-2 select-none">
        <button 
          onClick={onBack}
          className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-850 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <span className="text-xl font-bold text-[#1e293b] tracking-tight">Content & Media</span>
      </div>

      {/* Settings list */}
      <div className="space-y-1">
        
        {/* Your interests */}
        <button
          onClick={() => setSubView("interests")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Info className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Your interests</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Enable trending topics */}
        <Checkbox 
          checked={trendingTopics} 
          label="Enable trending topics" 
          onChange={() => setTrendingTopics(!trendingTopics)} 
        />

        {/* Enable trending videos in Discover */}
        <Checkbox 
          checked={trendingVideos} 
          label="Enable trending videos in your Discover feed" 
          onChange={() => setTrendingVideos(!trendingVideos)} 
        />

        {/* Enable trending events in feed */}
        <Checkbox 
          checked={trendingEvents} 
          label="Enable trending events in your feed" 
          onChange={() => setTrendingEvents(!trendingEvents)} 
        />

        {/* Enable trending job posts in feed */}
        <Checkbox 
          checked={trendingJobs} 
          label="Enable trending job posts in your feed" 
          onChange={() => setTrendingJobs(!trendingJobs)} 
        />

      </div>
    </div>
  );
}
