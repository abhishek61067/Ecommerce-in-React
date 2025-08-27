import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import ProductList from "../pages/Product";

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
    ],
  },
]);
