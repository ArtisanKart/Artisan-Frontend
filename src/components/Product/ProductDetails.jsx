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
  AlertCircle,
} from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../utils/user_context";
import { addtowishlist, removefromwishlist } from "../../utils/wishlist";
import { addToCart } from "../../utils/Cart";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from URL params
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!product);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(product?.isInWishlist || false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  
  // Fetch product data if not provided in location state
  useEffect(() => {
    if (!product && productId) {
      setIsLoading(true);
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/shop/products/get/${productId}`);
          const result = await response.json();
          setProduct(result.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProduct();
    }
  }, [productId, product]);
  
  
  const handleAddToCart = async (quantity) => {
    addToCart(user.id, product._id, quantity)
                          .then(() => {
                            toast.success(`${product.name} added to cart`);
                            setIsLoading(false);
                          })
                          .catch((error) => {
                            // Handle any errors
                            toast.error("Failed to add item to cart");
                            console.error("Error adding to cart:", error);
                          });
  };
  
  const handleWishlistToggle = async () => {
    if (!user) {
      toast.info('Please sign in to add items to your wishlist');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (inWishlist) {
        const response = await removefromwishlist(user.id, productId);
        if (!response.success) {
          throw new Error('Failed to remove item from wishlist');
        }
        setInWishlist(false);
        toast.success('Item removed from wishlist');
      } else {
        const response = await addtowishlist(user.id, productId);
        if (!response.success) {
          throw new Error('Failed to add item to wishlist');
        }
        setInWishlist(true);
        toast.success('Item added to wishlist');
      }
    } catch (error) {
      toast.error(inWishlist ? 
        'Could not remove item from wishlist' : 
        'Could not add item to wishlist');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product information...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the product you're looking for.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  // Create a combined product data object using values from the passed product
  // with fallbacks to the hardcoded values
  const productData = {
    name: product.name || "Handwoven Rattan Basket",
    description: product.description || "Perfect for storage or decoration, made from natural rattan fibers.",
    category: product.category || "Weaving",
    price: product.price || 28,
    salePrice: product.discount ? (product.price - (product.price * product.discount / 100)) : (product.salePrice || 22.5),
    totalStock: product.stock || 10,
    averageReview: product.rating || 4.5,
    reviewCount: product.reviewCount || 24,
    material: product.material || "Natural Rattan",
    dimensions: product.dimensions || "12″ × 10″ × 8″",
    weight: product.weight || "1.2 lbs",
    care: product.care || "Wipe with dry cloth, avoid moisture",
    artisan: product.artisan || "Green Crafters Collective",
    discount: product.discount || 0,
    inStock: product.inStock !== undefined ? product.inStock : true,
    image: product.image || "https://via.placeholder.com/600x400"
  };

  const calculateDiscountPercentage = () => {
    if (product.discount) return product.discount;
    return Math.round(((productData.price - productData.salePrice) / productData.price) * 100);
  };

  const stockStatus = !productData.inStock 
    ? { status: "Out of stock", icon: AlertCircle, color: "text-red-600" }
    : productData.totalStock > 5 
    ? { status: "In stock", icon: Check, color: "text-green-600" }
    : productData.totalStock > 0 
      ? { status: "Low stock", icon: AlertCircle, color: "text-amber-600" }
      : { status: "Pre-order", icon: Clock, color: "text-blue-600" };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-gray-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </button>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
            {/* Product Image - Take up more space on larger screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 p-6 md:p-8"
            >
              <div className="bg-neutral-50 rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 p-6 md:p-8 flex flex-col"
            >
              {/* Category tag & Rating */}
              <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {productData.category}
                </span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(productData.averageReview)
                            ? "text-amber-400 fill-amber-400"
                            : i < productData.averageReview
                            ? "text-amber-400 fill-amber-400 half-star"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {productData.averageReview} ({productData.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title and Price */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {productData.name}
              </h1>
              
              <div className="mb-4">
                {productData.discount > 0 || productData.salePrice < productData.price ? (
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-2xl font-bold text-green-700">
                      ${productData.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${productData.price.toFixed(2)}
                    </span>
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                      {calculateDiscountPercentage()}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-green-700">
                    ${productData.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center mb-6">
                <stockStatus.icon size={16} className={`mr-1.5 ${stockStatus.color}`} />
                <span className={`${stockStatus.color} font-medium`}>
                  {stockStatus.status}
                  {stockStatus.status === "Low stock" && ` (${productData.totalStock} left)`}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{productData.description}</p>

              {/* Sustainability */}
              <div className="flex items-center p-4 bg-green-50 border border-green-100 rounded-lg mb-6">
                <Leaf size={20} className="text-green-600 mr-3 flex-shrink-0" />
                <span className="text-green-800 text-sm">
                  Handcrafted from sustainable materials, supporting ethical production practices.
                </span>
              </div>

              {/* Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm">
                    <p className="text-gray-500">Material:</p>
                    <p className="text-gray-800 font-medium">
                      {productData.material}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Dimensions:</p>
                    <p className="text-gray-800 font-medium">
                      {productData.dimensions}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Weight:</p>
                    <p className="text-gray-800 font-medium">{productData.weight}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Care:</p>
                    <p className="text-gray-800 font-medium">{productData.care}</p>
                  </div>
                </div>
              </div>

              {/* Artisan Info */}
              <div className="mb-6 flex items-center p-4 bg-neutral-50 border border-neutral-100 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-3 flex-shrink-0">
                  {productData.artisan.split(' ').map(word => word[0]).join('')}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Crafted by</p>
                  <Link
                    to={`/artisans/123`}
                    className="text-green-700 font-medium hover:underline"
                  >
                    {productData.artisan}
                  </Link>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <label htmlFor="quantity" className="text-gray-700 mr-4 font-medium">
                  Quantity:
                </label>
                <div className="flex items-center border border-neutral-200 rounded-lg shadow-sm">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-l-lg transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center py-2 text-gray-800 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-r-lg transition-colors"
                    disabled={quantity >= productData.totalStock || !productData.inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart(quantity)}
                  disabled={!productData.inStock}
                  className={`flex-1 flex items-center justify-center px-6 py-3.5 rounded-lg font-medium shadow-sm ${
                    productData.inStock 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {productData.inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlistToggle}
                    disabled={loading}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg border transition-colors ${
                      inWishlist 
                        ? "border-red-200 bg-red-50 text-red-500" 
                        : "border-neutral-200 text-gray-600 hover:bg-neutral-50"
                    } ${loading ? "opacity-50" : ""}`}
                  >
                    {loading ? (
                      <div className="h-4 w-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                      <Heart
                        size={20}
                        className={inWishlist ? "fill-red-500" : ""}
                      />
                    )}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-neutral-200 text-gray-600 hover:bg-neutral-50 transition-colors"
                  >
                    <Share size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;