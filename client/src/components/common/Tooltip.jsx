import React, { useState } from "react";

export default function Tooltip({ text, children, position = "top", className = "" }) {
  const [show, setShow] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && text && (
        <div
          className={`absolute z-50 px-2 py-1 text-[10px] font-bold text-white bg-gray-900 rounded shadow-md whitespace-nowrap pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${positionClasses[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
