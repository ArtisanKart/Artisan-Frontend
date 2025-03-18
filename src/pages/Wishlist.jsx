import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import ProductCard from '../components/Product/ProductCard';
import { motion } from 'framer-motion';
import { fetchwishlist, removefromwishlist } from '../utils/wishlist';
import { UserContext } from '../utils/user_context';
import { toast } from 'react-toastify';
import { HeartOff, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await fetchwishlist(user.id);
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        setError(error.message);
        toast.error('Could not load your wishlist');
      } finally {
        setIsLoading(false);
      }
    };

    getWishlist();
  }, [user.id]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const response = await removefromwishlist(user.id, itemId);
      if (!response.success) {
        throw new Error('Failed to remove item from wishlist');
      }
      toast.success('Item removed from wishlist');
      setWishlist(wishlist.filter((item) => item.id !== itemId));
    } catch (error) {
      setError(error.message);
      toast.error('Could not remove item from wishlist');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-amber-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-amber-200 rounded"></div>
                  <div className="h-4 bg-amber-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-800">Your Wishlist</h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {wishlist.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wishlist.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <div className="relative group">
                  <ProductCard
                    product={item}
                    isInWishlist={true}
                    onWishlistChange={() => handleRemoveFromWishlist(item.id)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg shadow-sm">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-amber-100 rounded-full">
                <HeartOff className="h-12 w-12 text-amber-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-600 text-lg mb-6">Add items to your wishlist to save them for later</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;