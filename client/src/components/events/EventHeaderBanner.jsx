import React from "react";
import { Plus, AlertCircle, Radio } from "lucide-react";
import { useDispatch } from "react-redux";
import { openCreateModal } from "../../features/events/eventsSlice";

// ==============================================================================
// EVENTS HEADER BANNER COMPONENT
// ==============================================================================
// Visual Specs:
// - Top amber live pill: LIVE & UPCOMING EVENTS
// - Warning/Info icon (!): Amber warning circle
// - Title: Events
// - Description: Free webinars, workshops, AMAs and live clinics...
// - Button: + Post an event
// ==============================================================================
export default function EventHeaderBanner() {
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white border border-amber-300/80 rounded-3xl p-6 md:p-8 shadow-xs select-none">
      {/* Top Row: Amber Badge & Alert Info Icon */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Live & Upcoming Events Pill */}
        <div className="inline-flex items-center gap-2 bg-[#FFA500]/15 text-[#E68A00] border border-[#FFA500]/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          {/* <div className="w-2 h-2 rounded-full bg-[#E68A00] animate-ping" /> */}
          <Radio className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>LIVE & UPCOMING EVENTS</span>
        </div>

        {/* Amber Alert Circle Icon */}
        <button
          type="button"
          title="Events Guidelines"
          className="w-7 h-7 rounded-full border border-amber-400/80 bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition cursor-pointer shrink-0"
        >
          <AlertCircle className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F2942] tracking-tight mb-2">
        Events
      </h1>

      {/* Description */}
      <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-4xl mb-6">
        Free webinars, workshops, AMAs and live clinics across Quality, Safety, Health, Environment, Energy and ESG, hosted by practitioners and the eGrowth community.
      </p>

      {/* + Post an event Button */}
      <div>
        <button
          type="button"
          onClick={() => dispatch(openCreateModal())}
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-2.5 rounded-full text-xs md:text-sm border border-slate-300 shadow-2xs hover:border-slate-400 cursor-pointer transition duration-150 active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post an event</span>
        </button>
      </div>
    </div>
  );
}