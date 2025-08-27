import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import ProductList from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SuccessPage from "../pages/SuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
