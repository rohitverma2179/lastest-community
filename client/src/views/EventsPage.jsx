'use client';

import React from "react";
import { ProfileCard, QuickMenu, LearnCard, InviteCard } from "../components/layout/LeftSidebar";
import EventHeaderBanner from "../components/events/EventHeaderBanner";
import EventFilterTabs from "../components/events/EventFilterTabs";
import EventGrid from "../components/events/EventGrid";
import QuestionCard from "../components/feed/QuestionCard";
import CreateEventModal from "../components/events/CreateEventModal";

// ==============================================================================
// PRODUCTION EVENTS PAGE COMPONENT (Left Sidebar + Expanded Main Content Area)
// ==============================================================================

export default function EventsPage() {
  return (
    <div className="py-3 sm:py-5 lg:py-6 w-full flex-1 min-h-screen px-2  sm:px-0">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6 items-start">
        {/* Column 1: Left Sidebar (Visible on Desktop lg+, Sticky + Scrollable with Hidden Scrollbar) */}
        <div className="hidden lg:block w-full lg:w-[260px] xl:w-[280px] shrink-0 space-y-3 lg:space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto transition-all duration-200 scrollbar-hide">
          <ProfileCard />
          <QuickMenu />
          <LearnCard />
          <InviteCard />
        </div>

        {/* Column 2: Full Width Main Content Area (Events Section) */}
        <div className="w-full flex-1 space-y-4 sm:space-y-6 min-w-0">
          {/* 1. Top Section Banner */}
          <EventHeaderBanner />

          {/* 2. Category Filter Bar */}
          <EventFilterTabs />

          {/* 3. Responsive Events Grid */}
          <EventGrid />
        </div>
      </div>

      {/* Modals integration */}
      <QuestionCard />
      <CreateEventModal />
    </div>
  );
}