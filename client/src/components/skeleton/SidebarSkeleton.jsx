import React from "react";

export default function SidebarSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="h-4 bg-gray-200 rounded-md w-1/2" />
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded-md w-2/3" />
              <div className="h-3 bg-gray-200 rounded-md w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
