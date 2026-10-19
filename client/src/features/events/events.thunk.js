import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import toast from "react-hot-toast";

// Fetch all events from backend API
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/events");
      return response.data.events;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch events";
      return rejectWithValue(message);
    }
  }
);

// Create a new event and save to MongoDB database
export const createEventThunk = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post("/events", eventData);
      toast.success("Event posted successfully to database!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to save event to database";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Toggle Upvote event API call
export const toggleUpvoteEventThunk = createAsyncThunk(
  "events/toggleUpvote",
  async (payload, { rejectWithValue }) => {
    try {
      const eventId = typeof payload === "object" ? payload.eventId : payload;
      const targetHasUpvoted = typeof payload === "object" ? payload.targetHasUpvoted : true;

      const response = await api.put(`/events/${eventId}/upvote`, {
        hasUpvoted: targetHasUpvoted,
      });
      return { eventId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to upvote");
    }
  }
);

// Register for event API call
export const registerEventThunk = createAsyncThunk(
  "events/registerEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/events/${eventId}/register`);
      toast.success("Successfully registered for event!");
      return { eventId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to register");
    }
  }
);

// Fetch event format and domain options from backend API
export const fetchEventOptions = createAsyncThunk(
  "events/fetchEventOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/events/options");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch event options");
    }
  }
);
