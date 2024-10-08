import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';
import ReservationList from '../pages/TodaysReservation/TodaysReservation.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/list',
      element: <ReservationList />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
