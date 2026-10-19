import React from "react";

export default function Badge({ children, type = "default", className = "" }) {
  const baseStyle = "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border shrink-0";
  
  const styles = {
    default: "bg-gray-50 text-gray-600 border-gray-200",
    CREATOR: "bg-[#ec4899] text-white border-transparent rounded-full px-2.5",
    PIONEER: "bg-[#8b5cf6] text-white border-transparent rounded-full px-2.5",
    LEGEND: "bg-sky-50 text-sky-600 border-sky-200",
    BUILDER: "bg-blue-50 text-blue-600 border-blue-200",
    EXPLORER: "bg-amber-50 text-amber-700 border-amber-200"
  };

  const selectedStyle = styles[type] || styles.default;

  return (
    <span className={`${baseStyle} ${selectedStyle} ${className}`}>
      {children || type}
    </span>
  );
}
