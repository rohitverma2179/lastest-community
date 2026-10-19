import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Plus,
  MoreVertical,
  UserX,
  AlertCircle,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import Dropdown from "../common/Dropdown";

/**
 * OtherProfileHeaderCard Component
 * Header card for viewing ANOTHER user's profile:
 * - Cover banner with Back arrow button
 * - Overlapping Avatar with status badge
 * - Top-right actions: Share profile & 3-dots menu (Block, Report, Copy Link)
 * - User details: Name, Title/Company/Location, Followers/Following stats, Bio
 * - Action buttons: Follow (+ Follow / Following toggle) & Message button
 * - NO "Edit Profile" button
 */
export default function OtherProfileHeaderCard({ user }) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const initialFollowers = typeof user?.followers === "number" ? user.followers : 402;
  const [followersCount, setFollowersCount] = useState(initialFollowers);

  // User details with fallbacks
  const displayName =
    user?.name ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Community Member");
  const displayTitle = user?.title || user?.designation || user?.role || "ISO 50001 Lead";
  const displayCompany = user?.company || "Hindustan Unilever";
  const displayLocation =
    user?.location || (user?.city && user?.country ? `${user.city}, ${user.country}` : "Gurugram, Haryana");
  const displayBio =
    user?.bio ||
    user?.description ||
    "Leading ISO implementation across manufacturing facilities, improving energy performance and supporting sustainability initiatives.";
  const displayAvatar =
    user?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";
  const displayCover =
    user?.coverPhoto ||
    user?.banner ||
    user?.cover ||
    "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80";
  const displayBadge = user?.badge || "LEGEND";

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
      toast(`Unfollowed ${displayName}`, { icon: "" });
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
      toast.success(`Following ${displayName}!`, { icon: "" });
    }
  };

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

  const handleSendMessage = () => {
    toast(`Starting chat with ${displayName}...`, { icon: "" });
  };

  const handleBlockUser = () => {
    toast.success(`${displayName} has been blocked.`, { icon: "" });
  };

  const handleReportUser = () => {
    toast.success(`Report submitted for ${displayName}. Our team will review.`, { icon: "" });
  };

  return (
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

        {/* Subtle Dark Gradient Overlay */}
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
          {/* Avatar Container with Overlapping Status Badge */}
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

            {/* Status Badge */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9.5px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider border-2 border-white select-none whitespace-nowrap">
              {displayBadge}
            </div>
          </div>

          {/* Right Action: Share Profile & 3-Dots Menu (NO Edit Profile) */}
          <div className="pb-1 sm:pb-2 flex items-center gap-2 sm:gap-2.5">
            {/* Share profile button */}
            <button
              type="button"
              onClick={handleShareProfile}
              className="p-2 sm:p-1.5 rounded-xl sm:rounded-2xl !text-slate-500 hover:!text-slate-800 hover:!bg-slate-100 transition cursor-pointer border border-slate-200/70"
              title="Share profile"
              aria-label="Share profile"
            >
              <ExternalLink className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* 3-Dots Menu (Report, Block, Copy Link) */}
            <Dropdown
              trigger={
                <button
                  type="button"
                  aria-label="User profile options"
                  className="p-1 sm:p-1.5 rounded-xl sm:rounded-2xl !text-slate-500 hover:!text-slate-800 hover:!bg-slate-100 transition cursor-pointer border border-slate-200/70"
                >
                  <MoreVertical className="w-5 h-5 stroke-[1.8]" />
                </button>
              }
              align="right"
            >
              {(close) => {
                const handleAction = (actionFn) => {
                  close();
                  actionFn?.();
                };

                return (
                  <div className="w-52 p-1.5 text-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 space-y-0.5 -mt-2 mr-1 z-50">
                    {/* Copy Link */}
                    <button
                      type="button"
                      onClick={() => handleAction(handleShareProfile)}
                      className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl !text-slate-700 hover:!text-sky-600 hover:!bg-sky-50/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors stroke-[1.8]" />
                      <span>Copy profile link</span>
                    </button>

                    <div className="my-1 border-t border-slate-100/80" />

                    {/* Block User */}
                    <button
                      type="button"
                      onClick={() => handleAction(handleBlockUser)}
                      className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl !text-slate-700 hover:!text-slate-900 hover:!bg-slate-100/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                    >
                      <UserX className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors stroke-[1.8]" />
                      <span>Block user</span>
                    </button>

                    {/* Report User */}
                    <button
                      type="button"
                      onClick={() => handleAction(handleReportUser)}
                      className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl !text-amber-600 hover:!bg-amber-50/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors stroke-[1.8]" />
                      <span>Report user</span>
                    </button>
                  </div>
                );
              }}
            </Dropdown>
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
                {user?.following || 10}
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

          {/* Action Buttons: Follow & Message (Active on other user's profile) */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleToggleFollow}
              className={`px-6 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-1.5 shadow-2xs cursor-pointer select-none ${
                isFollowing
                  ? "!bg-slate-100 hover:!bg-slate-200 !text-slate-800"
                  : "!bg-[#0096FF] hover:!bg-[#0085f2] !text-white"
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Follow</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSendMessage}
              className="px-6 sm:px-7 py-2.5 rounded-xl !bg-[#8c9ba5] hover:!bg-[#7b8a94] !text-white font-semibold text-xs sm:text-sm transition duration-150 shadow-2xs cursor-pointer select-none"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
