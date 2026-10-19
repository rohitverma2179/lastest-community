import React, { useState } from "react";
import { UPCOMING_EVENTS } from "../../../data/events";
import Card from "../../common/Card";
import Avatar from "../../common/Avatar";

export default function UpcomingEvent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const event = UPCOMING_EVENTS[currentIndex];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Card noPadding className="select-none overflow-hidden flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-[14px] font-bold text-slate-800">
          Upcoming Events
        </h3>
      </div>

      {/* Banner Image */}
      <div className="h-28 mx-5 relative rounded-[16px] overflow-hidden shrink-0 bg-slate-100">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Details */}
      <div className="px-5 pt-3 pb-5 flex-1 flex flex-col">
        {/* Speaker Profile */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={event.speakerAvatar} name={event.speaker} size="md" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-slate-800 truncate leading-none">
                {event.speaker}
              </span>
              <span className="bg-[#ff9800] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 leading-none">
                {event.speakerBadge}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5 truncate">
              {event.speakerTitle || "Host"}
            </span>
          </div>
        </div>

        {/* Event Title & Description */}
        <h4 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-1.5 hover:text-[#0096FF] duration-150 cursor-pointer">
          {event.title}
        </h4>
        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Bottom Booking Container */}
        <div className="border border-amber-200/60 bg-amber-50/5 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
          {/* Left Details */}
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-extrabold text-slate-800 tracking-tight truncate">
              {event.date} · {event.time}
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5 truncate">
              {event.status}
            </span>
          </div>

          {/* Right Button */}
          <button
            onClick={() => alert("Successfully registered for the event!")}
            className="btn-register"
          >
            Register
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center gap-1.5 mt-3.5 px-0.5">
          {UPCOMING_EVENTS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-200 ${index === currentIndex ? "w-4 bg-[#0096FF]" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
