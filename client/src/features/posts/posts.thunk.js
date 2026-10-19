import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import toast from "react-hot-toast";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts");
      return response.data.posts;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch posts";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts", postData);
      toast.success("Post created successfully!");
      return response.data.post;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create post";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  "posts/toggleLikePost",
  async ({ postId, voted }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/${postId}/like`, { voted });
      return { postId, ...response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to toggle like";
      return rejectWithValue(message);
    }
  }
);

export const votePollOption = createAsyncThunk(
  "posts/votePollOption",
  async ({ postId, optionIndex }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/poll/vote`, { optionIndex });
      toast.success("Vote recorded!");
      return response.data.post;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit vote";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const voteQuizOption = createAsyncThunk(
  "posts/voteQuizOption",
  async ({ postId, optionIndex }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/quiz/vote`, { optionIndex });
      toast.success("Quiz answer submitted!");
      return response.data.post;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit quiz answer";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
