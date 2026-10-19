import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MoreVertical, Pencil, EyeOff, Trash2, UserX, AlertCircle } from "lucide-react";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";

const resourceCardIcon = "/assets/cardicon/resource-card.svg";
const requestCardIcon = "/assets/cardicon/request-card.svg";
const pollCardIcon = "/assets/cardicon/poll-card.svg";
const eventCardIcon = "/assets/cardicon/event-card.svg";
const jobCardIcon = "/assets/cardicon/job-card.svg";
const quizCardIcon = "/assets/cardicon/quiz.svg";

const getBadgeIcon = (type) => {
  switch (type) {
    case "RESOURCE":
      return <img src={resourceCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    case "QUESTION":
      return <img src={requestCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    case "POLL":
      return <img src={pollCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    case "QUIZ":
      return <img src={quizCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    case "EVENT":
      return <img src={eventCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    case "JOB":
      return <img src={jobCardIcon} className="w-3.5 h-3.5 shrink-0 object-contain" alt="" />;
    default:
      return null;
  }
};

export default function FeedHeader({ author, time, type, label, onFollowToggle, onEdit, onHide, onDelete, onBlock, onReport }) {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user?.user);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    const currentUserId = String(authUser?._id || authUser?.id || "").trim();
    const currentUserEmail = String(authUser?.email || "").toLowerCase().trim();
    const currentUserName = String(
      authUser?.name ||
      (authUser?.firstName ? `${authUser.firstName} ${authUser.lastName || ""}` : "")
    ).toLowerCase().trim();

    const postAuthorId = String(author?._id || author?.id || author?.userId || "").trim();
    const postAuthorEmail = String(author?.email || "").toLowerCase().trim();
    const postAuthorName = String(author?.name || "").toLowerCase().trim();

    // If author is the currently logged-in user -> Go to own profile (/profile)
    const isSelf =
      (currentUserId && postAuthorId && currentUserId === postAuthorId) ||
      (currentUserEmail && postAuthorEmail && currentUserEmail === postAuthorEmail) ||
      (currentUserName && postAuthorName && currentUserName === postAuthorName);

    if (isSelf) {
      navigate("/profile");
    } else {
      // Otherwise -> Go to Other User's Profile (/profile/:id)
      const targetId = postAuthorId || author?.username || encodeURIComponent(author?.name || "user");
      navigate(`/profile/${targetId}`);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 select-none">
      {/* Author Details */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          src={author?.avatar}
          name={author?.name}
          size="md"
          className="cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
          onClick={handleProfileClick}
        />
        <div className="flex flex-col justify-center min-w-0 leading-tight">
          {/* Row 1: Name + Badge + Follow Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              onClick={handleProfileClick}
              className="text-sm sm:text-base font-extrabold text-[#0F2942] hover:text-[#0096FF] transition cursor-pointer truncate"
            >
              {author?.name}
            </span>
            {author?.badge && <Badge type={author.badge}>{author.badge}</Badge>}

            {/* Follow Action */}
            <button
              type="button"
              onClick={onFollowToggle}
              className={`text-xs sm:text-sm font-bold cursor-pointer shrink-0 ml-1 transition duration-150 ${author?.isFollowing ? "text-slate-400" : "text-[#0096FF] hover:text-[#0085f2]"
                }`}
            >
              {author?.isFollowing ? "Following" : "+ Follow"}
            </button>
          </div>

          {/* Row 2: Subtitle (Title • Time) */}
          <p className="text-xs sm:text-[13px] text-slate-500 font-medium truncate mt-0.5">
            {author?.title ? `${author.title} • ` : ""}{time}
          </p>
        </div>
      </div>

      {/* Right Side: Type Badge & Options Menu */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Post Type Badge */}
        {label && (
          <button className={`badge-post-type ${type.toLowerCase()}`}>
            {getBadgeIcon(type)}
            <span>{label}</span>
          </button>
        )}

        {/* Dropdown Menu */}
        <Dropdown
          trigger={
            <button
              type="button"
              aria-label="Post options"
              className="p-1.5 -mr-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          align="right"
        >
          {(close) => {
            const handleAction = (actionFn) => {
              close();
              actionFn?.();
            };

            const isQuizOrPoll = type?.toUpperCase() === "QUIZ" || type?.toUpperCase() === "POLL";

            return (
              <div className="w-52 p-1.5 text-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 space-y-0.5 -mt-8 mr-2 z-50">
                {/* Edit Option (Author Only, hidden for Quiz and Poll) */}
                {onEdit && !isQuizOrPoll && (
                  <button
                    type="button"
                    onClick={() => handleAction(onEdit)}
                    className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl text-slate-700 hover:text-sky-600 hover:bg-sky-50/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                  >
                    <Pencil className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors duration-150 stroke-[1.8]" />
                    <span>Edit</span>
                  </button>
                )}

                {/* Hide Option */}
                <button
                  type="button"
                  onClick={() => handleAction(onHide)}
                  className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                >
                  <EyeOff className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-150 stroke-[1.8]" />
                  <span>Hide this post</span>
                </button>

                {/* Delete Option (Author Only) */}
                {onDelete && (
                  <>
                    <div className="my-1 border-t border-slate-100/80" />
                    <button
                      type="button"
                      onClick={() => handleAction(onDelete)}
                      className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl text-rose-600 hover:bg-rose-50/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors duration-150 stroke-[1.8]" />
                      <span>Delete</span>
                    </button>
                  </>
                )}

                <div className="my-1 border-t border-slate-100/80" />

                {/* Block Account */}
                <button
                  type="button"
                  onClick={() => handleAction(onBlock)}
                  className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                >
                  <UserX className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-150 stroke-[1.8]" />
                  <span>Block account</span>
                </button>

                {/* Report Option */}
                <button
                  type="button"
                  onClick={() => handleAction(onReport)}
                  className="group flex w-full items-center gap-3 px-3 py-2 text-left rounded-xl text-amber-600 hover:bg-amber-50/80 active:scale-[0.98] transition-all duration-150 font-medium text-xs sm:text-[13.5px] cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors duration-150 stroke-[1.8]" />
                  <span>Report</span>
                </button>
              </div>
            );
          }}
        </Dropdown>
      </div>
    </div>
  );
}
