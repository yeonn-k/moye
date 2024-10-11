import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';
import SignUp from '../pages/SignUp/SignUp.tsx';
import TodaysReservation from '../pages/TodaysReservation/TodaysReservation.tsx';
import MonthList from '../pages/MonthList/MonthList.tsx';

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
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
