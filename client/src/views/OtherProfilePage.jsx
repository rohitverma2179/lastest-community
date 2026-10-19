'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { OtherProfileHeaderCard } from "../components/profile";
import FeedFilter from "../components/feed/FeedFilter";
import FeedList from "../components/feed/FeedList";
import { DailyMission, UpcomingEvent, TopContributors } from "../components/layout/RightSidebar";
import { MOCK_USERS } from "../data/users";
import { TOP_CONTRIBUTORS } from "../data/contributors";
import api from "../utils/axios";

/**
 * OtherProfilePage Component
 * Full page for viewing ANOTHER user's profile:
 * - Top Profile Header (Cover, Avatar, Name, Role, Stats, Bio, Follow/Message buttons, 3-dots menu with Block/Report)
 * - 2-Column Responsive Layout below:
 *   - Center / Left: Questions & Feed filter + Only this user's posts
 *   - Right: Right Sidebar widgets (hidden on mobile, visible on tablet, laptop & desktop)
 */
export default function OtherProfilePage() {
  const { id } = useParams();
  const { items: posts } = useSelector((state) => state.posts);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeSort, setActiveSort] = useState("HOT");
  const [serverUser, setServerUser] = useState(null);

  // Fetch full user details from server if available
  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/auth/user/${id}`);
        if (response.data?.success && response.data?.user && isMounted) {
          setServerUser(response.data.user);
        }
      } catch (err) {
        // User not found in database or is offline mock, fallback to client state
        if (isMounted) {
          setServerUser(null);
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Determine user details from server, id parameter, mock data, or loaded posts
  const targetUser = useMemo(() => {
    // 0. If server returned user with populated coverPhoto / banner
    if (serverUser) {
      return {
        id: serverUser._id || serverUser.id || id,
        _id: serverUser._id || serverUser.id || id,
        name: serverUser.name || `${serverUser.firstName || ""} ${serverUser.lastName || ""}`.trim() || "Community Member",
        avatar: serverUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
        coverPhoto: serverUser.coverPhoto || serverUser.banner || "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
        role: serverUser.designation || serverUser.title || serverUser.role || "Community Member",
        company: serverUser.company || "Hindustan Unilever",
        location: serverUser.city && serverUser.country ? `${serverUser.city}, ${serverUser.country}` : serverUser.location || serverUser.city || serverUser.country || "Delhi, India",
        badge: serverUser.badge || (serverUser.reputation > 5000 ? "LEGEND" : "EXPLORER"),
        followers: typeof serverUser.followers === "number" ? serverUser.followers : 402,
        following: typeof serverUser.following === "number" ? serverUser.following : 10,
        bio: serverUser.bio || serverUser.description || "Active member of the community. Sharing insights, questions, and resources.",
        reputation: serverUser.reputation || 100,
        streak: serverUser.streak || 7,
      };
    }

    // 1. Check in mock users data
    const mockFound = MOCK_USERS.find(
      (u) =>
        String(u.id) === String(id) ||
        String(u._id) === String(id) ||
        String(u.name).toLowerCase() === String(id).toLowerCase() ||
        String(u.name).toLowerCase().replace(/\s+/g, "-") === String(id).toLowerCase()
    );
    if (mockFound) {
      return {
        ...mockFound,
        coverPhoto: mockFound.coverPhoto || mockFound.banner || "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
        badge: mockFound.badge || "LEGEND",
      };
    }

    // 2. Check in top contributors
    const contributorFound = TOP_CONTRIBUTORS.find(
      (c) =>
        String(c.rank) === String(id) ||
        String(c.id) === String(id) ||
        String(c.name).toLowerCase() === String(id).toLowerCase() ||
        String(c.name).toLowerCase().replace(/\s+/g, "-") === String(id).toLowerCase()
    );
    if (contributorFound) {
      return {
        id: contributorFound.id || id,
        name: contributorFound.name,
        avatar: contributorFound.avatar,
        coverPhoto: contributorFound.coverPhoto || contributorFound.banner || "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
        role: "Top Contributor • ISO Specialist",
        company: "Hindustan Unilever",
        location: "Mumbai, India",
        badge: "PIONEER",
        followers: 402,
        following: 10,
        bio: `Active community contributor with ${contributorFound.points} points. Passionate about ISO standards, quality management, and sustainability.`,
      };
    }

    // 3. Check in loaded posts
    const postFound = posts?.find(
      (p) =>
        String(p.authorId) === String(id) ||
        String(p.author?._id) === String(id) ||
        String(p.author?.id) === String(id) ||
        (typeof p.author === "string" && p.author === id) ||
        String(p.author?.name).toLowerCase().replace(/\s+/g, "-") === String(id).toLowerCase() ||
        String(p.author?.name).toLowerCase() === String(id).toLowerCase()
    );

    if (postFound?.author && typeof postFound.author === "object") {
      const author = postFound.author;
      return {
        id: author._id || author.id || id,
        name: author.name || `${author.firstName || ""} ${author.lastName || ""}`.trim(),
        avatar: author.avatar,
        coverPhoto: author.coverPhoto || author.banner || postFound.coverPhoto || "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
        role: author.designation || author.title || author.role || "Community Member",
        company: author.company || "Hindustan Unilever",
        location: author.location || (author.city && author.country ? `${author.city}, ${author.country}` : "Delhi, India"),
        badge: author.badge || (author.reputation > 5000 ? "LEGEND" : "EXPLORER"),
        followers: 402,
        following: 10,
        bio:
          author.bio ||
          "Active member of the community. Sharing insights, questions, and resources.",
      };
    }

    // 4. Clean fallback by decoding name if id is a name string
    const decodedName = decodeURIComponent(id || "Member")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      id: id || "other_user",
      name: decodedName,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&h=500&q=80",
      role: "ISO Specialist • Community Member",
      company: "Hindustan Unilever",
      location: "Delhi, India",
      badge: "EXPLORER",
      followers: 402,
      following: 10,
      bio: "Active member of the community. Sharing insights, questions, and resources.",
    };
  }, [id, posts, serverUser]);

  const userName = targetUser?.name || "This user";

  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen space-y-5">
      {/* 1. Top Other User Profile Banner & Info Header */}
      <OtherProfileHeaderCard user={targetUser} />

      {/* 2. Responsive 2-Column Content Grid */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-start">
        {/* Main Feed Column (Only posts by this specific user) */}
        <div className="flex-1 w-full min-w-0 space-y-4">
          <FeedFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            className="mb-2"
          />
          <FeedList
            activeCategory={activeCategory}
            activeSort={activeSort}
            onlyUserPosts={true}
            targetUser={targetUser}
            userId={id}
            emptyTitle={`No posts yet`}
            emptyMessage={`${userName} hasn't posted any questions, resources, or discussions yet.`}
          />
        </div>

        {/* Right Sidebar Widgets (Hidden on mobile, visible on tablet, laptop & desktop) */}
        <div className="hidden md:block md:w-[260px] lg:w-[280px] xl:w-[300px] shrink-0 space-y-3 lg:space-y-4 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto scrollbar-hide">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
        </div>
      </div>
    </div>
  );
}
