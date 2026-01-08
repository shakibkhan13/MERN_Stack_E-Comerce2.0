import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Products from './pages/Products';
import Banners from './pages/Banners';
import Brands from './pages/Brands';
import { ToastContainer } from 'react-toastify';
import Order from './pages/Order';
import Invoice from './pages/Invoice';
import Category from './pages/Category';
import UsersPage from './pages/Users';


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/account",
        element: <Account />,
      },
      {
        path: "dashboard/users",
        element: <UsersPage />,
      },
      {
        path: "dashboard/orders",
        element: <Order />,
      },
      {
        path: "dashboard/invoices",
        element: <Invoice />,
      },
      {
        path: "dashboard/products",
        element: <Products />,
      },
      {
        path: "dashboard/banners",
        element: <Banners />,
      },
      {
        path: "dashboard/categories",
        element: <Category />,
      },
      {
        path: "dashboard/brands",
        element: <Brands />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
)
