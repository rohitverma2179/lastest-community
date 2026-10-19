import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEventThunk, toggleUpvoteEventThunk, registerEventThunk, fetchEventOptions } from "./events.thunk";
import { createTopLevelComment } from "../comments/comments.thunk";

const initialState = {
  events: [],
  selectedCategory: "All",
  isCreateModalOpen: false,
  formatOptions: ["Webinar", "AMA", "Live clinic"],
  domainOptions: ["Quality", "Environment", "Health", "Safety", "Welfare", "ESG", "Sustainability"],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleBookmarkEvent: (state, action) => {
      if (!state.events) return;
      const targetId = String(action.payload);
      const event = state.events.find((e) => String(e._id || e.id) === targetId || String(e.postId) === targetId || String(e.postRef) === targetId);
      if (event) {
        event.isBookmarked = !event.isBookmarked;
      }
    },
    toggleUpvoteEvent: (state, action) => {
      if (!state.events) return;
      const targetId = String(action.payload);
      const event = state.events.find(
        (e) =>
          String(e._id || e.id) === targetId ||
          String(e.postId) === targetId ||
          String(e.postRef) === targetId ||
          String(e.postRef?._id) === targetId
      );
      if (event) {
        if (!event.stats) event.stats = { upvotes: 0, comments: 0, applied: 0 };
        if (event.hasUpvoted) {
          event.stats.upvotes = Math.max(0, event.stats.upvotes - 1);
          event.hasUpvoted = false;
        } else {
          event.stats.upvotes = (event.stats.upvotes || 0) + 1;
          event.hasUpvoted = true;
        }
      }
    },
    updateEventLikesFromSocket: (state, action) => {
      if (!state.events) return;
      const { eventId, postId, upvotes } = action.payload;
      const event = state.events.find(
        (e) =>
          (eventId && String(e._id || e.id) === String(eventId)) ||
          (postId &&
            (String(e._id || e.id) === String(postId) ||
              String(e.postId) === String(postId) ||
              String(e.postRef) === String(postId) ||
              String(e.postRef?._id) === String(postId)))
      );
      if (event && typeof upvotes === "number") {
        if (!event.stats) event.stats = { applied: 0, upvotes: 0, comments: 0 };
        event.stats.upvotes = upvotes;
      }
    },
    bumpEventToTopOnComment: (state, action) => {
      if (!state.events) return;
      const { eventId, postId, commentsCount } = action.payload;
      const index = state.events.findIndex(
        (e) =>
          (eventId && String(e._id || e.id) === String(eventId)) ||
          (postId &&
            (String(e._id || e.id) === String(postId) ||
              String(e.postId) === String(postId) ||
              String(e.postRef) === String(postId) ||
              String(e.postRef?._id) === String(postId)))
      );
      if (index !== -1) {
        const event = state.events[index];
        if (!event.stats) event.stats = { applied: 0, upvotes: 0, comments: 0 };
        if (typeof commentsCount === "number") {
          event.stats.comments = commentsCount;
        } else {
          event.stats.comments = (event.stats.comments || 0) + 1;
        }
        // Move to the very TOP of the events list!
        state.events.splice(index, 1);
        state.events.unshift(event);
      }
    },
    registerEvent: (state, action) => {
      if (!state.events) return;
      const event = state.events.find((e) => String(e._id || e.id) === String(action.payload));
      if (event) {
        event.buttonType = "JOIN_NOW";
        event.buttonText = "Join Now";
        if (event.stats) event.stats.applied = (event.stats.applied || 0) + 1;
      }
    },
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
    addEvent: (state, action) => {
      if (!state.events) state.events = [];
      const payload = action.payload;
      const created = payload?.event || payload;
      const linkedPostId = payload?.post?._id ? String(payload.post._id) : (created?.postRef || created?._id || created?.id);
      const normalized = {
        ...created,
        id: created._id || created.id || Date.now(),
        postId: linkedPostId,
        title: created.title,
        description: created.description,
        eventDate: created.eventDate || created.when || "Upcoming",
        attendeeInfo: created.attendeeInfo || created.format || "Anyone can join",
        badges: created.badges && created.badges.length > 0 ? created.badges : ["UPCOMING"],
        headerColor: created.headerColor || "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]",
        buttonType: created.buttonType || "REGISTER_FREE",
        buttonText: created.buttonText || "Register Free",
        hasUpvoted: false,
        isBookmarked: false,
        stats: {
          applied: created.stats?.applied || 0,
          upvotes: created.stats?.upvotes || 0,
          comments: created.stats?.comments || 0
        }
      };
      state.events.unshift(normalized);
      state.isCreateModalOpen = false;
    },
    removeEvent: (state, action) => {
      const eventId = action.payload;
      if (!state.events) return;
      state.events = state.events.filter((e) => String(e._id || e.id) !== String(eventId));
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch events from API
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          const apiEvents = action.payload.map(e => ({ ...e, id: e._id || e.id }));
          state.events = [...apiEvents];
        }
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Event Thunk
      .addCase(createEventThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        const created = payload?.event || payload;
        const linkedPostId = payload?.post?._id ? String(payload.post._id) : (created?.postRef || created?._id || created?.id);
        const normalized = {
          ...created,
          id: created._id || created.id || Date.now(),
          postId: linkedPostId,
          title: created.title,
          description: created.description,
          eventDate: created.eventDate || created.when || "Upcoming",
          attendeeInfo: created.attendeeInfo || created.format || "Anyone can join",
          badges: created.badges && created.badges.length > 0 ? created.badges : ["UPCOMING"],
          headerColor: created.headerColor || "from-[#0052D4] via-[#4364F7] to-[#6FB1FC]",
          buttonType: created.buttonType || "REGISTER_FREE",
          buttonText: created.buttonText || "Register Free",
          hasUpvoted: false,
          isBookmarked: false,
          stats: {
            applied: created.stats?.applied || 0,
            upvotes: created.stats?.upvotes || 0,
            comments: created.stats?.comments || 0
          }
        };
        state.events.unshift(normalized);
        state.isCreateModalOpen = false;
      })
      // Upvote Event Thunk
      .addCase(toggleUpvoteEventThunk.fulfilled, (state, action) => {
        const { eventId, upvotes, hasUpvoted } = action.payload;
        const event = state.events.find((e) => String(e._id || e.id) === String(eventId));
        if (event) {
          if (!event.stats) event.stats = { upvotes: 0, comments: 0, applied: 0 };
          event.stats.upvotes = upvotes;
          event.hasUpvoted = hasUpvoted;
        }
      })
      // Register Event Thunk
      .addCase(registerEventThunk.fulfilled, (state, action) => {
        const { eventId, event: updated } = action.payload;
        const event = state.events.find((e) => String(e._id || e.id) === String(eventId));
        if (event) {
          event.buttonType = "JOIN_NOW";
          event.buttonText = "Join Now";
          if (event.stats && updated?.stats) event.stats.applied = updated.stats.applied;
        }
      })
      // Fetch Event Options Thunk
      .addCase(fetchEventOptions.fulfilled, (state, action) => {
        if (action.payload?.formatOptions) {
          state.formatOptions = action.payload.formatOptions;
        }
        if (action.payload?.domainOptions) {
          state.domainOptions = action.payload.domainOptions;
        }
      })
      // When comment is added, move corresponding event to the top and increment comments
      .addCase(createTopLevelComment.fulfilled, (state, action) => {
        if (!state.events) return;
        const answer = action.payload;
        const postId = answer?.post;
        if (postId) {
          const index = state.events.findIndex(
            (e) =>
              String(e._id || e.id) === String(postId) ||
              String(e.postId) === String(postId) ||
              String(e.postRef) === String(postId) ||
              String(e.postRef?._id) === String(postId)
          );
          if (index !== -1) {
            const event = state.events[index];
            if (!event.stats) event.stats = { applied: 0, upvotes: 0, comments: 0 };
            event.stats.comments = (event.stats.comments || 0) + 1;
            state.events.splice(index, 1);
            state.events.unshift(event);
          }
        }
      });
  }
});

export const {
  setCategory,
  toggleBookmarkEvent,
  toggleUpvoteEvent,
  updateEventLikesFromSocket,
  bumpEventToTopOnComment,
  registerEvent,
  openCreateModal,
  closeCreateModal,
  addEvent,
  removeEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;
