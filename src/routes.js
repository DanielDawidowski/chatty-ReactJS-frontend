import { useRoutes } from "react-router-dom";
// import { Suspense, lazy } from "react";
import { AuthTabs } from "./pages/auth";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <AuthTabs />
    }
  ]);
  return elements;
};
