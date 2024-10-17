import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ROUTE_LINK from './RouterLink.ts';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';
import SignUp from '../pages/SignUp/SignUp.tsx';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';
import MonthList from '../pages/MonthList/MonthList.tsx';
import OwnerProfile from '../pages/OwnerProfile/OwnerProfile.tsx';
import StoreDetail from '../pages/StoreDetail/StoreDetail.tsx';
import EditStoreDetail from '../pages/StoreDetail/Edit/EditStoreDetail.tsx';
import RegisterStore from '../pages/StoreDetail/Register/RegisterStoreDetail.tsx';
import ProtectedRoute from './protectedRoute/ProtectedRoute.tsx';
import PublicRoute from './publicRoute/PublicRoute.tsx';
import Layout from '../components/common/Layout/Layout.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTE_LINK.ENTRYPOINT.path,
      element: (
        // <PublicRoute>
        <EntryPoint />
        // </PublicRoute>
      ),
    },
    {
      path: ROUTE_LINK.LOGIN.path,
      element: (
        // <PublicRoute>
        <Login />
        // </PublicRoute>
      ),
    },
    {
      path: ROUTE_LINK.SIGNUP.path,
      element: (
        // <PublicRoute>
        <SignUp />
        // </PublicRoute>
      ),
    },
    {
      path: '/',
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: ROUTE_LINK.OWNER.path,
          element: <OwnerProfile />,
        },
        {
          path: ROUTE_LINK.TODAY.path,
          element: <TodaysReservation />,
        },
        {
          path: ROUTE_LINK.MONTH.path,
          element: <MonthList />,
        },
        {
          path: ROUTE_LINK.STORE.path,
          element: <StoreDetail />,
        },
        {
          path: ROUTE_LINK.STOREREGISTER.path,
          element: <RegisterStore />,
        },
        {
          path: ROUTE_LINK.STOREEDIT.path,
          element: <EditStoreDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
