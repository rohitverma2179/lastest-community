'use client';

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileHeaderCard } from "../components/profile";
import FeedFilter from "../components/feed/FeedFilter";
import FeedList from "../components/feed/FeedList";
import { DailyMission, UpcomingEvent, TopContributors } from "../components/layout/RightSidebar";

/**
 * ProfilePage Component
 * Full production Profile page:
 * - Top Profile Header Card (Cover, Avatar with Legend badge, Name, Role, Stats, Bio, Follow/Message buttons)
 * - 2-Column Responsive Layout below:
 *   - Center / Left: Questions & Feed filter + Post list
 *   - Right: DailyMission, UpcomingEvent, TopContributors widgets
 */
export default function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeSort, setActiveSort] = useState("HOT");

  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen space-y-5">
      {/* 1. Top Profile Banner & Info Header */}
      <ProfileHeaderCard user={user} />

      {/* 2. Responsive 2-Column Content Grid */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-start">
        {/* Main Feed Column (Questions, Resources, Posts ONLY by this user) */}
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
            targetUser={user}
            emptyTitle="No posts yet"
            emptyMessage="You haven't posted any questions, resources, or discussions yet."
          />
        </div>

        {/* Right Sidebar Widgets with Independent Scroll (Hidden on mobile, visible on tablet, laptop & desktop) */}
        <div className="hidden md:block md:w-[260px] lg:w-[280px] xl:w-[300px] shrink-0 space-y-3 lg:space-y-4 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto scrollbar-hide">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
        </div>
      </div>
    </div>
  );
}