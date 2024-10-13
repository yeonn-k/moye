import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';
import SignUp from '../pages/SignUp/SignUp.tsx';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';
import MonthList from '../pages/MonthList/MonthList.tsx';
import OwnerProfile from '../pages/OwnerProfile/OwnerProfile.tsx';
import StoreDetail from '../pages/StoreDetail/StoreDetail.tsx';
import EditStoreDetail from '../pages/EditStoreDetail/EditStoreDetail.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <EntryPoint />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/today',
      element: <TodaysReservation />,
    },
    {
      path: '/month',
      element: <MonthList />,
    },
    {
      path: '/owner',
      element: <OwnerProfile />,
    },
    {
      path: '/dashboard',
      element: <div>This is dashboard page</div>,
    },
    {
      path: '/list',
      element: <div>This is list page</div>,
    },
    {
      path: '/store',
      element: <StoreDetail />,
    },
    {
      path: '/store/edit',
      element: <EditStoreDetail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
