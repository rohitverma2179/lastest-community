import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="h-20 bg-gray-200" />
      <div className="p-5 flex flex-col items-center -mt-10 space-y-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full border-4 border-white" />
        <div className="h-4 bg-gray-200 rounded-md w-1/2" />
        <div className="h-3 bg-gray-200 rounded-md w-2/3" />
        <div className="h-3 bg-gray-200 rounded-md w-1/3" />
        <div className="flex justify-between w-full border-t border-gray-100 pt-4 px-2">
          <div className="text-center space-y-1">
            <div className="h-4 bg-gray-200 rounded-md w-10 mx-auto" />
            <div className="h-2 bg-gray-200 rounded-md w-16 mx-auto" />
          </div>
          <div className="text-center space-y-1">
            <div className="h-4 bg-gray-200 rounded-md w-10 mx-auto" />
            <div className="h-2 bg-gray-200 rounded-md w-16 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
