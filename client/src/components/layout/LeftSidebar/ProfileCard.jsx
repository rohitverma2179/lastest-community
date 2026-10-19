import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../common/Card";
import { CURRENT_USER } from "../../../data/users";

export default function ProfileCard() {
  const { user } = useSelector((state) => state.user);

  // Dynamic user details with fallback
  const displayName =
    user?.name ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : CURRENT_USER.name);
  const displayRole = user?.designation || user?.role || CURRENT_USER.role;
  const displayCompany = user?.company || "";
  const displayLocation =
    user?.city && user?.country
      ? `${user.city}, ${user.country}`
      : user?.city || user?.country || CURRENT_USER.location;
  const displayBio = user?.bio || user?.description || CURRENT_USER.bio;
  const displayAvatar = user?.avatar || CURRENT_USER.avatar;
  const displayCover = user?.coverPhoto || "";

  // Dynamic reputation / level / karma calculation
  const reputation = user?.reputation || CURRENT_USER.karmaCurrent || 600;
  const level = Math.max(1, Math.floor(reputation / 500) + 1);
  const karmaTarget = level * 600;
  const karmaCurrent = reputation;
  const karmaPercent = Math.min(
    Math.round((karmaCurrent / karmaTarget) * 100),
    100
  );

  return (
    <Card
      noPadding
      className="relative overflow-hidden select-none rounded-[16px] border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white"
    >
      {/* Decorative / Custom Top Banner */}
      <Link to="/profile" className="block relative h-[70px] w-full bg-[#589ec7] overflow-hidden">
        {displayCover ? (
          <img
            src={displayCover}
            alt="Profile cover"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#589ec7]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Content Container */}
      <div className="px-5 pb-5 pt-0 flex flex-col items-start">
        {/* Avatar & Badge Container */}
        <div className="relative -mt-[42px] mb-3">
          <Link to="/profile" className="block group">
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-18 h-18 rounded-full border-2 border-white shadow-xs object-cover bg-white group-hover:scale-105 transition duration-200"
            />
          </Link>
          <span className="absolute bottom-0 left-[44px] bg-[#f09205] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs select-none border border-white">
            LEGEND
          </span>
        </div>

        {/* Name & Role Details */}
        <div className="flex flex-col items-start w-full">
          <Link to="/profile" className="hover:text-[#0096FF] transition-colors">
            <h2 className="text-[21px] sm:text-[23px] font-bold text-[#1e293b] tracking-tight leading-tight">
              {displayName}
            </h2>
          </Link>
          <p className="text-[12px] font-medium text-slate-500 mt-1">
            {displayRole}
            {displayCompany ? ` • ${displayCompany}` : ""}
          </p>
          {displayLocation && (
            <p className="text-[12px] font-normal text-slate-400 mt-0.5">
              {displayLocation}
            </p>
          )}
        </div>

        {/* Short Bio */}
        <p className="text-[12px] text-[#334155] font-normal line-clamp-2 leading-relaxed mt-2 w-full">
          {displayBio}
        </p>

        {/* Followers / Following Stats */}
        <div className="flex items-center gap-6 sm:gap-8 w-full mt-5 mb-4">
          <div className="flex flex-col items-start">
            <span className="text-[19px] font-bold text-[#005391] leading-none">
              402
            </span>
            <span className="text-[14px] font-bold text-[#1e293b] mt-1">
              Followers
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[19px] font-bold text-[#005391] leading-none">
              10
            </span>
            <span className="text-[14px] font-bold text-[#1e293b] mt-1">
              Following
            </span>
          </div>
        </div>

        {/* Level & Karma Progress Bar */}
        <div className="w-full mt-2">
          <div className="flex items-center justify-between text-[13px] font-normal text-slate-400 mb-1.5">
            <span>Level {level}</span>
            <span>
              {karmaCurrent} Karma to {karmaTarget}
            </span>
          </div>
          <div className="w-full bg-[#edf2f7] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#0096FF] h-full rounded-full transition-all duration-300"
              style={{ width: `${karmaPercent}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}