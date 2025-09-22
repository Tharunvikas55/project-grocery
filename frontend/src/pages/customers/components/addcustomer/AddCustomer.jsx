import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./addCustomer.css";
import awsImageUpload from "../../../../utils/awsImageUpload";

function AddCustomer() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    phone: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file]);

  const validateForm = () => {
    if (!userDetails.username || !userDetails.email || !userDetails.phone)
      return "Please fill in all required fields.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) return "Invalid email format.";

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userDetails.phone))
      return "Invalid phone number format.";

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

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
    const uploadedimageUrl = await awsImageUpload(file);
    setLoading(false);
    setImageUrl(uploadedimageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      setLoading(true);
      const postData = { ...userDetails, image: imageUrl };
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/customers`,
        postData
      );

      setUserDetails({
        username: "",
        email: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        phone: "",
        role: "",
        image: "",
      });
      setFile(null);
      setImageUrl("");
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
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
            value={userDetails.username}
            onChange={handleChange}
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
            value={userDetails.email}
            onChange={handleChange}
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
              value={userDetails.address}
              onChange={handleChange}
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
              onChange={handleChange}
              value={userDetails.pincode}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
        <button type="submit" className="submit-button" disabled={loading}>
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
