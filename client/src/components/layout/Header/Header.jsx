import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import { CURRENT_USER } from "../../../data/users";
const logo = "/assets/egrowth-logo.png";
import { openModal } from "../../../features/posts/posts.slice";

export default function Header() {
  const dispatch = useDispatch();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1850px] mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 min-w-0">
          {/* Logo */}
          <div className="flex items-center cursor-pointer shrink-0 select-none">
            <img src={logo.src || logo} alt="eGrowth Logo" className="h-4 sm:h-6 md:h-7 w-auto object-contain" />
          </div>

          {/* Search bar (Desktop & Tablet) */}
          <SearchBar className="hidden md:block w-36 sm:w-44 lg:w-56 xl:w-64" />
        </div>

        {/* Center: Navigation (Visible on lg/xl screens up to TV) */}
        <Navigation className="hidden lg:flex" />

        {/* Right Side: Points, Action, Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5 md:gap-4 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-1.5 text-gray-500 hover:text-gray-700 md:hidden rounded-lg hover:bg-gray-100 transition cursor-pointer select-none"
            aria-label="Toggle Search"
          >
            {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Points Balance */}
          <div className="flex items-center gap-1 sm:gap-1.5 select-none cursor-default py-1 px-1.5 sm:px-2 bg-amber-50/70 sm:bg-transparent rounded-full border border-amber-200/60 sm:border-none">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-b from-[#ffc837] to-[#ff8008] flex items-center justify-center shadow-xs shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-700 leading-none">
              {CURRENT_USER.walletPoints}
            </span>
          </div>

          {/* Add Post CTA */}
          <button
            onClick={() => dispatch(openModal())}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#0096FF] hover:bg-[#0085f2] text-white text-xs font-bold rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition duration-150 cursor-pointer select-none shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="text-xs leading-none hidden sm:inline">Post</span>
          </button>

          {/* Profile Dropdown */}
          <UserMenu />
        </div>
      </div>

      {/* Expandable Mobile Search Input Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 pb-3 pt-1.5 border-t border-gray-100 bg-white">
          <SearchBar className="w-full max-w-full block" />
        </div>
      )}
    </header>
  );
}