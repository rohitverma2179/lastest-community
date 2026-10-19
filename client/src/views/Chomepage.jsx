'use client';

import React, { useState } from "react";
import { ProfileCard, QuickMenu, LearnCard, InviteCard } from "../components/layout/LeftSidebar";
import { DailyMission, UpcomingEvent, TopContributors, Advertisement } from "../components/layout/RightSidebar";
import FeedFilter from "../components/feed/FeedFilter";
import FeedList from "../components/feed/FeedList";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeSort, setActiveSort] = useState("HOT");

  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen">
      <div className="community-grid">
        {/* Column 1: Left Sidebar (Visible on lg screens and up, e.g. Desktop / TV) */}
        <div className="community-col-left space-y-3 lg:space-y-4">
          <ProfileCard />
          <QuickMenu />
          <LearnCard />
          <InviteCard />
        </div>

        {/* Column 2: Center Social Feed (Visible on all screens: mobile, tablet, desktop, TV) */}
        <div className="community-col-main space-y-3 sm:space-y-4 min-w-0">
          <FeedFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
          <FeedList
            activeCategory={activeCategory}
            activeSort={activeSort}
          />
        </div>

        {/* Column 3: Right Sidebar (Visible on md screens and up: tablet, laptop, desktop, TV) */}
        <div className="community-col-right space-y-3 lg:space-y-4">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
          {/* <Advertisement /> */}
        </div>
      </div>
    </div>
  );
}


