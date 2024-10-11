import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';
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
      path: 'dashboard',
      element: <div>This is dashboard page</div>,
    },
    {
      path: 'list',
      element: <div>This is list page</div>,
    },
    {
      path: 'store',
      element: <StoreDetail />,
    },
    {
      path: 'store/edit',
      element: <EditStoreDetail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
