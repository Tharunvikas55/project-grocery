import { useState } from "react";
import "./customer.css";
import AddCustomer from "./components/addcustomer/AddCustomer";
import AllCustomers from "./components/allcustomers/AllCustomers";

function Customers() {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="customer-component">
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
