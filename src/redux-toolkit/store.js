import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/reducers/user/user.reducer";
import suggestionsReducer from "@redux/reducers/suggestions/suggestions.reducer";
import notificationsReducer from "@redux/reducers/notifications/notifications.reducer";
import modalReducer from "./reducers/modal/modal.reducer";
import postReducer from "./reducers/post/post.reducer";
import postsReducer from "./reducers/post/posts.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionsReducer,
    notifications: notificationsReducer,
    modal: modalReducer,
    post: postReducer,
    allPosts: postsReducer
  }
});
