import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/user.slice";
import postsReducer from "../features/posts/posts.slice";
import commentsReducer from "../features/comments/comments.slice";
import eventsReducer from "../features/events/eventsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
    events: eventsReducer,
  },
});

export default store;
