import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import ProductList from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SuccessPage from "../pages/SuccessPage";
import HomePage from './../pages/Home/index';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/success",
        element: <SuccessPage />, // You need to create this component
      },
    ],
  },
]);
