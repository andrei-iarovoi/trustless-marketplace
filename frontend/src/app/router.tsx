import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { LandingPage } from "@/pages/Landing/LandingPage";
import { MarketplacePage } from "@/pages/Marketplace/MarketplacePage";
import { MyOrdersPage } from "@/pages/MyOrders/MyOrdersPage";
import { OrderDetailsPage } from "@/pages/OrderDetails/OrderDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/marketplace",
        element: <MarketplacePage />,
      },
      {
        path: "/order/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "/my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);