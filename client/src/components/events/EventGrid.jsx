import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
// import { fetchEvents } from "../../features/events/events.thunk";
import { fetchEvents } from "../../features/events/events.thunk";

// ==============================================================================
// EVENTS GRID CONTAINER COMPONENT
// ==============================================================================
// 3 Columns responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
// Filtered dynamically based on selectedCategory state in Redux eventsSlice
// ==============================================================================
export default function EventGrid() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events?.events || []);
  const selectedCategory = useSelector((state) => state.events?.selectedCategory || "All");

  // console.log("EventGrid events: ", events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events.filter((e) => {
    if (!selectedCategory || selectedCategory === "All") return true;
    const target = selectedCategory.toLowerCase().trim();

    const matchDomain = e.domain && e.domain.toLowerCase().trim() === target;
    const matchSector = e.sector && e.sector.toLowerCase().trim() === target;
    const matchCategory = e.category && e.category.toLowerCase().trim() === target;
    const matchTags = Array.isArray(e.tags) && e.tags.some((t) => typeof t === "string" && t.toLowerCase().trim() === target);

    return matchDomain || matchSector || matchCategory || matchTags;
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center my-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          No events found for "{selectedCategory}"
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Check back later or select "All" to see all available sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 my-4 sm:my-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id || event._id} event={event} />
      ))}
    </div>
  );
}
