import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EntryPoint from '../pages/EntryPoint/EntryPoint.tsx';
import Login from '../pages/Login/Login.tsx';

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
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
