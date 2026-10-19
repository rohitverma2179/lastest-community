import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, X } from "lucide-react";
import { votePollOption } from "../../features/posts/posts.thunk";

// ==============================================================================
// POLL CARD COMPONENT (Single Selection Lock & WhatsApp Style Multi Selection)
// ==============================================================================
// KYU (Why):
//   1. Single Selection Poll (default): Once voted, choice is locked and cannot be unselected.
//   2. Multiple Selection Poll (WhatsApp style): Toggles allow selecting/unselecting multiple options.
// ==============================================================================
export default function PollCard({ postId, poll: initialPoll }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user?.user);

  // Poll state (Options list & total votes)
  const [poll, setPoll] = useState(initialPoll);
  
  // Array of option IDs voted by the current user
  const [votedOptionIds, setVotedOptionIds] = useState([]);

  // ----------------------------------------------------------------------------
  // SYNC & PERSIST STATE FROM PROPS & LOCALSTORAGE
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (initialPoll) {
      setPoll(initialPoll);
      const userId = authUser?._id;

      let foundIds = [];

      // 1. Check Backend Voted Users state
      if (userId && initialPoll.options) {
        initialPoll.options.forEach((opt) => {
          if (opt.votedUsers && opt.votedUsers.some((uid) => uid.toString() === userId.toString())) {
            foundIds.push(opt.id);
          }
        });
      }

      // 2. LocalStorage Persistence Fallback
      if (foundIds.length === 0 && postId) {
        const savedData = localStorage.getItem(`poll_voted_${postId}`);
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            if (Array.isArray(parsed)) {
              foundIds = parsed;
            } else {
              foundIds = [savedData];
            }
          } catch {
            foundIds = [savedData];
          }
        }
      }

      setVotedOptionIds(foundIds);
    }
  }, [initialPoll, authUser, postId]);

  if (!poll || !poll.options) return null;

  const allowMultipleAnswers = !!poll.allowMultipleAnswers;
  const totalVotes = poll.totalVotes || 0;
  const hasVotedAny = votedOptionIds.length > 0;

  // ============================================================================
  // VOTE CLICK HANDLER
  // ============================================================================
  const handleVote = (opt, index) => {
    const clickedOptId = opt.id;
    const isAlreadyVotedOpt = votedOptionIds.includes(clickedOptId);

    // SINGLE SELECTION MODE: Once voted, lock the choice (cannot unselect or vote again)
    if (!allowMultipleAnswers && hasVotedAny) {
      return;
    }

    if (postId) {
      dispatch(votePollOption({ postId, optionIndex: index }));
    }

    setPoll((prev) => {
      let newTotalVotes = prev.totalVotes || 0;
      let newVotedIds = [];

      if (!allowMultipleAnswers) {
        // SINGLE SELECTION (Fresh vote)
        newTotalVotes += 1;
        newVotedIds = [clickedOptId];
        if (postId) {
          localStorage.setItem(`poll_voted_${postId}`, JSON.stringify(newVotedIds));
        }
      } else {
        // MULTIPLE SELECTION (WhatsApp style toggle)
        if (isAlreadyVotedOpt) {
          // Toggle OFF
          newTotalVotes = Math.max(0, newTotalVotes - 1);
          newVotedIds = votedOptionIds.filter((id) => id !== clickedOptId);
        } else {
          // Toggle ON
          newTotalVotes += 1;
          newVotedIds = [...votedOptionIds, clickedOptId];
        }

        if (postId) {
          localStorage.setItem(`poll_voted_${postId}`, JSON.stringify(newVotedIds));
        }
      }

      // Update options array
      const updatedOptions = prev.options.map((item, idx) => {
        let currentVotes = item.votes || 0;
        if (idx === index) {
          if (allowMultipleAnswers && isAlreadyVotedOpt) {
            currentVotes = Math.max(0, currentVotes - 1);
          } else {
            currentVotes = currentVotes + 1;
          }
        }
        return {
          ...item,
          votes: currentVotes
        };
      });

      // Recalculate percentages
      const finalizedOptions = updatedOptions.map((o) => {
        const pct = newTotalVotes > 0 ? Math.round((o.votes / newTotalVotes) * 100) : 0;
        return {
          ...o,
          percentage: pct
        };
      });

      // Winner status
      const maxVotes = Math.max(...finalizedOptions.map((o) => o.votes));
      const optionsWithWinner = finalizedOptions.map((o) => ({
        ...o,
        isWinner: newTotalVotes > 0 && o.votes > 0 && o.votes === maxVotes
      }));

      setVotedOptionIds(newVotedIds);

      return {
        ...prev,
        options: optionsWithWinner,
        totalVotes: newTotalVotes
      };
    });
  };

  return (
    <div className="space-y-3 select-none my-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80">
      {/* Poll Options List */}
      <div className="space-y-2.5">
        {poll.options.map((opt, index) => {
          const isSelected = votedOptionIds.includes(opt.id);
          const pct = opt.percentage !== undefined
            ? opt.percentage
            : totalVotes > 0
            ? Math.round(((opt.votes || 0) / totalVotes) * 100)
            : 0;

          const isClickDisabled = !allowMultipleAnswers && hasVotedAny;

          let boxStyle =
            "relative overflow-hidden border rounded-xl p-3.5  transition-all duration-200 flex items-center justify-between ";

          if (isClickDisabled) {
            boxStyle += "cursor-default";
          } else {
            boxStyle += "cursor-pointer";
          }

          if (isSelected) {
            boxStyle += "bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold shadow-2xs ";
          } else if (isClickDisabled) {
            boxStyle += "bg-white border-slate-200 text-slate-800 ";
          } else {
            boxStyle += "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 ";
          }

          return (
            <div
              key={opt.id || index}
              onClick={() => handleVote(opt, index)}
              className={boxStyle}
            >
              {/* Radio / Checkbox Indicator & Option Title */}
              <div className="relative z-10 flex items-center gap-3 pr-2 min-w-0">
                {/* Selection Icon */}
                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white transition-transform scale-105">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : !allowMultipleAnswers && hasVotedAny ? (
                    <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-400">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                  )}
                </div>

                {/* Option Text */}
                <span className="text-xs md:text-sm truncate text-slate-800">
                  {opt.text}
                </span>
              </div>

              {/* Vote Count & Percentage */}
              {hasVotedAny && (
                <div className="relative z-10 shrink-0 flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="text-[11px] font-medium text-slate-400">
                    {opt.votes || 0} {opt.votes === 1 ? "vote" : "votes"}
                  </span>
                  <span className={isSelected ? "text-emerald-600 font-extrabold" : "text-slate-800 font-extrabold"}>
                    {pct}%
                  </span>
                </div>
              )}

              {/* Progress Fill Bar (Only shown for selected option) */}
              {hasVotedAny && isSelected && (
                <div
                  className="absolute top-0 left-0 bottom-0 pointer-events-none transition-all duration-500 opacity-20 bg-emerald-500"
                  style={{ width: `${pct}%` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
