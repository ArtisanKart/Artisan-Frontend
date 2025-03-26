import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBasket, 
  FaGift, FaTags, FaMapMarkerAlt, FaHeart, FaShieldAlt, 
  FaTruck, FaTag, FaPercentage 
} from 'react-icons/fa';
import { fetchCart, updateCart, removeFromCart } from '../../utils/Cart';
import { UserContext } from '../../utils/user_context';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const shippingCost = subtotal > 100 ? 0 : 20;
  const taxRate = 0.07;

  useEffect(() => {
    const getCart = async () => {
      try {
        setLoading(true);
        const data = await fetchCart(user.id);
        setCartItems(data);
        const total = Array.isArray(data)
          ? data.reduce((sum, item) => sum + item.price * item.quantity, 0)
          : 0;
        setSubtotal(total);
      } catch (error) {
        toast.error('Failed to load cart. Please try again.');
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) getCart();
  }, [user.id]);

  const tax = (subtotal - discount) * taxRate;
  
  // Calculate total
  const total = subtotal - discount + shippingCost + tax;

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 0) return;
    
    try {
      if (newQuantity === 0) {
        await removeFromCart(user.id, itemId);
        toast.success('Item removed from cart');
      } else {
        await updateCart(user.id, itemId, newQuantity);
        toast.success('Cart updated');
      }
    
      const updatedData = await fetchCart(user.id);
      setCartItems(updatedData);
    
      const total = Array.isArray(updatedData)
        ? updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;
      setSubtotal(total);
    } catch (error) {
      toast.error('Failed to update cart. Please try again.');
      console.error('Error updating cart:', error);
    }
  };
  
  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      await removeFromCart(user.id, itemId);
      setCartItems(cartItems.filter(item => item.productId !== itemId));
      toast.success('Item removed from cart');
      
      // Update subtotal after removing item
      const updatedSubtotal = cartItems
        .filter(item => item.productId !== itemId)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
      setSubtotal(updatedSubtotal);
    } catch (error) {
      toast.error('Failed to remove item. Please try again.');
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      // This would require a backend endpoint to clear the entire cart
      // For now, we'll remove each item individually
      for (const item of cartItems) {
        await removeFromCart(user.id, item.productId);
      }
      setCartItems([]);
      setSubtotal(0);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart. Please try again.');
      console.error('Error clearing cart:', error);
    }
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.warning('Please enter a coupon code');
      return;
    }
    
    // Mock coupon logic - in a real app, this would validate against the backend
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discountAmount = subtotal * 0.1; // 10% discount
      setDiscount(discountAmount);
      toast.success('Coupon applied: 10% discount');
    } else if (couponCode.toUpperCase() === 'ARTISAN25') {
      const discountAmount = subtotal * 0.25; // 25% discount
      setDiscount(discountAmount);
      toast.success('Coupon applied: 25% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const moveToWishlist = (item) => {
    // Mock implementation - would need actual wishlist functionality
    removeItem(item.productId);
    toast.success(`${item.name} moved to your wishlist`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="relative">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 absolute inset-0 -z-10 rounded-2xl"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <FaShoppingBasket className="mr-3 text-yellow-600" />
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <img 
                  src="/images/empty-cart.svg" 
                  alt="Empty Cart" 
                  className="w-64 h-64 mx-auto mb-6 opacity-70"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Your cart feels lonely
                </h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <Link 
                  to="/shop" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full transition duration-300 flex items-center justify-center w-64 mx-auto"
                >
                  <FaShoppingBasket className="mr-2" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col sm:flex-row items-start sm:items-center"
                  >
                    {/* Cart Item Details */}
                    <div className="flex-shrink-0 mr-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm flex items-center mt-1">
                            <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                            {item.artisan}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                          >
                            <FaMinus size={12} className="text-gray-600" />
                          </button>
                          <span className="font-medium text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                          >
                            <FaPlus size={12} className="text-gray-600" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => moveToWishlist(item)}
                              className="text-gray-500 hover:text-yellow-600 transition"
                              title="Save for later"
                            >
                              <FaHeart />
                            </button>
                            <button 
                              onClick={() => removeItem(item.productId)}
                              className="text-gray-500 hover:text-red-600 transition"
                              title="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Column */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaGift className="mr-3 text-yellow-600" />
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4 py-2 transition"
                  >
                    <FaTag />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Try "WELCOME10" for 10% off!
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-4 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <FaPercentage className="mr-2" /> Discount
                    </span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mt-4 font-bold text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Link 
                to="/checkout"
                state={{ cartItems, subtotal, discount, total }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-full mt-6 flex items-center justify-center transition"
              >
                <FaShoppingBasket className="mr-2" /> 
                Proceed to Checkout
              </Link>

              {/* Additional Cart Benefits */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-yellow-600" />
                  Secure Checkout
                </div>
                <div className="flex items-center">
                  <FaTruck className="mr-2 text-yellow-600" />
                  Free 30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;