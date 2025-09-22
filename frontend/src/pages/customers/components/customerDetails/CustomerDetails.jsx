import { useParams } from "react-router-dom";

function CustomerDetails() {

    const { id } = useParams();
    console.log('id', id)
  return <div style={{color:"black"}}>Customer Details</div>;
}

export default CustomerDetails;
