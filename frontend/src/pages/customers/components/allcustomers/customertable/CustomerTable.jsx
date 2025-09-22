import { Link } from "react-router-dom";
import "./customerTable.css";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconReceiptRupee } from "@tabler/icons-react";
function CustomerTable({ customers, onDelete }) {
  return (
    <div className="customer-table-container">
      <h3 className="table-title">Customer Table</h3>
      {customers.length > 0 ? (
        <table className="customer-table">
          <thead className="table-header">
            <tr>
              <th>Actions</th>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>District</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="action-buttons">
                  <div>
                    <Link
                      to={`/customers/${customer.id}/ledger`}
                      className="ledger-button"
                    >
                      <IconReceiptRupee stroke={2} />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/customers/edit/${customer.id}`}
                      className="edit-button"
                    >
                      <IconEdit stroke={2} />
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => onDelete(customer.id)}
                      className="delete-button"
                    >
                      <IconTrash stroke={2} />
                    </button>
                  </div>
                </td>
                <td>
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="customer-image"
                  />
                </td>
                <td>
                  <Link
                    to={`/customers/details/${customer.id}`}
                    className="customer-link"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.district}</td>
                <td>{customer.state}</td>
                <td>{customer.pincode}</td>
                <td>
                  {<td>{new Date(customer.createdAt).toLocaleString()}</td>}
                </td>
                <td>
                  {<td>{new Date(customer.updatedAt).toLocaleString()}</td>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-customers">No customers found.</p>
      )}
    </div>
  );
}

export default CustomerTable;
