import { useState, useEffect } from "react";
import axios from "axios";
import "./UserCard.css";

function UserCard({ customerId }) {
  const [customerDetails, setCustomerDetails] = useState({});
  const fetchCustomerDetails = async () => {
    try {
      const customerdata = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customers/${customerId}`
      );
      setCustomerDetails(customerdata.data.data);
    } catch (error) {
      console.error("Error fetching customer details", error);
    }
  };
  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  return (
    <>
      <div className="user-data-container">
        <div className="left">
          <div className="user-name"> {customerDetails.name}</div>
          <div className="user-phone"> {customerDetails.phone}</div>
          <div className="user-address"> {customerDetails.address}</div>
        </div>
        <div className="right">
          <img src={customerDetails.image} alt={customerDetails.name} />
        </div>
      </div>
    </>
  );
}

export default UserCard;
