import React from "react";
const excelIcon = "/assets/cardicon/Microsoft Excel 2025.svg";
const teamsIcon = "/assets/cardicon/Microsoft Teams 2019.svg";

export default function ResourceCard({ attachment }) {
  if (!attachment) return null;

  const isTeams = attachment.type === "TEAMS" || (attachment.name && attachment.name.toLowerCase().includes("teams"));
  const iconSrc = isTeams ? teamsIcon : excelIcon;

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 p-3 bg-slate-50/40 border border-slate-200/60 rounded-2xl select-none hover:bg-slate-50/80 duration-150">
      {/* File Details */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Microsoft Excel / Teams Icon */}
        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
          <img src={iconSrc} className="w-9 h-9 object-contain" alt="File type" />
        </div>

        {/* Text Metadata */}
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-[13px] font-bold text-slate-800 truncate hover:text-[#0096FF] cursor-pointer">
            {attachment.name}
          </span>
          <span className="text-[11px] text-gray-400 font-medium mt-0.5">
            {attachment.size} • {attachment.license} •{" "}
            <span className="text-[#0096FF] hover:underline cursor-pointer">Click to preview</span>
          </span>
        </div>
      </div>

      {/* Action Button */}
      {attachment.actionLabel && (
        <button
          onClick={() => alert("Successfully registered / downloaded resource!")}
          className="btn-get-resource"
        >
          {attachment.actionPoints ? (
            <>
              <span>Get</span>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC107" stroke="#FF8F00" strokeWidth="1.5" />
                <polygon points="12,7 13.5,10.5 17,11 14.5,13.5 15.5,17 12,15 8.5,17 9.5,13.5 7,11 10.5,10.5" fill="white" />
              </svg>
              <span>{attachment.actionPoints}</span>
            </>
          ) : (
            <span>{attachment.actionLabel}</span>
          )}
        </button>
      )}
    </div>
  );
}
