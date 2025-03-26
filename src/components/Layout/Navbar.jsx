import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart, 
  LogOut, 
  ShoppingBag, 
  Heart as HeartIcon,
  ChevronDown
} from "lucide-react";
import { UserContext } from "../../utils/user_context";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../utils/Cart";
import { fetchwishlist } from "../../utils/wishlist";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wishlistcount,setwishcount]=useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const link=import.meta.env.VITE_BACKEND_LINK;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
   
  // Fetch cart items
  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart(user.id);
        setCartCount(data.length);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
  
    if (user?.id) getCart();
  }, [user.id]);
   useEffect(() => {
      if (!user?.id) return;
      const getWishlist = async () => {
        try {
          const response = await fetchwishlist(user.id);
          setwishcount(response.length);
        } catch (error) {
          toast.error("Could not load your wishlist");
        }
      };
  
      getWishlist();
    }, [user?.id]);

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Handle login
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    try {
      await axios.post(`${link}/api/auth/logout`, {}, {
        withCredentials: true 
      });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Navigation menu items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Artisans", path: "/artisans" },
    { name: "About", path: "/about" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md py-3" 
          : "bg-white/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <motion.div
            className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl overflow-hidden shadow-md"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-bold text-lg">AK</span>
          </motion.div>
          <div className="ml-3">
            <span className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-all duration-300">
              Artisan<span className="text-amber-600">Kart</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-500 -mt-1">Handcrafted with love</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-sm font-medium transition-all duration-300 group ${
                isActive(item.path)
                  ? "text-amber-600 font-semibold"
                  : "text-gray-700 hover:text-amber-600"
              }`}
            >
              {item.name}
              <motion.span 
                layoutId={`underline-${item.name}`}
                className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                }`} 
              />
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <div className={`relative transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
            <input
              type="text"
              placeholder="Search artisan crafts..."
              className={`pl-10 pr-4 py-2 rounded-full text-sm border transition-all duration-300 w-full ${
                searchFocused 
                  ? "border-amber-400 ring-2 ring-amber-200" 
                  : "border-gray-200 hover:border-amber-300"
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                searchFocused ? "text-amber-500" : "text-gray-400"
              }`} 
              size={18} 
            />
          </div>

          {/* Wishlist Icon */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/wishlist" 
              className="relative p-2 rounded-full text-gray-600 hover:text-amber-600 transition-all duration-300"
            >
              <Heart size={20} />
              {wishlistcount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 shadow-sm"
                >
                  {wishlistcount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Cart Icon */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link 
              to="/cart" 
              className="p-2 rounded-full text-gray-600 hover:text-amber-600 transition-all duration-300"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* User Account Button */}
          <div className="relative" ref={userMenuRef}>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleUserMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all duration-300"
            >
              <User size={18} />
              {isLoggedIn && (
                <ChevronDown 
                  size={14} 
                  className={`ml-1 transition-transform duration-300 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </motion.button>
            
            {/* User Menu Dropdown */}
            {  (
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-20 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-amber-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { icon: User, name: "My Profile", path: "/my-profile" },
                        { icon: ShoppingBag, name: "My Orders", path: "/my-orders" },
                        { icon: HeartIcon, name: "Saved Items", path: "/wishlist" }
                      ].map((item) => (
                        <Link 
                          key={item.name}
                          to={item.path} 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
                        >
                          <item.icon size={16} className="mr-3" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-300"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link to="/cart" className="p-2 text-gray-600">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </motion.div>
          
          {/* Mobile User Icon */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleUserMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600"
          >
            <User size={16} />
          </motion.button>
          
          <motion.button 
            whileHover={{ rotate: 90 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-md text-gray-500 hover:text-amber-600 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
              {/* Mobile Search */}
              <div className="relative my-3">
                <input 
                  type="text" 
                  placeholder="Search artisan crafts..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm border border-gray-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-400" 
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-amber-50 text-amber-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div 
                        className="w-1.5 h-1.5 bg-amber-500 rounded-full ml-auto"
                        layoutId="activeIndicator"
                      />
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Account Options */}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link to="/wishlist" className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600">
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </Link>
                
                <Link to="/my-profile" className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600">
                      <User size={18} className="mr-3" />
                      My Profile
                    </Link>
                    <Link to="/my-orders" className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600">
                      <ShoppingBag size={18} className="mr-3" />
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    >
                      <LogOut size={18} className="mr-3" />
                      Sign out
                  </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;