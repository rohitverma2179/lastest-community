import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, X } from "lucide-react";
import { voteQuizOption } from "../../features/posts/posts.thunk";

// ==============================================================================
// WHATSAPP STYLE QUIZ COMPONENT (Frontend Card)
// ==============================================================================
// KYU (Why):
//   1. Quiz owner/creator apne quiz ko select nahi kar sakta. Unke quiz me correct
//      answer automatically blue box + check mark aur wrong options orange box + cross dikhenge.
//   2. Other users initial state me clean gray border dekhenge aur option click karke answer submit kar sakte hain.
// ==============================================================================
export default function QuizCard({ postId, quiz: initialQuiz, authorId, authorEmail }) {
  const dispatch = useDispatch();
  // Get logged-in user from Redux store (`state.user.user`)
  const authUser = useSelector((state) => state.user?.user);

  // Local state for quiz options & metadata
  const [quiz, setQuiz] = useState(initialQuiz);
  // Logged-in user ne kis option par answer submit kiya hai (index or null)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Check if logged-in user is the owner / author of this quiz post
  const isAuthor = Boolean(
    (authUser?._id && authorId && authUser._id.toString() === authorId.toString()) ||
    (authUser?.email && authorEmail && authUser.email.toLowerCase() === authorEmail.toLowerCase())
  );

  // ----------------------------------------------------------------------------
  // SYNC & PERSIST QUIZ STATE
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (initialQuiz) {
      setQuiz(initialQuiz);
      const userId = authUser?._id;

      let foundIndex = null;

      // 1. Check Backend Voted Users state
      if (userId && initialQuiz.options) {
        const userVotedOpt = initialQuiz.options.find(
          (opt) => opt.votedUsers && opt.votedUsers.some((uid) => uid.toString() === userId.toString())
        );
        if (userVotedOpt) {
          foundIndex = userVotedOpt.index;
        }
      }

      // 2. LocalStorage Persistence Fallback
      if (foundIndex === null && postId) {
        const savedIndex = localStorage.getItem(`quiz_answered_${postId}`);
        if (savedIndex !== null) {
          foundIndex = parseInt(savedIndex, 10);
        }
      }

      setSelectedOptionIndex(foundIndex);
    }
  }, [initialQuiz, authUser, postId]);

  if (!quiz || !quiz.options) return null;

  const hasAnswered = selectedOptionIndex !== null;
  // Owner directly sees the evaluated results (blue correct / orange wrong); non-author sees results after answering.
  const isShowResults = isAuthor || hasAnswered;

  // ============================================================================
  // QUIZ OPTION CLICK HANDLER
  // ============================================================================
  const handleAnswerSubmit = (opt, index) => {
    // Owner cannot vote on their own quiz & users cannot re-vote once answered
    if (isAuthor || hasAnswered) return;

    if (postId) {
      localStorage.setItem(`quiz_answered_${postId}`, index.toString());
      dispatch(voteQuizOption({ postId, optionIndex: index }));
    }

    setSelectedOptionIndex(index);
    setQuiz((prev) => {
      const updatedOptions = prev.options.map((o, idx) => {
        if (idx === index) {
          return {
            ...o,
            votes: (o.votes || 0) + 1
          };
        }
        return o;
      });

      return {
        ...prev,
        options: updatedOptions,
        totalVotes: (prev.totalVotes || 0) + 1
      };
    });
  };

  // Compute total votes across options
  const totalVotes = quiz.totalVotes || (quiz.options ? quiz.options.reduce((acc, o) => acc + (o.votes || 0), 0) : 0);

  return (
    <div className="space-y-3 select-none my-3">
      {/* Quiz Options List */}
      <div className="space-y-3">
        {quiz.options.map((opt, index) => {
          const isCorrectOption = opt.isCorrect || index === quiz.correctIndex;
          const isUserSelected = selectedOptionIndex === index;
          const isUserSelectedWrong = isUserSelected && !isCorrectOption;
          const isUserSelectedCorrect = isUserSelected && isCorrectOption;
          const optVotes = opt.votes || 0;

          // Green background & border color is shown for Author view OR when User selects the correct answer
          const isShowGreenBox = (isAuthor && isCorrectOption) || isUserSelectedCorrect;

          let boxStyle =
            "relative w-full border rounded-xl p-3.5 md:p-4 transition-all duration-200 flex items-center justify-between shadow-2xs ";

          if (!isShowResults) {
            // State A: Unanswered Quiz Option Box (Light Gray border for non-authors before selection)
            boxStyle += "bg-white border-slate-300/80 text-slate-700 hover:border-slate-400 hover:bg-slate-50/60 cursor-pointer ";
          } else if (isShowGreenBox) {
            // State B: Correct Answer Box with Green Color (Light Green Background & Solid Green Border)
            boxStyle += "bg-[#EFFFF2] border-1 border-[#22C55E] text-[#15803D] font-medium shadow-xs cursor-default ";
          } else if (isUserSelectedWrong) {
            // State C: Selected Wrong Answer Option Box (Light Red Background & Solid Red Border)
            boxStyle += "bg-[#FDF2F2] border-1 border-[#EF4444] text-[#B91C1C] font-medium shadow-xs cursor-default ";
          } else {
            // State D: Normal Answer Box (Light Gray box, no green background when user answered wrong)
            boxStyle += "bg-slate-50/80 border-slate-200 text-slate-700 cursor-default opacity-85 ";
          }

          return (
            <div
              key={opt.id || index}
              onClick={() => handleAnswerSubmit(opt, index)}
              className={boxStyle}
            >
              {/* Left Side: Icon Indicator + Option Text */}
              <div className="flex items-center gap-3 min-w-0 pr-2">

                {/* Check / Cross / Empty Checkbox */}
                <div className="shrink-0">
                  {!isShowResults ? (
                    // Default Unanswered Checkbox Box (Light Gray Square)
                    <div className="w-4 h-4 rounded-xs border border-slate-300 bg-white" />
                  ) : isCorrectOption ? (
                    isShowGreenBox ? (
                      // Solid Green Box with White Checkmark (for Author or when User selected Correct)
                      <div className="w-4.5 h-4.5 rounded-xs border border-[#22C55E] bg-[#22C55E] flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      // Normal border & check icon color (no green color when user selected wrong)
                      <div className="w-4.5 h-4.5 rounded-xs border border-[#22C55E] bg-white flex items-center justify-center text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#22C55E] stroke-[2.5]" />
                      </div>
                    )
                  ) : isUserSelectedWrong ? (
                    // Selected Wrong Answer Cross Icon Box (Red Box with White Cross)
                    <div className="w-4.5 h-4.5 rounded-xs border border-[#EF4444] bg-[#EF4444] flex items-center justify-center text-white">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    // Unselected Wrong Answer Cross Icon Box (Light Gray Cross)
                    <div className="w-4.5 h-4.5 rounded-xs border border-slate-300 bg-white flex items-center justify-center text-slate-400">
                      <X className="w-3.5 h-3.5  stroke-[2.5]" />
                    </div>
                  )}
                </div>

                {/* Option Text */}
                <span className="text-xs md:text-sm truncate leading-snug font-medium">
                  {opt.text}
                </span>
              </div>

              {/* Right Side: Vote Count Display (Shown when option is selected or creator view) */}
              {isShowResults && (
                <div className="shrink-0 flex items-center gap-1 ml-2 text-xs md:text-sm font-medium text-slate-400">
                  <span>{optVotes} {optVotes > 1 ? "responses" : "response"}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}