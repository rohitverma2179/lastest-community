import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostWithComments,
  createTopLevelComment,
  createNestedReply,
  voteCommentOrReply
} from "./comments.thunk";
import { mapBackendPostToFrontend } from "../posts/posts.slice";

const initialState = {
  currentPost: null,
  comments: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.comments = [];
      state.error = null;
    },
    setMockPostDetails: (state, action) => {
      state.currentPost = action.payload.post;
      if (action.payload.comments) {
        state.comments = action.payload.comments;
      }
    },
    addLocalComment: (state, action) => {
      state.comments.unshift(action.payload);
      if (state.currentPost) {
        state.currentPost.comments = (state.currentPost.comments || 0) + 1;
      }
    },
    addLocalReply: (state, action) => {
      const { parentId, newReply } = action.payload;

      const appendRecursive = (list) => {
        for (let item of list) {
          if (item.id === parentId || item._id === parentId) {
            if (!item.replies) item.replies = [];
            item.replies.push(newReply);
            return true;
          }
          if (item.replies && item.replies.length > 0) {
            const found = appendRecursive(item.replies);
            if (found) return true;
          }
        }
        return false;
      };

      appendRecursive(state.comments);
      if (state.currentPost) {
        state.currentPost.comments = (state.currentPost.comments || 0) + 1;
      }
    },
    toggleLocalCommentVote: (state, action) => {
      const { commentId, increment } = action.payload;

      const voteRecursive = (list) => {
        for (let item of list) {
          if (item.id === commentId || item._id === commentId) {
            item.upvotes = Math.max(0, (item.upvotes || 0) + increment);
            item.hasVoted = increment > 0;
            return true;
          }
          if (item.replies && item.replies.length > 0) {
            const found = voteRecursive(item.replies);
            if (found) return true;
          }
        }
        return false;
      };

      voteRecursive(state.comments);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Post + Comments
      .addCase(fetchPostWithComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostWithComments.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.post) {
          state.currentPost = mapBackendPostToFrontend(action.payload.post);
        }
        state.comments = action.payload.answers || [];
      })
      .addCase(fetchPostWithComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Top Level Comment
      .addCase(createTopLevelComment.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(createTopLevelComment.fulfilled, (state, action) => {
        state.isSubmitting = false;
        if (action.payload) {
          state.comments.unshift(action.payload);
          if (state.currentPost) {
            state.currentPost.comments = (state.currentPost.comments || 0) + 1;
          }
        }
      })
      .addCase(createTopLevelComment.rejected, (state) => {
        state.isSubmitting = false;
      })

      // Create Nested Reply
      .addCase(createNestedReply.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(createNestedReply.fulfilled, (state, action) => {
        state.isSubmitting = false;
        if (action.payload) {
          const updatedAnswer = action.payload;
          const index = state.comments.findIndex(c => c._id === updatedAnswer._id);
          if (index !== -1) {
            state.comments[index] = updatedAnswer;
          }
          if (state.currentPost) {
            state.currentPost.comments = (state.currentPost.comments || 0) + 1;
          }
        }
      })
      .addCase(createNestedReply.rejected, (state) => {
        state.isSubmitting = false;
      })

      // Vote Comment or Reply
      .addCase(voteCommentOrReply.fulfilled, (state, action) => {
        if (action.payload) {
          const updatedAnswer = action.payload;
          const index = state.comments.findIndex(c => c._id === updatedAnswer._id);
          if (index !== -1) {
            state.comments[index] = updatedAnswer;
          }
        }
      });
  }
});

export const {
  clearCurrentPost,
  setMockPostDetails,
  addLocalComment,
  addLocalReply,
  toggleLocalCommentVote
} = commentsSlice.actions;

export default commentsSlice.reducer;
