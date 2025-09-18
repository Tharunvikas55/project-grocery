import { useEffect, useState } from "react";
import axios from "axios";
import "./customer.css";
// import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddCustomer from "./components/addcustomer/AddCustomer";
import AllCustomers from "./components/allcustomers/AllCustomers";

function Customers() {
  // const [searchQuery] = useSearchParams();
  // console.log("searchQuery", searchQuery.get("q"));
  const [openModel, setOpenModel] = useState(false);

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["customers"],
  //   queryFn: () => {
  //     return axios
  //       .get(import.meta.env.VITE_API_KEY + "/customers")
  //       .then((res) => res.data);
  //   },
  // });
  // console.log('data', data)

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;

  return (
    <div className="customer-component">
      {/* Tab */}
      <div className="customer-tabs">
        <div
          className={`tab ${!openModel ? "active" : ""}`}
          onClick={() => setOpenModel(false)}
        >
          All Customers
        </div>
        <div
          className={`tab ${openModel ? "active" : ""}`}
          onClick={() => setOpenModel(true)}
        >
          Add Customers
        </div>
      </div>
      <div className="customer-list" id="all-customers">
        {!openModel && <AllCustomers />}
      </div>
      {openModel && <AddCustomer />}
    </div>
  );
}

export default Customers;
