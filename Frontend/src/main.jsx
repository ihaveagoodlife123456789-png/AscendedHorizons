import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Lobby } from './App.jsx';
import { Registration } from './App.jsx';
import { Access } from './App.jsx';
import { Dashboard } from './App.jsx';
import { Shop } from './App.jsx';
import { Cart } from './App.jsx'
import { Payment } from './App.jsx'
import { Confirmation } from './App.jsx'
import { Tracking } from './App.jsx'

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
    element: <Shop />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/cart/checkout',
    element: <Payment />
  },
  {
    path: '/cart/checkout/confirmation',
    element: <Confirmation />
  },
  {
    path: '/cart/checkout/confirmation/tracking',
    element: <Tracking />
  },
])

createRoot(document.getElementById('root')).render(
  /*<StrictMode>*/
    <RouterProvider router={AppRouter} />
  /*</StrictMode>,*/
)
