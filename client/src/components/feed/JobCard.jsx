import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Calendar, Landmark, CheckCircle2 } from "lucide-react";
const jobCardIcon = "/assets/cardicon/job-card.svg";

export default function JobCard({ job, title, content }) {
  const [isApplied, setIsApplied] = useState(false);

  if (!job) return null;

  return (
    <div className="space-y-3.5 select-none">
      {/* 5-Column Metadata Bar */}
      <div className="job-metadata-bar">
        <div className="meta-item">
          <span className="meta-label">
            <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            Job Type
          </span>
          <span className="meta-value">{job.type}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">
            <Landmark className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            Sector / Industry
          </span>
          <span className="meta-value">{job.sector}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            Location
          </span>
          <span className="meta-value">{job.location}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">
            <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            Compensation
          </span>
          <span className="meta-value">{job.compensation}</span>
        </div>

        <div className="meta-item double-span">
          <span className="meta-label">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            Apply Till
          </span>
          <span className="meta-value">{job.applyTill}</span>
        </div>
      </div>

      {/* Main Job Card Panel */}
      <div className="w-full flex flex-row items-center justify-between gap-4 p-4 border border-indigo-200 bg-white rounded-2xl shadow-xs">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Custom Job Icon */}
          <div className="w-12 h-12 rounded-xl  flex items-center justify-center shrink-0 border border-blue-100/50">
            <img src={jobCardIcon} className="w-9 h-9 object-contain" alt="Job icon" />
          </div>
          <div className="flex flex-col min-w-0 leading-tight">
            <h4 className="text-[13px] font-bold text-slate-800 truncate hover:text-[#0096FF] transition cursor-pointer">
              {title}
            </h4>
            <span className="text-[11px] text-gray-400   mt-1 truncate">
              {content}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsApplied(!isApplied)}
          className={`  px-2.5 py-2 rounded-lg shrink-0 cursor-pointer text-xs transition duration-150 ${
            isApplied
              ? "border border-green-200 text-green-600 bg-green-50 hover:bg-green-100/40"
              : "bg-[#5c67f2] hover:bg-[#4338ca] text-white"
          }`}
        >
          {isApplied ? (
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </span>
          ) : (
            job.actionLabel || "Apply Now"
          )}
        </button>
      </div>
    </div>
  );
}
