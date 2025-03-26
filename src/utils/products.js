import axios from "axios";
import { toast } from "react-toastify"; 
const link=import.meta.env.VITE_BACKEND_LINK;
const fetch_products = async () => {
  try {
    const response = await axios.get(
      `${link}/api/shop/products/get`
    );
    return response?.data?.data || [];
  } catch (error) {
    toast.error("Failed to load products. Please try again.");
    return [];
  }
};

export default fetch_products;
