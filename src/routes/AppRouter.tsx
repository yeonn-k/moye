import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/today',
      element: <TodaysReservation />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
