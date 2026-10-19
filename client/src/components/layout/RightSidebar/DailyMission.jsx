import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Card from "../../common/Card";
import { DAILY_MISSIONS } from "../../../data/missions";

export default function DailyMission() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Daily");
  const [missions, setMissions] = useState(DAILY_MISSIONS);

  // Compute stats
  const total = missions.length;
  const completedMissions = missions.filter((m) => m.current >= m.target);
  const completedCount = completedMissions.length;
  const leftCount = total - completedCount;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const tabs = ["Daily", "Weekly", "Monthly"];

  return (
    <Card noPadding className="select-none overflow-hidden p-4 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#0096FF] flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1.8" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[14px] font-bold text-[#0f172a] tracking-wide uppercase">
             Missions
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-500 hover:text-slate-700 transition cursor-pointer p-1"
          aria-label="Toggle missions"
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-3.5">
          {/* Tabs Filter */}
          <div className="flex items-center gap-2 mb-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0096FF] text-white px-4 py-1.5 rounded-full shadow-xs"
                      : "text-slate-500 hover:text-slate-700 px-2 py-1.5"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-white" : "bg-[#ef4444]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Missions List */}
          <div className="divide-y divide-slate-100/80">
            {missions.map((mission) => {
              const isCompleted = mission.current >= mission.target;
              const itemPercent = Math.min(
                Math.round((mission.current / mission.target) * 100),
                100
              );
              return (
                <div key={mission.id} className="py-2.5 first:pt-1 last:pb-2">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[13px] font-medium ${
                        isCompleted ? "text-slate-400 line-through" : "text-slate-700"
                      }`}
                    >
                      {mission.title}
                    </span>

                    {/* Right Side: Current count & Coin Reward */}
                    <div className="flex items-center gap-1.5 shrink-0 text-[13px]">
                      <span className="font-semibold text-slate-700">
                        {mission.current}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* Gold Coin Icon */}
                        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#ffc837] to-[#ff8008] flex items-center justify-center shadow-xs">
                          <svg
                            className="w-2.5 h-2.5 text-white fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-[#0096FF]">
                          {mission.reward}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#edf2f7] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#0096FF] h-full rounded-full transition-all duration-300"
                      style={{ width: `${itemPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status Section */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              STATUS
            </span>
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#0f2942]">
                  {completedCount}/{total} done
                </span>
                <span className="text-slate-400 font-normal">
                  • {leftCount} left
                </span>
              </div>
              <span className="font-bold text-[#0096FF]">{percent}%</span>
            </div>
            <div className="w-full bg-[#e6f0ff] rounded-full h-2.5 overflow-hidden mt-2">
              <div
                className="bg-[#0f2942] h-full rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

