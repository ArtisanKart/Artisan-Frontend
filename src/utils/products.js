import axios from "axios";
import { toast } from "react-toastify"; 
const fetch_products = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );
    return response?.data?.data || [];
  } catch (error) {
    toast.error("Failed to load products. Please try again.");
    return [];
  }
};

export default fetch_products;
