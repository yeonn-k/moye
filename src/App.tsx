import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Main from './components/Main';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
