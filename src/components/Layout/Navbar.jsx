import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Search, Menu, X, Heart, LogOut, ShoppingBag, Heart as HeartIcon, Home, Store, Users, Info } from "lucide-react";
import { UserContext } from "../../utils/user_context";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const isLoggedIn = !!user;

  // Navigation links configuration
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Shop", path: "/shop", icon: <Store size={18} /> },
    { name: "Artisans", path: "/artisans", icon: <Users size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> }
  ];

  // Debounced scroll handler for better performance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener("scroll", debouncedHandleScroll);
    
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle clicks outside user menu
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

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Utility function for debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const isActive = useCallback((path) => location.pathname === path, [location]);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setUser(null);
      setUserMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/80 backdrop-blur-md py-4"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group" aria-label="ArtisanKart Home">
          <motion.div
            className="flex items-center justify-center h-10 w-10 bg-amber-600 text-white rounded-lg overflow-hidden shadow-md"
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
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-sm font-medium transition-all duration-300 group ${
                isActive(item.path)
                  ? "text-amber-600 font-semibold"
                  : "text-gray-700 hover:text-amber-600"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.name}
              <span 
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
          <form onSubmit={handleSearch} className={`relative transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search crafts... (Ctrl+K)"
              className={`pl-10 pr-4 py-2 rounded-full text-sm border transition-all duration-300 w-full ${
                searchFocused 
                  ? "border-amber-400 ring-2 ring-amber-200" 
                  : "border-gray-200 hover:border-amber-300"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search products"
            />
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                searchFocused ? "text-amber-500" : "text-gray-400"
              }`} 
              size={18} 
            />
          </form>

          {/* Wishlist Icon */}
          <Link 
            to="/wishlist" 
            className="relative p-2 rounded-full text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative p-2 rounded-full text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account Button */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={isLoggedIn ? toggleUserMenu : () => navigate('/login')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all duration-300 hover:scale-110"
              aria-label={isLoggedIn ? "Open user menu" : "Login"}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <User size={18} />
            </button>
            
            {/* User Menu Dropdown */}
            {isLoggedIn && (
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-20"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link 
                      to="/my-profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
                      role="menuitem"
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link 
                      to="/my-orders" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
                      role="menuitem"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      My Orders
                    </Link>
                    <Link 
                      to="/saved-items" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
                      role="menuitem"
                    >
                      <HeartIcon size={16} className="mr-2" />
                      Saved Items
                    </Link>
                    <div className="my-1 h-px bg-gray-200"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
                      role="menuitem"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link 
            to="/cart" 
            className="relative p-2 text-gray-600 hover:text-amber-600"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Mobile User Icon */}
          <button 
            onClick={isLoggedIn ? toggleUserMenu : () => navigate('/login')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200"
            aria-label={isLoggedIn ? "User menu" : "Login"}
          >
            <User size={16} />
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-md text-gray-500 hover:text-amber-600 transition-colors duration-300"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative my-3">
                <input 
                  type="text" 
                  placeholder="Search artisan crafts..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm border border-gray-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-400" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                  aria-label="Submit search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              
              <div className="space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-amber-50 text-amber-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    }`}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    <span className="mr-3">{item.icon}</span>
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
                <Link 
                  to="/wishlist" 
                  className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </Link>
                
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/my-profile" 
                      className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    >
                      <User size={18} className="mr-3" />
                      My Profile
                    </Link>
                    <Link 
                      to="/my-orders" 
                      className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    >
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
                  </>
                ) : (
                  <button 
                    onClick={() => navigate('/login')}
                    className="block w-full text-center text-white bg-amber-600 hover:bg-amber-700 py-3 rounded-lg transition-colors duration-300 shadow-sm font-medium"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;