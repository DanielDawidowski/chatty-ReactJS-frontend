import { useRoutes } from "react-router-dom";
import { AuthTabs, ForgotPassword, ResetPassword } from "@pages/auth";
import Chat from "@pages/social/chat/Chat";
import Followers from "@pages/social/followers/Followers";
import Following from "@pages/social/following/Following";
import Notifications from "@pages/social/notifications/Notifications";
import People from "@pages/social/people/People";
import Photos from "@pages/social/photos/Photos";
import Profile from "@pages/social/profile/Profile";
import Social from "@pages/social/Social";
import Streams from "@pages/social/streams/Streams";
import Videos from "@pages/social/videos/Videos";
// import { Suspense, lazy } from "react";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <AuthTabs />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/app/social",
      element: <Social />,
      children: [
        {
          path: "streams",
          element: <Streams />
        },
        {
          path: "chat/messages",
          element: <Chat />
        },
        {
          path: "people",
          element: <People />
        },
        {
          path: "followers",
          element: <Followers />
        },
        {
          path: "following",
          element: <Following />
        },
        {
          path: "photos",
          element: <Photos />
        },
        {
          path: "videos",
          element: <Videos />
        },
        {
          path: "notifications",
          element: <Notifications />
        },
        {
          path: "profile/:username",
          element: <Profile />
        }
      ]
    }
  ]);
  return elements;
};
