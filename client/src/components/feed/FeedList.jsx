import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageSquare } from "lucide-react";
import FeedCard from "./FeedCard";
import FeedSkeleton from "../skeleton/FeedSkeleton";
import { fetchPosts } from "../../features/posts/posts.thunk";
import { toggleFollow, updatePostLikesFromSocket } from "../../features/posts/posts.slice";
import { socket } from "../../utils/socket";

export default function FeedList({
  activeCategory = "ALL",
  activeSort = "HOT",
  onlyUserPosts = false,
  targetUser = null,
  userId = null,
  emptyTitle,
  emptyMessage,
}) {
  const dispatch = useDispatch();
  const { items: posts, isLoading } = useSelector((state) => state.posts);
  const authUser = useSelector((state) => state.user?.user);

  useEffect(() => {
    dispatch(fetchPosts());

    // Listen to real-time like updates from Socket.io server
    const handleLikeUpdate = (data) => {
      if (data && data.postId) {
        dispatch(updatePostLikesFromSocket(data));
      }
    };

    socket.on("post_like_updated", handleLikeUpdate);

    return () => {
      socket.off("post_like_updated", handleLikeUpdate);
    };
  }, [dispatch]);

  // Toggle follow status local mockup handler
  const handleFollowToggle = (postId) => {
    dispatch(toggleFollow(postId));
  };

  // Filter and Sort calculation
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // User / Author filter (Used in Profile page)
    if (onlyUserPosts || userId || targetUser) {
      const activeUser = targetUser || authUser;
      const currentUserId = String(userId || activeUser?._id || activeUser?.id || "").trim();
      const currentUserEmail = String(activeUser?.email || "").toLowerCase().trim();
      const currentUserName = String(
        activeUser?.name ||
        (activeUser?.firstName ? `${activeUser.firstName} ${activeUser.lastName || ""}` : "") ||
        "Kirti Rajput"
      ).toLowerCase().trim();

      result = result.filter((post) => {
        if (!post) return false;

        const postAuthorId = String(
          post.authorId ||
          post.author?._id ||
          post.author?.id ||
          (typeof post.author === "string" ? post.author : "") ||
          ""
        ).trim();

        const postAuthorEmail = String(post.author?.email || post.authorEmail || "").toLowerCase().trim();
        
        const postAuthorName = String(
          post.author?.name ||
          (post.author?.firstName ? `${post.author.firstName} ${post.author.lastName || ""}` : "") ||
          post.authorName ||
          ""
        ).toLowerCase().trim();

        // 1. Strict ID Match
        if (currentUserId && postAuthorId && currentUserId === postAuthorId) {
          return true;
        }

        // 2. Strict Email Match
        if (currentUserEmail && postAuthorEmail && currentUserEmail === postAuthorEmail) {
          return true;
        }

        // 3. Name Match
        if (currentUserName && postAuthorName && currentUserName === postAuthorName) {
          return true;
        }

        // 4. Fallback for dynamic posts created in the active session
        if (post.isDynamic && (post.author?.isCurrentUser || (!postAuthorId && !postAuthorEmail))) {
          return true;
        }

        return false;
      });
    }

    // Category Filter
    if (activeCategory !== "ALL") {
      result = result.filter((post) => post.type === activeCategory);
    }

    // Sort calculation
    result.sort((a, b) => {
      // 1. Prioritize dynamic posts (database) over static ones (mockups)
      const dynA = a.isDynamic ? 1 : 0;
      const dynB = b.isDynamic ? 1 : 0;
      if (dynA !== dynB) {
        return dynB - dynA; // Dynamic comes first
      }

      // 2. If both are dynamic, sort chronologically descending (newest first) so latest is always at the top
      if (a.isDynamic) {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      }

      // 3. If both are static, sort by likes (for HOT view) or date (for NEW view)
      if (activeSort === "HOT") {
        const likesDiff = (b.likes || 0) - (a.likes || 0);
        if (likesDiff !== 0) return likesDiff;
      }

      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });

    return result;
  }, [posts, activeCategory, activeSort, onlyUserPosts, targetUser, userId, authUser]);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (filteredAndSortedPosts.length === 0) {
    return (
      <div className="bg-white border border-gray-200/90 rounded-2xl p-10 text-center space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] select-none">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0096ff] flex items-center justify-center mx-auto">
          <MessageSquare className="w-6 h-6 stroke-[2]" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          {emptyTitle || "No posts found"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          {emptyMessage ||
            (activeCategory !== "ALL"
              ? `No ${activeCategory.toLowerCase()} posts found in this category.`
              : "No questions, resources, or discussions posted yet.")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAndSortedPosts.map((post) => (
        <FeedCard
          key={post.id}
          post={post}
          onFollowToggle={() => handleFollowToggle(post.id)}
        />
      ))}
    </div>
  );
}
