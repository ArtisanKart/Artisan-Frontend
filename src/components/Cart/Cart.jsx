import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBasket, FaGift, FaTags, FaMapMarkerAlt, FaHeart, FaShieldAlt, FaTruck } from 'react-icons/fa';
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-yellow-50 absolute top-0 left-0 right-0 h-40 -z-10"></div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
        <FaShoppingBasket className="mr-3 text-yellow-600" />
        Your Shopping Cart
      </h1>
      <p className="text-gray-600 mb-8">
        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
      </p>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <img 
            src="/images/empty-cart.svg" 
            alt="Empty Cart" 
            className="w-40 h-40 mx-auto mb-6 opacity-60"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/200x200?text=Empty+Cart";
            }}
          />
          <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
          <div className="space-y-3">
            <Link to="/shop" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full transition duration-300 font-medium flex items-center justify-center w-48 mx-auto">
              <FaShoppingBasket className="mr-2" />
              Start Shopping
            </Link>
            {user?.wishlist?.length > 0 && (
              <Link to="/wishlist" className="text-yellow-600 hover:text-yellow-700 flex items-center justify-center font-medium mt-4">
                <FaHeart className="mr-2" />
                View your wishlist
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="font-semibold text-gray-700 flex items-center">
                  <FaShoppingBasket className="mr-2 text-yellow-600" />
                  Shopping Cart
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition duration-150">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex-shrink-0">
                        <Link to={`/product/${item.productId}`}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md hover:opacity-80 transition"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/placeholder.jpg";
                            }}
                          />
                        </Link>
                      </div>
                      
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <Link to={`/product/${item.productId}`} className="hover:text-yellow-600 transition">
                              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                            </Link>
                            <p className="text-gray-500 text-sm mt-1 flex items-center">
                              <FaMapMarkerAlt className="text-yellow-600 mr-1" size={12} />
                              <Link to={`/artisan/${item.artisanId}`} className="hover:text-yellow-600 transition">
                                {item.artisan}
                              </Link>
                            </p>
                          </div>
                          <p className="text-lg font-medium text-gray-800 mt-2 sm:mt-0 flex items-center">
                            <FaTags className="text-yellow-600 mr-1" size={14} />
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                              aria-label="Increase quantity"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center">
                              <button 
                                onClick={() => moveToWishlist(item)}
                                className="text-gray-500 hover:text-red-500 transition p-2 hover:bg-gray-100 rounded-full mr-1"
                                aria-label="Move to wishlist"
                                title="Save for later"
                              >
                                <FaHeart size={16} />
                              </button>
                              <button 
                                onClick={() => removeItem(item.productId)}
                                className="text-gray-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-full"
                                aria-label="Remove item"
                                title="Remove from cart"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <Link to="/shop" className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium">
                  <FaArrowLeft className="mr-2" size={14} />
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium flex items-center"
                >
                  <FaTrash className="mr-1" size={14} />
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* You May Also Like Section */}
            
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="font-semibold text-gray-700 flex items-center">
                  <FaGift className="mr-2 text-yellow-600" />
                  Order Summary
                </h2>
              </div>
              
              <div className="p-6">
                {/* Coupon Code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Have a coupon?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r-md transition"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off your order</div>
                </div>
                
                <div className="space-y-4 pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-2"></div>
                  
                  <div className="flex justify-between py-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {subtotal < 100 && shippingCost > 0 && (
                  <div className="mb-6 p-3 bg-blue-50 text-blue-800 text-sm rounded-md border-l-4 border-blue-400">
                    <p className="font-medium flex items-center">
                      <FaTruck className="mr-2" />
                      Free shipping on orders over $100
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      Add ${(100 - subtotal).toFixed(2)} more to qualify
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <Link 
                    to="/checkout" 
                    state={{ cartItems: cartItems, subtotal: subtotal, discount: discount, total: total }}
                    className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center py-3 rounded-md font-medium transition duration-300 flex items-center justify-center"
                  >
                    <FaShoppingBasket className="mr-2" />
                    Proceed to Checkout
                  </Link>
                  
                  {/* Express checkout options */}
                 
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="text-sm text-gray-500 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                    <p className="font-medium text-yellow-800 mb-1 flex items-center">
                      <FaGift className="mr-2 text-yellow-600" />
                      Artisan Direct
                    </p>
                    <p>Your purchase directly supports independent artisans and their communities.</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-4">
                    <FaShieldAlt className="text-gray-500 mr-2" />
                    <span>Secure checkout</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTruck className="text-gray-500 mr-2" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;