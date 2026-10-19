import React, { useState } from "react";
import { Send } from "lucide-react";
import Avatar from "../common/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { CURRENT_USER } from "../../data/users";
import { createTopLevelComment } from "../../features/comments/comments.thunk";

export default function AddCommentBox({ postId, className = "" }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isSubmitting } = useSelector((state) => state.comments);

  const [text, setText] = useState("");

  const displayName = user
    ? (user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim())
    : CURRENT_USER.name;
  const avatar = user?.avatar || CURRENT_USER.avatar;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const commentBody = text.trim();

    if (postId) {
      dispatch(createTopLevelComment({ postId, body: commentBody }));
    }

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-gray-200/90 rounded-[18px] p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex gap-3 items-center select-none ${className}`}
    >
      <Avatar src={avatar} name={displayName} size="md" className="shrink-0" />
      
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add to the discussion..."
          className="w-full bg-[#F2F2F2] focus:bg-white border border-gray-200 focus:border-[#0096FF] focus:ring-2 focus:ring-[#0096FF]/20 rounded-full pl-4 pr-12 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition duration-150"
        />
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Post Comment"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
