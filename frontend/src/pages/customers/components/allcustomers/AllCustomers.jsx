import { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./customertable/CustomerTable";
import SearchInput from "../../../../components/searchInput/SearchInput";
import { IconUsersGroup } from "@tabler/icons-react";
import Stats from "../../../../components/statsCards/Stats";
import "./styles.css";
import { useDebounce } from "use-debounce";

function AllCustomers() {
  const [count, setCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchCustomerCount = async () => {
    try {
      const customerCount = await axios.get(`
        ${import.meta.env.VITE_API_BASE_URL}/customers/count`);

      setCount(customerCount.data.data);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };
  const fetchCustomers = async () => {
    try {
      const queryObj = {};
      if (search) queryObj.search = search;

      const queryString = new URLSearchParams(queryObj).toString();

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customers?${queryString}`
      );

      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [debouncedSearch]);

  const handleDelete = async (customerId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this customer?"))
        return;
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/customers/${customerId}`
      );
      await fetchCustomerCount();
      await fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  return (
    <div className="all-customers-container">
      <div className="top">
        <Stats count={count} title="customers" icon={IconUsersGroup} />
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div>
        <CustomerTable customers={customers} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default AllCustomers;
