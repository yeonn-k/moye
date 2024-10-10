import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';
import Login from '../pages/Login/Login.tsx';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
