import axios from "axios";
import { toast } from "react-toastify"; // Make sure toast is imported
const link=import.meta.env.VITE_BACKEND_LINK;
export const addtowishlist = async (userId, productId) => {
  try {
    const body = {
      userId,
      productId,
    };

    const response = await axios.post(`${link}/api/shop/wishlist/add`, body);

    if (response.status === 200) {
      toast.success("Product added to wishlist successfully!");
    } else {
      toast.error("Failed to add product to wishlist.");
    }
  } catch (e) {
    toast.error("An error occurred while adding product to wishlist.");
    console.error(e);
  }
};

export const fetchwishlist = async (userId)=>{
  try {
    const response = await axios.get(`${link}/api/shop/wishlist/get/${userId}`);
    return response?.data?.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    toast.error("Failed to fetch wishlist. Please try again.");
    return [];
  }
};

export const removefromwishlist = async (userId, productId) => {
  try {
    
    const response = await axios.delete(`${link}/api/shop/wishlist/${userId}/${productId}`);
    if (response.status === 200) {
      toast.success("Product removed from wishlist successfully!");
    } else {
      toast.error("Failed to remove product from wishlist.");
    }
  } catch (error) {
    toast.error("An error occurred while removing product from wishlist.");
    console.error(error);
  }
}