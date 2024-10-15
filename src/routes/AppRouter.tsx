import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';
import SignUp from '../pages/SignUp/SignUp.tsx';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';
import MonthList from '../pages/MonthList/MonthList.tsx';
import OwnerProfile from '../pages/OwnerProfile/OwnerProfile.tsx';
import StoreDetail from '../pages/StoreDetail/StoreDetail.tsx';
import EditStoreDetail from '../pages/EditStoreDetail/EditStoreDetail.tsx';
import ProtectedRoute from './protectedRoute/ProtectedRoute.tsx';
import PublicRoute from './publicRoute/PublicRoute.tsx';
import Layout from '../components/common/Layout/Layout.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PublicRoute>
          <EntryPoint />
        </PublicRoute>
      ),
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      ),
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'owner',
          element: <OwnerProfile />,
        },
        {
          path: 'today',
          element: <TodaysReservation />,
        },
        {
          path: 'month',
          element: <MonthList />,
        },
        {
          path: 'store',
          element: <StoreDetail />,
        },
        {
          path: 'store/edit',
          element: <EditStoreDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
