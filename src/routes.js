import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthTabs, ForgotPassword, ResetPassword } from "@pages/auth";
import Error from "@pages/error/Error";
import StreamsSkeleton from "@pages/social/streams/StreamsSkeleton";
import ProtectedRoute from "@pages/ProtectedRoute";

const Social = lazy(() => import("@pages/social/Social"));
const Chat = lazy(() => import("@pages/social/chat/Chat"));
const Followers = lazy(() => import("@pages/social/followers/Followers"));
const Following = lazy(() => import("@pages/social/following/Following"));
const Notifications = lazy(() => import("@pages/social/notifications/Notifications"));
const People = lazy(() => import("@pages/social/people/People"));
const Photos = lazy(() => import("@pages/social/photos/Photos"));
const Videos = lazy(() => import("@pages/social/videos/Videos"));
const Profile = lazy(() => import("@pages/social/profile/Profile"));
const Streams = lazy(() => import("@pages/social/streams/Streams"));

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
      element: (
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "streams",
          element: (
            <Suspense fallback={<StreamsSkeleton />}>
              <Streams />
            </Suspense>
          )
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
    },
    {
      path: "*",
      element: <Error />
    }
  ]);
  return elements;
};
