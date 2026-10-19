import React from "react";

export default function FeedSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((n) => (
        <div key={n} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded-md w-1/3" />
              <div className="h-3 bg-gray-200 rounded-md w-1/4" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            <div className="h-4 bg-gray-200 rounded-md w-5/6" />
          </div>
          <div className="h-24 bg-gray-100 rounded-lg w-full" />
          <div className="flex justify-between border-t border-gray-100 pt-3">
            <div className="h-5 bg-gray-200 rounded-md w-1/6" />
            <div className="h-5 bg-gray-200 rounded-md w-1/6" />
            <div className="h-5 bg-gray-200 rounded-md w-1/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
