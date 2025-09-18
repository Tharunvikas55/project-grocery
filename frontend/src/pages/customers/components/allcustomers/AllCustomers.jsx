import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./customertable/CustomerTable";
import SearchInput from "../../../../components/searchInput/SearchInput";
import { IconUsersGroup } from "@tabler/icons-react";

import Stats from "../../../../components/statsCards/Stats";
import "./styles.css";

function AllCustomers() {
  const [count, setCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCustomerCount = async () => {
    try {
      await axios
        .get(import.meta.env.VITE_API_BASE_URL + "/customers/count")
        .then((response) => {
          setCount(response.data);
        })
        .catch((err) => {
          console.log("Error getting customer count", err);
        });
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };
  const fetchCustomers = async () => {
    try {
      const queryObj = {};
      if (search) queryObj.search = search;

      const queryString = new URLSearchParams(queryObj).toString();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/customers?${queryString}`
      );

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  return (
    <div className="all-customers-container">
      <div className="top">
        <Stats count={count} title="customers" icon={IconUsersGroup}  />
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div className="filters">
        <h3 className="filters-title">Filters</h3>
      </div>
      <div>
        <CustomerTable customers={customers} />
      </div>
    </div>
  );
}

export default AllCustomers;
