import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const homeIcon = "/assets/Chomeicon/HOME.svg";
const connectionsIcon = "/assets/Chomeicon/MY-CONNECTIONS.svg";
const resourcesIcon = "/assets/Chomeicon/RESOURCES-NAV-BAR.svg";
const jobsIcon = "/assets/Chomeicon/JOB.svg";
const messagingIcon = "/assets/Chomeicon/MESSAGING.svg";
const notificationsIcon = "/assets/Chomeicon/NOTIFICATION.svg";
const downloadsIcon = "/assets/Chomeicon/DOWNLOADS.svg";

export default function Navigation({ className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: homeIcon, path: "/portal" },
    { id: "connections", label: "My Connections", icon: connectionsIcon, path: "#" },
    { id: "resources", label: "Resources Library", icon: resourcesIcon, path: "/portal/resources" },
    { id: "jobs", label: "Jobs", icon: jobsIcon, path: "#" },
    { id: "messaging", label: "Messaging", icon: messagingIcon, path: "#" },
    { id: "notifications", label: "Notifications", icon: notificationsIcon, path: "#", badge: 3 },
    { id: "downloads", label: "My Downloads", icon: downloadsIcon, path: "/portal/download" }
  ];

  const getActiveState = (item) => {
    if (item.path === "#") return false;
    if (item.path === "/" || item.path === "/portal") {
      return location.pathname === "/portal" || location.pathname === "/portal/" || location.pathname === "/";
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className={`flex items-center gap-2.5 lg:gap-4 xl:gap-6 2xl:gap-8 ${className}`}>
      {/* Styles to apply theme colors to SVG icons */}
      <style>{`
        .nav-icon-filter {
          filter: brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(837%) hue-rotate(182deg) brightness(92%) contrast(87%);
          transition: filter 0.15s ease-in-out;
        }
        .group:hover .nav-icon-filter {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
        .nav-icon-filter.active {
          filter: brightness(0) saturate(100%) invert(49%) sepia(98%) saturate(1938%) hue-rotate(188deg) brightness(102%) contrast(106%);
        }
      `}</style>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = getActiveState(item);
        const isImageIcon = typeof Icon === "string" || (Icon && typeof Icon === "object" && typeof Icon.src === "string");
        const imgSrc = typeof Icon === "string" ? Icon : Icon?.src;

        return (
          <button
            key={item.id}
            onClick={() => item.path !== "#" && navigate(item.path)}
            className={`relative flex flex-col items-center justify-center py-1 transition-all duration-150 shrink-0 select-none cursor-pointer group ${
              isActive
                ? "text-[#0096FF]"
                : "text-gray-500 hover:text-[#0096FF]"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {isImageIcon ? (
                <img
                  src={imgSrc}
                  alt={item.label}
                  className={`w-[22px] h-[22px] object-contain transition-all duration-150 nav-icon-filter ${
                    isActive ? "active" : ""
                  }`}
                />
              ) : (
                <Icon className="w-[22px] h-[22px] stroke-[1.6]" />
              )}
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10.5px] font-medium  tracking-tight text-center">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

