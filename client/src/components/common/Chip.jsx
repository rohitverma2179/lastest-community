import React from "react";

export default function Chip({ label, onClick, className = "" }) {
  const isClickable = !!onClick;
  
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center text-xs   px-2.5 py-1 rounded-full bg-blue-50 text-[#0096FF] border border-blue-100 hover:bg-blue-100 duration-150 select-none ${isClickable ? "cursor-pointer" : ""} ${className}`}
    >
      #{label}
    </span>
  );
}
