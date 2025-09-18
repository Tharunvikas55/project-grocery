// import { useState } from "react";
// import "./filters.css";
// import { useEffect } from "react";

// function Filters() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   console.log(selectedAddress);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           import.meta.env.VITE_API_BASE_URL + "/customers/address"
//         );
//         const result = await response.json();
//         setData(result);
//         console.log(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load addresses");
//       }
//     };
//     fetchData();
//   }, []);
//   console.log(data);

//   return (
//     <div className="filters-container">
//       <div className="form-group">
//         <label htmlFor="address" className="form-label">
//           Address
//         </label>
//         <select
//           name="address"
//           id="address"
//           className="select-input"
//           value={selectedAddress}
//           onChange={(e) => setSelectedAddress(e.target.value)}
//         >
//           <option value="">Select Address</option>
//           {data.length === 0 ? (
//             <option disabled>Loading addresses...</option>
//           ) : (
//             data.map((item) => (
//               <option key={item.address} value={item.address}>
//                 {item.address}
//               </option>
//             ))
//           )}
//         </select>
//         {error && <p className="error-text">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default Filters;


function Filters({ search, setSearch }) {
  return (
    <div className="filters-container">
      <div className="form-group">
        <label className="form-label">Search by Address or Phone</label>
        <input
          type="text"
          placeholder="Enter address or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
