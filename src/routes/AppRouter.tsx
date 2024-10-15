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
      path: '/today',
      element: (
        <ProtectedRoute>
          <TodaysReservation />
        </ProtectedRoute>
      ),
    },
    {
      path: '/month',
      element: (
        <ProtectedRoute>
          <MonthList />
        </ProtectedRoute>
      ),
    },
    {
      path: '/owner',
      element: (
        <ProtectedRoute>
          <OwnerProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <div>This is dashboard page</div>
        </ProtectedRoute>
      ),
    },
    {
      path: '/list',
      element: (
        <ProtectedRoute>
          <div>This is list page</div>
        </ProtectedRoute>
      ),
    },
    {
      path: '/store',
      element: (
        <ProtectedRoute>
          <StoreDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: '/store/edit',
      element: (
        <ProtectedRoute>
          <EditStoreDetail />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
