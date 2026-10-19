import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ className = "" }) {
  return (
    <div className={`relative w-full max-w-[280px] group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0096FF] transition-colors duration-150">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder="Search...."
        className="w-full pl-10 pr-4 py-1.5 bg-[#f3f4f6] border border-transparent rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0096FF]/30 transition-all duration-150"
      />
    </div>
  );
}
