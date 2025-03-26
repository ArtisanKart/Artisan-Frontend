import axios from "axios";
import { toast } from "react-toastify"; // Make sure toast is imported
const link=import.meta.env.VITE_BACKEND_LINK;

export const addToCart = async (userId, productId, quantity) => {
  try {
    const body = {
      userId,
      productId,
      quantity,
    };

    const response = await axios.post(`${link}/api/shop/cart/add`, body);

    if (response.status === 200) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Failed to add product to cart.");
    }
  } catch (e) {
    toast.error("An error occurred while adding product to cart.");
    console.error(e);
  }
};

export const fetchCart = async (userId)=>{
  try {
    const response = await axios.get(`${link}/api/shop/cart/get/${userId}`);
    return response?.data?.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    toast.error("Failed to fetch cart. Please try again.");
    return [];
  }
};

export const updateCart = async (userId, productId,quantity) => {
   try {
    const body = {
      userId,
      productId,
      quantity,
    };
    const response = await axios.put(`${link}/api/shop/cart/update-cart`, body);
    if (response.status === 200) {
      toast.success("Cart updated successfully!");
    } else {
      toast.error("Failed to update cart.");
    }
  } catch (error) {
    toast.error("An error occurred while updating cart.");
    console.error(error);
  }
};


export const removeFromCart = async (userId, productId) => {
  try {
    
    const response = await axios.delete(`${link}/api/shop/cart/${userId}/${productId}`);
    if (response.status === 200) {
      toast.success("Product removed from cart successfully!");
    } else {
      toast.error("Failed to remove product from cart.");
    }
  } catch (error) {
    toast.error("An error occurred while removing product from cart.");
    console.error(error);
  }
}