import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/constants";
import { AppShell } from "@/components/layout/app-shell";
import { CountriesPage } from "@/features/countries/pages/countries-page";
import { AboutPage } from "@/features/dashboard/pages/about-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { FavoritesPage } from "@/features/favorites/pages/favorites-page";
import { MarketsPage } from "@/features/markets/pages/markets-page";
import { WeatherPage } from "@/features/weather/pages/weather-page";

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.root,
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATHS.dashboard} replace />,
      },
      {
        path: ROUTE_PATHS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: ROUTE_PATHS.weather,
        element: <WeatherPage />,
      },
      {
        path: ROUTE_PATHS.countries,
        element: <CountriesPage />,
      },
      {
        path: ROUTE_PATHS.markets,
        element: <MarketsPage />,
      },
      {
        path: ROUTE_PATHS.favorites,
        element: <FavoritesPage />,
      },
      {
        path: ROUTE_PATHS.about,
        element: <AboutPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
