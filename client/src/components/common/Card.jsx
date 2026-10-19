import React from "react";

export default function Card({ children, className = "", noPadding = false, onClick }) {
  const isClickable = !!onClick;
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-200/80 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-200 ${
        isClickable ? "hover:shadow-md cursor-pointer hover:border-gray-300" : ""
      } ${noPadding ? "" : "p-3 md:p-3 "} ${className}`}
    >
      {children}
    </div>
  );
}
