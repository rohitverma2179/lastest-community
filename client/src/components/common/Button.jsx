import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button"
}) {
  const baseClasses = "inline-flex items-center justify-center  rounded-lg transition duration-200 focus:outline-none shrink-0";
  
  const variantClasses = {
    primary: "bg-[#0096FF] text-white hover:bg-[#005391] disabled:bg-gray-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200",
    post: "bg-[#0096FF] text-white hover:bg-[#005391] px-5 py-2 rounded-full shadow-sm font-bold flex items-center gap-1.5",
    link: "text-[#0096FF] hover:underline disabled:text-gray-300 p-0"
  };

  const sizeClasses = {
    xs: "px-2.5 py-1 text-[11px]",
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-4.5 py-2 text-sm",
    lg: "px-6 py-2.5 text-base"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </button>
  );
}
