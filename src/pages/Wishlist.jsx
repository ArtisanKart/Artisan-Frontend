import React, { useState, useEffect, useContext, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchwishlist, removefromwishlist } from "../utils/wishlist";
import { UserContext } from "../utils/user_context";
import { toast } from "react-toastify";
import { HeartOff, Star } from "lucide-react";
import Layout from "../Layout";
import ProductListing from "../components/Product/ProductCard";
import { addToCart } from "../utils/Cart"; // Import addToCart function

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const getWishlist = async () => {
      try {
        const response = await fetchwishlist(user.id);
        setWishlist(Array.isArray(response) ? response : []);
      } catch (error) {
        toast.error("Could not load your wishlist");
      } finally {
        setIsLoading(false);
      }
    };

    getWishlist();
  }, [user?.id]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removefromwishlist(user.id, productId);
      toast.success("Item removed from wishlist");
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId !== productId));
    } catch (error) {
      toast.error("Could not remove item from wishlist");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading wishlist...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
          <HeartOff size={48} />
          <p className="mt-2">Your wishlist is empty.</p>
          <Link to="/shop" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <ProductListing product={product} />
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
