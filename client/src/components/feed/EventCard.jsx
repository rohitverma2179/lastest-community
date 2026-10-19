import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
const eventCardIcon = "/assets/cardicon/event-card.svg";
const teamsIcon = "/assets/cardicon/Microsoft Teams 2019.svg";

export default function EventCard({ event }) {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) return null;

  const iconSrc = event.icon === "TEAMS" ? teamsIcon : eventCardIcon;

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
    if (!isRegistered && event.joiningLink && event.joiningLink !== "#") {
      window.open(event.joiningLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl select-none">
      {/* Event Meta */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
          <img src={iconSrc} className="w-9 h-9 object-contain" alt="Event icon" />
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
            {event.title}
          </span>
          <span className="text-[10px] text-gray-400 mt-1">
            {event.subtitle}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={isRegistered ? "outline" : "primary"}
        size="xs"
        onClick={handleRegister}
        className={`font-bold px-4 py-2 rounded-lg shrink-0 shadow-xs cursor-pointer ${isRegistered
          ? "border-green-200 text-green-600 bg-green-50 hover:bg-green-100/40"
          : "bg-[#0096FF] hover:bg-[#005391]"
          }`}
      >
        {isRegistered ? (
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Registered
          </span>
        ) : (
          event.actionLabel || "Register Now"
        )}
      </Button>
    </div>
  );
}


