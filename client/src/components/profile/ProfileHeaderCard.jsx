import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import EditProfileModal from "./EditProfileModal";


/**
 * ProfileHeaderCard Component
 * Top profile header matching the provided screenshot design:
 * - Cover banner with Back arrow button
 * - Overlapping Avatar with orange "LEGEND" status badge
 * - Profile details: Name, Title/Company/Location, Followers/Following stats, Bio
 * - Interactive action buttons: Follow & Message
 * - Edit profile button & External Share button
 */
export default function ProfileHeaderCard({ user }) {
  const navigate = useNavigate();
  const [followersCount] = useState(402);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fallback / dynamic data
  const displayName = user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Kirti Rajput");
  const displayTitle = user?.designation || user?.role || "ISO 50001 Lead";
  const displayCompany = user?.company || "Hindustan Unilever";
  const displayLocation = user?.city && user?.country ? `${user.city}, ${user.country}` : "Gurugram, Haryana";
  const displayBio = user?.bio || user?.description || "Leading ISO 50001 implementation across manufacturing facilities, improving energy performance and supporting sustainability initiatives.";
  const displayAvatar = user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";
  const displayCover =
    user?.coverPhoto ||
    user?.banner ||
    user?.cover ||
    "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80";

  const handleShareProfile = async () => {
    const profileUrl = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profile link copied to clipboard!", { icon: "" });
      } else {
        toast("Profile URL: " + profileUrl);
      }
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-200">
        {/* 1. Cover Photo Banner */}
        <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden bg-slate-200">
          <img
            src={displayCover}
            alt=""
            className="w-full h-full object-cover object-center transform hover:scale-102 transition duration-700"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80";
            }}
          />
          
          {/* Subtle Dark Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30" />

          {/* Top-Left Back Arrow Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full !bg-black/40 hover:!bg-black/60 !text-white backdrop-blur-md flex items-center justify-center transition shadow-md cursor-pointer select-none z-10"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 2. Profile Details Body */}
        <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
          
          {/* Top Row: Avatar overlapping banner & Action Buttons */}
          <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-4 relative z-10">
            {/* Avatar Container with Overlapping LEGEND Badge */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white shadow-md overflow-hidden shrink-0">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";
                  }}
                />
              </div>

              {/* Status Badge (LEGEND) */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9.5px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider border-2 border-white select-none whitespace-nowrap">
                LEGEND
              </div>
            </div>

            {/* Right Action: Edit Profile & External Share Button */}
            <div className="pb-1  sm:pb-2 flex items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="  bg-[#0096FF] hover:bg-[#0085f2] text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4.5 py-2 sm:py-1.5  rounded-xl sm:rounded-2xl flex items-center gap-2 transition shadow-sm cursor-pointer select-none active:scale-95"
              >
                <SquarePen className="w-4 h-4 stroke-[2.2]" />
                <span>Edit profile</span>
              </button>

              <button
                type="button"
                onClick={handleShareProfile}
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Share profile"
                aria-label="Share profile"
              >
                <ExternalLink className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>
          </div>

          {/* User Info Details */}
          <div className="space-y-3.5">
            {/* Name & Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {displayTitle}
                {displayCompany ? ` • ${displayCompany}` : ""}
                {displayLocation ? `, ${displayLocation}` : ""}
              </p>
            </div>

            {/* Stats: Followers & Following */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0096FF] text-[15px] sm:text-base">
                  {followersCount}K
                </span>
                <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                  Followers
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0096FF] text-[15px] sm:text-base">
                  10
                </span>
                <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                  Following
                </span>
              </div>
            </div>

            {/* Bio Description */}
            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed max-w-3xl font-normal">
              {displayBio}
            </p>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </>
  );
}

