import React, { useState } from "react";

export default function Avatar({ src, name, size = "md", className = "" }) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-10 h-10 text-base",
    xl: "w-16 h-16 text-lg",
    xxl: "w-20 h-20 text-xl"
  };

  const defaultPhoto =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";

  const getInitials = (n) => {
    if (!n) return "U";
    if (/^[0-9a-fA-F]{24}$/.test(n)) return "U";
    return n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const imageSource = !hasError && src ? src : (!hasError && !src ? defaultPhoto : null);

  if (imageSource) {
    return (
      <img
        src={imageSource}
        alt={name || "Avatar"}
        className={`rounded-full object-cover shrink-0 border border-gray-100 ${sizeClasses[size] || sizeClasses.md} ${className}`}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className={`rounded-full shrink-0 flex items-center justify-center font-bold bg-[#0096FF]/10 text-[#0096FF] border border-[#0096FF]/20 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

