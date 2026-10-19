import React from "react";
import CommentItem from "./CommentItem";

export default function CommentTree({ comments = [], postId }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-slate-400 font-medium select-none">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <CommentItem
          key={comment._id || comment.id || index}
          comment={comment}
          postId={postId}
          level={0}
          isLast={index === comments.length - 1}
        />
      ))}
    </div>
  );
}
