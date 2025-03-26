import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share,
  Leaf,
  Clock,
  Check,
  AlertCircle
} from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../utils/user_context";
import { addtowishlist, removefromwishlist } from "../../utils/wishlist";
import { addToCart } from "../../utils/Cart";
import ProductReviews from "./productreveiw";
const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!product);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const link=import.meta.env.VITE_BACKEND_LINK;
  const { user } = React.useContext(UserContext);
  // Fetch product data if not provided in location state
  useEffect(() => {
    if (!product && productId) {
      setIsLoading(true);
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${link}/api/shop/products/get/${productId}`);
          const result = await response.json();
          setProduct(result.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Failed to fetch product details");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProduct();
    }
  }, [productId, product]);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please sign in to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(user.id, product._id, quantity);
      navigate('/cart');
      toast.success(`${product.title} added to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Error adding to cart:", error);
    }
  };
  
  const handleWishlistToggle = async () => {
    if (!user) {
      toast.info('Please sign in to manage wishlist');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (inWishlist) {
        await removefromwishlist(user.id, productId);
        setInWishlist(false);
        toast.success('Item removed from wishlist');
      } else {
        await addtowishlist(user.id, productId);
        setInWishlist(true);
        toast.success('Item added to wishlist');
      }
    } catch (error) {
      toast.error(inWishlist 
        ? 'Could not remove item from wishlist' 
        : 'Could not add item to wishlist');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stock status determination
  const stockStatus = product.totalStock > 5 
    ? { status: "In Stock", icon: Check, color: "text-green-600" }
    : product.totalStock > 0 
      ? { status: "Low Stock", icon: AlertCircle, color: "text-amber-600" }
      : { status: "Out of Stock", icon: AlertCircle, color: "text-red-600" };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.price - product.salePrice) / product.price) * 100
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-gray-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </button>
        </nav>

        {/* Product Container */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-100 flex items-center justify-center p-8"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8 space-y-6"
          >
            {/* Category and Rating */}
            <div className="flex justify-between items-center">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.averageReview || 0)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.averageReview || 0})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-700">
                ${product.salePrice.toFixed(2)}
              </span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center">
              <stockStatus.icon size={20} className={`mr-2 ${stockStatus.color}`} />
              <span className={`${stockStatus.color} font-medium`}>
                {stockStatus.status}
                {stockStatus.status === "Low Stock" && ` (${product.totalStock} left)`}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Sustainability Highlight */}
            <div className="flex items-center bg-green-50 p-4 rounded-lg">
              <Leaf className="text-green-600 mr-3" size={24} />
              <span className="text-green-800 text-sm">
                Sustainable and ethically crafted product
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-green-600 hover:bg-green-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-green-600 hover:bg-green-50"
                  disabled={quantity >= product.totalStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.totalStock === 0}
                className={`
                  flex-1 py-3.5 rounded-lg transition-colors flex items-center justify-center
                  ${product.totalStock > 0 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <ShoppingCart className="mr-2" /> 
                {product.totalStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                disabled={loading}
                className={`
                  p-3.5 rounded-lg transition-colors
                  ${inWishlist 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-neutral-100 text-gray-600 hover:bg-neutral-200'
                  }
                  ${loading ? 'opacity-50' : ''}
                `}
              >
                <Heart className={inWishlist ? 'fill-current' : ''} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3.5 rounded-lg bg-neutral-100 text-gray-600 hover:bg-neutral-200"
              >
                <Share />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <ProductReviews productId={product._id}></ProductReviews>
    </div>
  );
};

export default ProductDetail;