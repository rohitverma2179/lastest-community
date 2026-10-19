import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../common/Card";
const event = "/assets/Chomeicon/EVENT.svg";
const knowleadge = "/assets/Chomeicon/KNOWLEADGE-SIDE.svg";
const POSTER = "/assets/Chomeicon/POSTER.svg";

export default function QuickMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { id: "events", label: "Events", icon: event, badge: 6, path: "/portal/events" },
    { id: "knowledge", label: "Knowledge Bytes", icon: knowleadge, path: "#" },
    { id: "posters", label: "Posters", icon: POSTER, path: "#" }
  ];

  const getIsActive = (item) => {
    if (!item.path || item.path === "#") return false;
    if (item.id === "knowledge") {
      return location.pathname === "/portal" || location.pathname === "/portal/";
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <Card className="select-none bg-white">
      <style>{`
        .quickmenu-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
          transition: filter 0.15s ease-in-out;
        }
        .group:hover .quickmenu-icon-filter,
        .quickmenu-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
      `}</style>

      <div className="flex flex-col gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item);
          const isImageIcon = typeof Icon === "string" || (Icon && typeof Icon === "object" && typeof Icon.src === "string");
          const imgSrc = typeof Icon === "string" ? Icon : Icon?.src;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => item.path && item.path !== "#" && navigate(item.path)}
              className="w-full flex items-center justify-between group text-left cursor-pointer transition-colors duration-150"
            >
              <div className={`flex items-center gap-3.5 text-[15px] transition-colors duration-150 ${
                isActive ? "text-[#0096FF] font-semibold" : "text-slate-800 group-hover:text-[#0096FF]"
              }`}>
                {isImageIcon ? (
                  <img
                    src={imgSrc}
                    className={`w-5 h-5 object-contain quickmenu-icon-filter ${isActive ? "active" : ""}`}
                    alt={item.label}
                  />
                ) : (
                  <Icon className={`w-5 h-5 stroke-[1.8] transition-colors duration-150 ${
                    isActive ? "text-[#0096FF]" : "text-slate-700 group-hover:text-[#0096FF]"
                  }`} />
                )}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[11px] font-bold px-3.5 py-0.5 rounded-full transition-colors duration-150 ${
                  isActive ? "bg-[#0096FF] text-white shadow-2xs" : "bg-[#dbeafe]/70 text-slate-600"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
