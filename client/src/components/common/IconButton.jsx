import React from "react";

export default function IconButton({
  icon: Icon,
  onClick,
  disabled = false,
  className = "",
  size = "md",
  title
}) {
  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-2.5 text-base"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded-full hover:bg-gray-100 transition duration-150 flex items-center justify-center shrink-0 border border-transparent hover:border-gray-100 disabled:opacity-50 disabled:pointer-events-none text-gray-500 hover:text-gray-700 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
