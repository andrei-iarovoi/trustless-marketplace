import { createBrowserRouter } from 'react-router'

import { DashboardPage } from '@/pages/Dashboard/DashboardPage'
import { LandingPage } from '@/pages/Landing/LandingPage'
import { MarketplacePage } from '@/pages/Marketplace/MarketplacePage'
import { MyOrdersPage } from '@/pages/MyOrders/MyOrdersPage'
import { OrderDetailsPage } from '@/pages/OrderDetails/OrderDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/marketplace',
    element: <MarketplacePage />,
  },
  {
    path: '/orders/:orderId',
    element: <OrderDetailsPage />,
  },
  {
    path: '/my-orders',
    element: <MyOrdersPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
])

export { router }
