import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ledger.css";
import UserCard from "./user-card/UserCard";

function Ledger() {
  const { id: customerId } = useParams();
  const [ledgerDetails, setLedgerDetails] = useState([]);
  const [newLedgerDetails, setNewLedgerDetails] = useState({
    description: "",
    transaction_type: "",
    payment_mode: "",
    amount: "",
  });

  const fetchCustomerLedger = async () => {
    try {
      const ledgerdata = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/ledger/${customerId}`
      );
      console.log(ledgerdata.data.data);
      setLedgerDetails(ledgerdata.data.data);
    } catch (error) {
      console.error("Error fetching customer ledger", error);
    }
  };

  useEffect(() => {
    fetchCustomerLedger();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLedgerDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = { ...newLedgerDetails, customerId: customerId };
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ledger/addnewledger`,
        params
      );
      fetchCustomerLedger();
      setNewLedgerDetails({
        description: "",
        transaction_type: "",
        payment_mode: "",
        amount: "",
      });
    } catch (error) {
      console.error("error inserting ledger", error);
    }
  };

  return (
    <>
      <div className="ledger-component">
        <div className="top">
          <UserCard customerId={customerId} />
        </div>
        <div className="bottom">
          <div className="leger-container">
            <div className="left">
              <div className="ledger-form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={newLedgerDetails.description}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      onChange={handleChange}
                      value={newLedgerDetails.amount}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="transaction_type" className="form-label">
                      Transaction Type
                    </label>
                    <select
                      className="select-input"
                      name="transaction_type"
                      id="transaction_type"
                      onChange={handleChange}
                      value={newLedgerDetails.transaction_type}
                    >
                      <option value="" className="select-option">
                        Select
                      </option>
                      <option value="Purchase" className="select-option">
                        Purchase
                      </option>
                      <option value="Payment" className="select-option">
                        Payment
                      </option>
                    </select>
                  </div>
                  {newLedgerDetails.transaction_type === "Payment" && (
                    <div className="form-group">
                      <label htmlFor="payment_mode" className="form-label">
                        Payment Mode
                      </label>
                      <select
                        className="select-input"
                        name="payment_mode"
                        id="payment_mode"
                        onChange={handleChange}
                        value={newLedgerDetails.payment_mode}
                      >
                        <option value="" className="select-option">
                          Select
                        </option>
                        <option value="Cash" className="select-option">
                          Cash
                        </option>
                        <option value="Gpay" className="select-option">
                          Gpay
                        </option>
                      </select>
                    </div>
                  )}
                  <button type="submit" className="submit-button">
                    save
                  </button>
                </form>
              </div>
            </div>
            <div className="right">
              <div className="ledger-table-container">
                {/* <h3 className="table-title">Ledger Table</h3> */}
                {ledgerDetails.length > 0 ? (
                  <table className="customer-table">
                    <thead className="table-header">
                      <tr>
                        <th>Created Date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerDetails.map((ledger) => (
                        <tr key={ledger.id}>
                          <td>{new Date(ledger.createdAt).toLocaleString()}</td>
                          <td>
                            <div className="chips">
                              {ledger.payment_mode}
                              {ledger.transaction_type}
                            </div>
                            <div>{ledger.amount}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-customers">No records found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ledger;
