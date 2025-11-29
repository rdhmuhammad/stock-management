import NotFound from "@/pages/NotFound";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MainLayout from "@/layout/MainLayout.tsx";
import {ROUTES} from "@/config/constant/ROUTES.ts";
import Index from "@/pages/dashboard";
import WatchlistPage from "@/pages/watchlist/WatchlistPage.tsx";
import IndicatorPage from "@/pages/indicator/IndicatorPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <MainLayout>
          <Outlet/>
        </MainLayout>
    ),
    children: [
      {
        index: true, // ✅ this means it matches the path "/"
        element: <Navigate to={ROUTES.DASHBOARD} replace />
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Index/>
      },
      {
        path: ROUTES.WATCHLIST,
        element: <WatchlistPage/>
      },
      {
        path: ROUTES.INDICATOR,
        element: <IndicatorPage/>
      },
    ]
  },
  // Public Routes - No layout wrapper needed
  // {
  //   path: ROUTES.LOGIN,
  //   element: (
  //     <PublicRoute>
  //       <LoginPage />
  //     </PublicRoute>
  //   )
  // },
  // Error Routes
  {
    path: "*",
    element: <NotFound />,
  }
])