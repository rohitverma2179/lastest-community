import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, UserPlus, UserCheck } from "lucide-react";
import Card from "../../common/Card";
import Avatar from "../../common/Avatar";
import Button from "../../common/Button";
import { TOP_CONTRIBUTORS } from "../../../data/contributors";

export default function TopContributors() {
  const navigate = useNavigate();
  const [contributors, setContributors] = useState(TOP_CONTRIBUTORS);

  const toggleFollow = (rank) => {
    setContributors((prev) =>
      prev.map((c) => (c.rank === rank ? { ...c, isFollowing: !c.isFollowing } : c))
    );
  };

  const handleContributorClick = (c) => {
    const target = c.id || c.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/profile/${target}`);
  };

  const getRankBadgeClass = (rank) => {
    switch (rank) {
      case 1:
        return "bg-amber-100 text-amber-700 font-black border border-amber-200";
      case 2:
        return "bg-slate-100 text-slate-700 font-black border border-slate-200";
      case 3:
        return "bg-amber-50 text-amber-800/80 font-black border border-amber-100";
      default:
        return "bg-gray-50 text-gray-500   border border-gray-100";
    }
  };

  return (
    <Card noPadding className="select-none overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-500" />
          <span className="text-[14px] font-bold text-slate-800">
            Top Contributors
          </span>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100/60 px-4 py-2">
        {contributors.map((c) => (
          <div key={c.rank} className="flex items-center justify-between py-2.5 gap-2">
            {/* Rank, Avatar, Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Rank Badge */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 select-none ${getRankBadgeClass(
                  c.rank
                )}`}
              >
                {c.rank}
              </div>

              {/* Avatar */}
              <Avatar
                src={c.avatar}
                name={c.name}
                size="sm"
                className="cursor-pointer hover:opacity-85 transition-opacity"
                onClick={() => handleContributorClick(c)}
              />

              {/* Details */}
              <div className="flex flex-col min-w-0 leading-tight">
                <span
                  onClick={() => handleContributorClick(c)}
                  className="text-[12px] font-bold text-gray-700 truncate hover:text-[#0096FF] transition cursor-pointer"
                >
                  {c.name}
                </span>
                <span className="text-[9px] text-gray-400   mt-0.5 tracking-wide">
                  {c.points}
                </span>
              </div>
            </div>

            {/* Follow/Following Button */}
            <button
              type="button"
              onClick={() => toggleFollow(c.rank)}
              className={`text-[11px] font-bold py-1 px-2.5 shrink-0 cursor-pointer border-none bg-transparent hover:opacity-80 transition-all ${
                c.isFollowing ? "text-gray-400" : "text-[#0096FF]"
              }`}
            >
              {c.isFollowing ? "Following" : "+ Follow"}
            </button>

            <button>

            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
