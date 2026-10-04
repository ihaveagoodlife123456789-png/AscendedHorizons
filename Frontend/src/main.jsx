import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Lobby } from './App.jsx';
import { Registration } from './App.jsx';
import { Access } from './App.jsx';
import { Dashboard } from './App.jsx';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />
  },
  {
    path: '/register',
    element: <Registration />
  },
  {
    path: '/access',
    element: <Access />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/shop',
    element: <Dashboard />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={AppRouter} />
  </StrictMode>,
)
