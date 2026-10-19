import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../common/Card";
import FeedHeader from "./FeedHeader";
import FeedBody from "./FeedBody";
import FeedFooter from "./FeedFooter";
import { updatePostApi, deletePostApi } from "../../services/postService";
import { updatePostSuccess, deletePostSuccess } from "../../features/posts/posts.slice";
import { removeEvent } from "../../features/events/eventsSlice";

// Attachments
import ResourceCard from "./ResourceCard";
import PollCard from "./PollCard";
import QuizCard from "./QuizCard";
import EventCard from "./EventCard";
import JobCard from "./JobCard";
import QuestionCard from "./QuestionCard";

export default function FeedCard({ post, onFollowToggle, onPostUpdated }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user?.user);

  // Author check: compare current logged-in user with post.author
  const isAuthor = useMemo(() => {
    if (!post || !authUser) return false;

    const currentUserId = authUser._id || authUser.id ? String(authUser._id || authUser.id) : "";
    const currentUserEmail = authUser.email ? String(authUser.email).toLowerCase().trim() : "";

    const rawAuthorId = post.authorId || post.author?.id || post.author?._id || (typeof post.author === 'string' ? post.author : "");
    const postAuthorId = rawAuthorId ? String(rawAuthorId) : "";
    const postAuthorEmail = post.author?.email ? String(post.author.email).toLowerCase().trim() : "";

    // 1. Strict ID Match
    if (currentUserId && postAuthorId && currentUserId === postAuthorId) {
      return true;
    }

    // 2. Strict Email Match
    if (currentUserEmail && postAuthorEmail && currentUserEmail === postAuthorEmail) {
      return true;
    }

    // Default: Not the author
    return false;
  }, [authUser, post]);

  const [displayTitle, setDisplayTitle] = useState(post?.title || "");
  const [displayContent, setDisplayContent] = useState(post?.content || post?.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(displayTitle);
  const [editedContent, setEditedContent] = useState(displayContent);

  // Poll & Quiz options edit state
  const [editedPollOptions, setEditedPollOptions] = useState(
    post?.poll?.options ? post.poll.options.map((o) => o.text) : ["", ""]
  );
  const [editedQuizOptions, setEditedQuizOptions] = useState(
    post?.quiz?.options ? post.quiz.options.map((o) => o.text) : ["", ""]
  );
  const [editedQuizCorrectIndex, setEditedQuizCorrectIndex] = useState(
    post?.quiz?.correctIndex ?? 0
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Validation errors state for post editing
  const [editErrors, setEditErrors] = useState({});

  // Helper check for Poll or Quiz type posts (KYU: Poll & Quiz me description field nahi hota)
  const isPollOrQuiz = post?.type === "POLL" || post?.type === "QUIZ" || Boolean(post?.poll) || Boolean(post?.quiz);

  useEffect(() => {
    setDisplayTitle(post?.title || "");
    setDisplayContent(post?.content || post?.body || "");
    if (post?.poll?.options) {
      setEditedPollOptions(post.poll.options.map((o) => o.text));
    }
    if (post?.quiz?.options) {
      setEditedQuizOptions(post.quiz.options.map((o) => o.text));
      setEditedQuizCorrectIndex(post.quiz.correctIndex ?? 0);
    }
  }, [post]);

  const handleEditClick = () => {
    setEditedTitle(displayTitle);
    setEditedContent(displayContent);
    setEditErrors({}); // KYU: Previous validation errors clear karne ke liye
    if (post?.poll?.options) {
      setEditedPollOptions(post.poll.options.map((o) => o.text));
    }
    if (post?.quiz?.options) {
      setEditedQuizOptions(post.quiz.options.map((o) => o.text));
      setEditedQuizCorrectIndex(post.quiz.correctIndex ?? 0);
    }
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const postId = post?.id || post?._id;
        const res = await deletePostApi(postId);
        dispatch(deletePostSuccess(postId));

        // Dynamic event sync delete from Events state
        const eventId = post.event?.id || post.raw?.eventRef?._id || post.raw?.eventRef;
        if (eventId) {
          dispatch(removeEvent(eventId));
        }
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  // ==============================================================================
  // STEP 1: EDIT FORM VALIDATION FUNCTION
  // ==============================================================================
  // KYU (Why):
  //   1. Title length Max 120 characters aur Min 5 characters check karne ke liye.
  //   2. Content / Description length Minimum 50 characters check karne ke liye (Poll & Quiz ko chhod kar).
  //   3. User agar invalid ya chota text likhe to red error messages show karne ke liye.
  // ==============================================================================
  const validateEdit = () => {
    const newErrors = {};

    // Title validation check
    if (!editedTitle.trim()) {
      newErrors.title = "Question / Title is required.";
    } else if (editedTitle.trim().length < 5) {
      newErrors.title = "Question must be at least 5 characters.";
    } else if (editedTitle.trim().length > 120) {
      newErrors.title = "Question cannot exceed 120 characters.";
    }

    // Content validation check (KYU: POLL aur QUIZ me description field nahi hota, isliye ise skip karenge)
    if (!isPollOrQuiz) {
      if (!editedContent.trim()) {
        newErrors.content = "Details are required.";
      } else if (editedContent.trim().length < 50) {
        newErrors.content = "Details must be at least 50 characters.";
      }
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==============================================================================
  // STEP 2: SAVE POST SUBMISSION HANDLER
  // ==============================================================================
  // KYU (Why):
  //   Form submit karne par sabse pehle validateEdit() execute hoga.
  //   Validation pass hone par hi API call trigger karke post update karenge.
  // ==============================================================================
  const handleSavePost = async () => {
    // Step 2a: Validate before submitting
    if (!validateEdit()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        title: editedTitle,
        content: isPollOrQuiz ? editedTitle : editedContent,
      };

      if (post.type === "POLL" || post.poll) {
        payload.pollOptions = editedPollOptions;
      }

      if (post.type === "QUIZ" || post.quiz) {
        payload.quizOptions = editedQuizOptions;
        payload.quizCorrectIndex = editedQuizCorrectIndex;
      }

      const responseData = await updatePostApi(post?.id || post?._id, payload);

      // 1. Instant local UI update
      setDisplayTitle(editedTitle);
      setDisplayContent(editedContent);

      // 2. Redux store update
      if (responseData?.post) {
        dispatch(updatePostSuccess(responseData.post));
      }

      if (onPostUpdated) {
        onPostUpdated(responseData?.post || responseData);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine header label based on type
  const getHeaderLabel = () => {
    switch (post.type) {
      case "RESOURCE":
        return "Resources";
      case "QUESTION":
        return post.actionLabel || "Questions";
      case "POLL":
        return "Poll";
      case "QUIZ":
        return "Quiz";
      case "EVENT":
        return "Event";
      case "JOB":
        return "Job";
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-4 md:p-5 select-none bg-white">
      {/* Header - Pass onEdit and onDelete if current logged-in user is the Author */}
      <FeedHeader
        author={post.author}
        time={post.time}
        type={post.type}
        label={getHeaderLabel()}
        onFollowToggle={onFollowToggle}
        onEdit={isAuthor ? handleEditClick : undefined}
        onDelete={isAuthor ? handleDeleteClick : undefined}
      />

      {/* Body / Edit View */}
      {isEditing ? (
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">

          {/* ================================================================== */}
          {/* STEP 3: TITLE INPUT WITH CHARACTER COUNTER (0/120) & VALIDATION */}
          {/* KYU (Why): */}
          {/*   Title ki max limit 120 characters show karne aur validation error dikhane ke liye */}
          {/* ================================================================== */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-600">
                Title / Question
              </label>
              {/* Counter: e.g. 0/120 */}
              <span className={`text-[11px] font-semibold ${editedTitle.length >= 120 ? "text-red-500 font-bold" : "text-slate-400"}`}>
                {editedTitle.length}/120
              </span>
            </div>
            <input
              type="text"
              maxLength={120}
              value={editedTitle}
              onChange={(e) => {
                const val = e.target.value;
                setEditedTitle(val);
                if (editErrors.title && val.trim().length >= 5 && val.trim().length <= 120) {
                  setEditErrors((prev) => ({ ...prev, title: null }));
                }
              }}
              className={`w-full p-2 text-sm font-bold text-slate-800 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-sky-500 transition ${editErrors.title ? "border-red-400 ring-1 ring-red-400 bg-red-50/20" : "border-slate-300"
                }`}
              placeholder="Edit title..."
            />
            {/* Validation Error Message */}
            {editErrors.title && (
              <p className="text-[11px] text-red-500 font-semibold mt-1">{editErrors.title}</p>
            )}
          </div>

          {/* ================================================================== */}
          {/* STEP 4: CONTENT TEXTAREA WITH CHARACTER COUNTER (0 / Min 50 chars) & VALIDATION */}
          {/* KYU (Why): */}
          {/*   POLL aur QUIZ posts me description field nahi hota, isliye unme yeh input dikhana nahi hai */}
          {/* ================================================================== */}
          {!isPollOrQuiz && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-600">
                  Content / Description
                </label>
                {/* Counter: e.g. 0 / Min 50 chars */}
                <span className={`text-[11px] font-semibold ${editedContent.trim().length > 0 && editedContent.trim().length < 50 ? "text-amber-500 font-bold" : "text-slate-400"}`}>
                  {editedContent.length} / Min 50 chars
                </span>
              </div>
              <textarea
                value={editedContent}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditedContent(val);
                  if (editErrors.content && val.trim().length >= 50) {
                    setEditErrors((prev) => ({ ...prev, content: null }));
                  }
                }}
                className={`w-full p-2.5 text-sm bg-white border rounded-lg outline-none focus:ring-2 focus:ring-sky-500 transition ${editErrors.content ? "border-red-400 ring-1 ring-red-400 bg-red-50/20" : "border-slate-300"
                  }`}
                rows={3}
                placeholder="Edit content..."
              />
              {/* Validation Error Message */}
              {editErrors.content && (
                <p className="text-[11px] text-red-500 font-semibold mt-1">{editErrors.content}</p>
              )}
            </div>
          )}

          {/* Poll Options Editing */}
          {(post.type === "POLL" || post.poll) && (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <label className="block text-xs  text-slate-700">
                Poll Options:
              </label>
              {editedPollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const updated = [...editedPollOptions];
                    updated[idx] = e.target.value;
                    setEditedPollOptions(updated);
                  }}
                  className="w-full p-2 text-xs bg-white border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder={`Option ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Quiz Options Editing */}
          {(post.type === "QUIZ" || post.quiz) && (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700">
                Quiz Options & Correct Answer:
              </label>
              {editedQuizOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correctQuiz-${post.id}`}
                    checked={editedQuizCorrectIndex === idx}
                    onChange={() => setEditedQuizCorrectIndex(idx)}
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...editedQuizOptions];
                      updated[idx] = e.target.value;
                      setEditedQuizOptions(updated);
                    }}
                    className="w-full p-2 text-xs bg-white border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder={`Option ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1 border-t border-slate-200">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-md"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSavePost}
              disabled={isSubmitting}
              className="px-4 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-md disabled:opacity-50 hover:bg-sky-700 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <FeedBody title={post.type === "EVENT" ? ` ${displayTitle}` : displayTitle} content={displayContent} tags={post.tags}>
          {/* Render specific attachment card based on post type */}
          {post.type === "RESOURCE" && post.attachment && (
            <ResourceCard attachment={post.attachment} />
          )}

          {post.type === "POLL" && post.poll && (
            <PollCard postId={post.id} poll={post.poll} />
          )}

          {post.type === "QUIZ" && post.quiz && (
            <QuizCard postId={post.id} quiz={post.quiz} authorId={post.authorId || post.author?.id || post.author?._id} authorEmail={post.author?.email} />
          )}

          {post.type === "EVENT" && post.event && (
            <EventCard event={post.event} />
          )}

          {post.type === "JOB" && post.job && (
            <JobCard job={post.job} title={post.title} content={post.content} />
          )}
        </FeedBody>
      )}

      {/* Footer */}
      <FeedFooter
        postId={post.id}
        likes={post.likes}
        hasLiked={post.hasLiked}
        comments={post.comments}
        downloads={post.downloads}
        votes={post.poll?.totalVotes}
        responses={post.type === "QUIZ" ? (post.quiz?.totalVotes ?? post.responses ?? 0) : undefined}
        registered={post.type === "EVENT" ? post.registered : undefined}
        applied={post.applied}
        isBookmarked={post.isBookmarked}
        type={post.type}
        actionLabel={post.actionLabel}
        post={post}
      />
    </Card>
  );
}
