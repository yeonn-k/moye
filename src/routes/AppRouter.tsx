import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';
import SignUp from '../pages/SignUp/SignUp.tsx';

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
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
