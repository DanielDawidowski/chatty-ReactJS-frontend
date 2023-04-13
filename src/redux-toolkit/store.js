import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/reducers/user/user.reducer";
import suggestionsReducer from "@redux/reducers/suggestions/suggestions.reducer";
import notificationsReducer from "@redux/reducers/notifications/notifications.reducer";
import modalReducer from "@redux/reducers/modal/modal.reducer";
import postReducer from "@redux/reducers/post/post.reducer";
import userPostReactionsReducer from "@redux/reducers/post/user-post-reaction.reducer";
import postsReducer from "@redux/reducers/post/posts.reducer";
import chatReducer from "./reducers/chat/chat.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionsReducer,
    notifications: notificationsReducer,
    modal: modalReducer,
    post: postReducer,
    allPosts: postsReducer,
    userPostReactions: userPostReactionsReducer,
    chat: chatReducer
  }
});
