import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import "./editCustomer.css";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    phone: "",
    role: "",
    image: "",
  });

  const fetchCustomersData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_BASE_URL + `/customers/${id}`
      );

      setCustomerDetails(response.data);
    } catch (err) {
      console.error("Error fetching Customer data", err);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_BASE_URL + `/customers/${id}`,
        customerDetails
      );
      notifications.show({
        title: "Success",
        message: "customer update successfully",
        color: "green",
        //   icon: <IconCheck />,
        autoClose: 3000,
      });
      console.log("response", response);
    } catch (err) {
      console.error("Error updating customer", err);
      notifications.show({
        title: "Update Failed",
        message: "Failed to update customer",
        color: "red",
        //   icon: <IconCheck />,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="edit-customer-container">
      <div style={{ padding: "1rem" }}>Edit customer</div>
      <div>
        <form className="customer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  name: e.target.value,
                })
              }
              value={customerDetails.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              placeholder="user@example.com"
              name="email"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  email: e.target.value,
                })
              }
              value={customerDetails.email}
            />
          </div>
          <div className="address-group">
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                placeholder=""
                name="address"
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    address: e.target.value,
                  })
                }
                value={customerDetails.address}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                placeholder="6-digits"
                name="pincode"
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    pincode: e.target.value,
                  })
                }
                value={customerDetails.pincode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="district" className="form-label">
                District
              </label>
              <input
                type="text"
                placeholder=""
                name="district"
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    district: e.target.value,
                  })
                }
                value={customerDetails.district}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                placeholder=""
                name="state"
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    state: e.target.value,
                  })
                }
                value={customerDetails.state}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  phone: e.target.value,
                })
              }
              value={customerDetails.phone}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {file && (
              <div className="form-group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  className="uploaded-image"
                />
                <button
                  type="button"
                  disabled={loading}
                  className="submit-button"
                  onClick={handleUpload}
                >
                  {loading ? (
                    "Uploading..."
                  ) : imageUrl ? (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                        setImageUrl("");
                        setCustomerDetails({ ...customerDetails, image: "" });
                        console.log(customerDetails);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      Remove
                    </div>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            )}
          </div> */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="select-input"
              name="role"
              id="role"
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, role: e.target.value })
              }
              value={customerDetails.role}
            >
              <option value="" className="select-option">
                Select Role
              </option>
              <option value="staff" className="select-option">
                Staff
              </option>
              <option value="customer" className="select-option">
                Customer
              </option>
            </select>
          </div>
          {/* {error && <p className="error-message">{error}</p>} */}
          <button type="submit" className="submit-button">
            Update
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
