import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Spinner from "../components/Spinner";

const HomePage = lazy(() => import("../pages/Home"));
const ProductList = lazy(() => import("../pages/Product"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const SuccessPage = lazy(() => import("../pages/SuccessPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: "products",
        element: withSuspense(ProductList),
      },
      {
        path: "products/:id",
        element: withSuspense(ProductDetail),
      },
      {
        path: "cart",
        element: withSuspense(Cart),
      },
      {
        path: "success",
        element: withSuspense(SuccessPage),
      },
    ],
  },
]);
