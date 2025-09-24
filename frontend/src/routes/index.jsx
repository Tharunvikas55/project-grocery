import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "../pages/about";
import { Children } from "react";
import Customers from "../pages/customers";
import ProductHome from "../pages/product";
import App from "../App";
import CustomerDetails from "../pages/customers/components/customerDetails/CustomerDetails";
import EditCustomer from "../pages/customers/components/editcustomer/EditCustomer";
import Ledger from "../pages/ledger";

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
          path: "customers/details/:id",
          element: <CustomerDetails />,
        },
        {
          path: "customers/edit/:id",
          element: <EditCustomer />,
        },
        {
          path: "products",
          element: <ProductHome />,
        },
        {
          path: "customers/:id/ledger",
          element: <Ledger />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRouter;
