import React, { useState, useRef } from "react";
import axios from "axios";
import "./addCustomer.css";
import awsImageUpload from "../../../../utils/awsImageUpload";

function AddCustomer() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    address: "",
    district: "",
    state: "",
    zip: "",
    phone: "",
    role: "",
    image: "",
  });

  const [error, setError] = useState("");

  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }
    if (selectedFile.size > maxSize) {
      setError("File size must be less than 2MB.");
      return;
    }
    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    setLoading(true);
    console.log(file);

    const uploadedimageUrl = await awsImageUpload(file);
    setLoading(false);
    setImageUrl(uploadedimageUrl);
    console.log(uploadedimageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.username || !userDetails.email || !userDetails.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setError("Invalid email format.");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userDetails.phone)) {
      setError("Invalid phone number format.");
      return;
    }
    const postData = {
      ...userDetails,
      image: imageUrl,
    };

    axios
      .post(import.meta.env.VITE_API_BASE_URL + "/customers", postData)
      .then((response) => {
        console.log("Customer added successfully:", response.data);
        setUserDetails({
          username: "",
          email: "",
          address: "",
          district: "",
          state: "",
          zip: "",
          phone: "",
          role: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message ===
            "Customer with this email or phone already exists."
        ) {
          setError("*Email or Phone already exists");
        } else {
          alert("Error adding customer. Please try again.");
          setUserDetails({
            username: "",
            email: "",
            address: "",
            district: "",
            state: "",
            zip: "",
            phone: "",
            role: "",
            image: "",
          });
        }
      });
  };

  return (
    <div className="add-customer-container">
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            value={userDetails.username}
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
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            value={userDetails.email}
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
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              value={userDetails.address}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              placeholder="6-digits"
              name="zip"
              onChange={(e) =>
                setUserDetails({ ...userDetails, zip: e.target.value })
              }
              value={userDetails.zip}
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
                setUserDetails({ ...userDetails, district: e.target.value })
              }
              value={userDetails.district}
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
                setUserDetails({ ...userDetails, state: e.target.value })
              }
              value={userDetails.state}
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
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            value={userDetails.phone}
          />
        </div>
        <div className="form-group">
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
                      setUserDetails({ ...userDetails, image: "" });
                      console.log(userDetails);
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
        </div>
        <div className="form-group">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="select-input"
            name="role"
            id="role"
            onChange={(e) =>
              setUserDetails({ ...userDetails, role: e.target.value })
            }
            value={userDetails.role}
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
