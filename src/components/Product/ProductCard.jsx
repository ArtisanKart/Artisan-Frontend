import React, { useContext, useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addtowishlist, removefromwishlist } from '../../utils/wishlist';
import { toast } from 'react-toastify';
import { UserContext } from '../../utils/user_context';

const ProductCard = ({ product }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Destructuring product properties
  const { _id, name, image, price, discount = 0, rating, reviewCount, isNew = false, inStock = true, isInWishlist = false } = product;
  
  const discountedPrice = price - (price * discount / 100);

  // Navigate to product details page
  const handleProductClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    
    // Navigate to product details page using the correct route structure
    navigate(`/product/${_id}`);
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    
    if (!user) {
      toast.info('Please sign in to add items to your wishlist');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        const response = await removefromwishlist(user.id, _id);
        if (!response.success) {
          throw new Error('Failed to remove item from wishlist');
        }
        toast.success('Item removed from wishlist');
      } else {
        const response = await addtowishlist(user.id, _id);
        if (!response.success) {
          throw new Error('Failed to add item to wishlist');
        }
        toast.success('Item added to wishlist');
      }
    } catch (error) {
      toast.error(isInWishlist ? 
        'Could not remove item from wishlist' : 
        'Could not add item to wishlist');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    if (!inStock) return;
    
    // Add to cart logic would go here
    toast.success(`${name} added to cart`);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge (New or Discount) */}
      {isNew && (
        <div className="absolute top-3 left-3 z-10 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          New Arrival
        </div>
      )}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {discount}% Off
        </div>
      )}
      
      {/* Wishlist button */}
      <button 
        className={`absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full 
          ${isHovered ? 'bg-white' : 'bg-white bg-opacity-70'} 
          ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} 
          transition-all duration-300 ${loading ? 'opacity-50' : ''}`}
        onClick={handleWishlistToggle}
        disabled={loading}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {loading ? (
          <div className="h-4 w-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        ) : isInWishlist ? (
          <FaHeart className="h-4 w-4" />
        ) : (
          <FaRegHeart className="h-4 w-4" />
        )}
      </button>
      
      {/* Product Image with overlay on hover */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
            <span className="px-4 py-2 bg-white bg-opacity-90 text-sm font-medium rounded-md">
              View Details
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-1 hover:text-indigo-600 transition-colors line-clamp-2 h-10">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <FaStar className="h-3.5 w-3.5 text-yellow-400" />
            <span className="ml-1 text-xs font-medium">{rating}</span>
          </div>
          <span className="mx-1.5 text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-500">{reviewCount} reviews</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {discount > 0 ? (
              <div className="flex items-center">
                <span className="font-medium text-gray-900">₹{discountedPrice.toFixed(0)}</span>
                <span className="ml-2 text-xs text-gray-500 line-through">₹{price}</span>
              </div>
            ) : (
              <span className="font-medium text-gray-900">₹{price}</span>
            )}
          </div>
          
          {/* Add to Cart button */}
          <button 
            className={`p-2 rounded-full ${inStock ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'bg-gray-100 text-gray-400'} transition-colors ${!inStock && 'opacity-50 cursor-not-allowed'}`}
            disabled={!inStock}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <FaShoppingCart className="h-4 w-4" />
          </button>
        </div>
        
        {/* Stock Status */}
        {!inStock && (
          <div className="mt-2 text-xs text-red-500">Out of Stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;