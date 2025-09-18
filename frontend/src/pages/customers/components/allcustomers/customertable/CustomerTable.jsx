function CustomerTable({ customers }) {

    return (
        <div className="customer-table">
            <h3 className="table-title">Customer Table</h3>
            {
                customers.length > 0 ? (
                    <table style={{ width: "100%", borderCollapse: "collapse" ,color:"black"}}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td><img src={customer.image} alt={customer.name} style={{ width: "50px", height: "50px" }} /></td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No customers found.</p>
                )
            }
        </div>
    );
}

export default CustomerTable;