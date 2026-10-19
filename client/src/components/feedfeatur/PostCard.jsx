import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import FeedHeader from "../feed/FeedHeader";
import { updatePostApi } from "../../services/postService";

export default function PostCard({ post, onPostUpdated }) {
  const authUser = useSelector((state) => state.user?.user);

  // Author check: compare current logged-in user with post.author
  const isAuthor = useMemo(() => {
    if (!post || !authUser) return false;

    const currentUserId = authUser._id || authUser.id ? String(authUser._id || authUser.id) : "";
    const currentUserEmail = authUser.email ? String(authUser.email).toLowerCase().trim() : "";

    const rawAuthorId = post?.authorId || post?.author?.id || post?.author?._id || (typeof post?.author === 'string' ? post.author : "");
    const postAuthorId = rawAuthorId ? String(rawAuthorId) : "";
    const postAuthorEmail = post?.author?.email ? String(post.author.email).toLowerCase().trim() : "";

    if (currentUserId && postAuthorId && currentUserId === postAuthorId) return true;
    if (currentUserEmail && postAuthorEmail && currentUserEmail === postAuthorEmail) return true;

    return false;
  }, [authUser, post]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || post?.body || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditClick = () => {
    setEditedContent(post?.content || post?.body || "");
    setIsEditing(true);
  };

  const handleSavePost = async () => {
    if (!editedContent.trim()) return;

    try {
      setIsSubmitting(true);
      const responseData = await updatePostApi(post?.id || post?._id, editedContent);

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

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 mb-4">
      {/* Header pass with Edit Callback ONLY if logged in user is the author */}
      <FeedHeader
        author={post?.author || { name: "User" }}
        time={post?.createdAt || post?.time}
        type={post?.type || "QUESTION"}
        label={post?.label}
        onEdit={isAuthor ? handleEditClick : undefined}
      />

      {/* Conditional Rendering: Edit Form vs Normal Content */}
      {isEditing ? (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Edit your post..."
          />
          <div className="flex justify-end gap-2 mt-2">
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
              className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-slate-700">
          {post?.content || post?.body}
        </div>
      )}
    </div>
  );
}