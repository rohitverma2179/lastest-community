import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({ trigger, children, align = "right", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute mt-2 bg-white  rounded-lg  py-1 min-w-[160px] z-50 animate-in fade-in  duration-150 ${
            alignmentClasses[align] || alignmentClasses.right
          }`}
        >
          {typeof children === "function" ? children(() => setIsOpen(false)) : children}
        </div>
      )}
    </div>
  );
}

