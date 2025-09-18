import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "../pages/about";
import { Children } from "react";
import Customers from "../pages/customers";
import ProductHome from "../pages/product";
import App from "../App";

const AppRouter = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "customers",
          element: <Customers />,
          },
          {
            path: "products",
            element: <ProductHome />,
          }
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRouter;
