import React from "react";

export default function ProgressBar({
  percentage,
  color = "blue",
  height = "h-2",
  className = ""
}) {
  const colorMap = {
    blue: "bg-[#0096FF]",
    green: "bg-green-500",
    red: "bg-red-500",
    amber: "bg-amber-500",
    gray: "bg-gray-400"
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${selectedColor}`}
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );
}
