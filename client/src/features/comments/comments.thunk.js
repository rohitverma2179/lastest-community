import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import toast from "react-hot-toast";

// Fetch single post and its comments/answers tree
export const fetchPostWithComments = createAsyncThunk(
  "comments/fetchPostWithComments",
  async (postId, { rejectWithValue }) => {
    try {
      const [postRes, answersRes] = await Promise.all([
        api.get(`/posts/${postId}`),
        api.get(`/posts/${postId}/answers`)
      ]);
      return {
        post: postRes.data.post,
        answers: answersRes.data.answers
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch post details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Add top-level comment to post
export const createTopLevelComment = createAsyncThunk(
  "comments/createTopLevelComment",
  async ({ postId, body }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/answers`, { body });
      toast.success("Comment added!");
      return response.data.answer;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add comment";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Add nested reply to comment/reply
export const createNestedReply = createAsyncThunk(
  "comments/createNestedReply",
  async ({ answerId, body }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/answers/${answerId}/replies`, { body });
      toast.success("Reply posted!");
      return response.data.answer;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to post reply";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Vote/Like a comment or reply
export const voteCommentOrReply = createAsyncThunk(
  "comments/voteCommentOrReply",
  async ({ answerId, voted }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/answers/${answerId}/vote`, { voted });
      return response.data.answer;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to vote on comment";
      return rejectWithValue(message);
    }
  }
);
