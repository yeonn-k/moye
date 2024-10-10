import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
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
          element: <div>This is store page</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
