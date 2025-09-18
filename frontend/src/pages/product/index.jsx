import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function ProductHome() {
  const { data, isLoading } = useQuery({
    queryKey: "products", queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
    }
  });
  console.log(data);
  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>Product Home Page</p>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductHome;

   