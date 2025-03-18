import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  RefreshCw,
  X,
  Star,
  Sliders,
  Search,
  Heart,
  Check,
  Store,
  Gift,
  Award,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  ShoppingBag,
  Scissors,
  Combine,
  Sparkles,
  Shirt,
  Diamond,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../utils/Cart";
import { UserContext } from "../utils/user_context";

import { useContext } from "react";

import { ToastContainer, toast } from 'react-toastify';
import fetch_products from "../utils/products";

// In your JSX, add this somewhere (usually near the top)
<ToastContainer position="bottom-right" autoClose={3000} />

const categories = [
  { id: "all", name: "All Categories", icon: <ShoppingBag size={16} /> },
  { id: "Weaving", name: "Weaving", icon: <Scissors size={16} /> },
  { id: "Pottery", name: "Pottery", icon: <Combine size={16} /> },
  { id: "Bamboo", name: "Bamboo Crafts", icon: <Sparkles size={16} /> },
  { id: "Textiles", name: "Textiles", icon: <Shirt size={16} /> },
  { id: "Jewelry", name: "Jewelry", icon: <Diamond size={16} /> },
];

const ProductListing = memo(({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navi = useNavigate();
  const handleClick = (id) => {
    navi(`/shop/${id}`);
  };
  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-100 rounded-t-xl">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition duration-500 ease-out transform group-hover:scale-110"
        />

        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}

        <div
          className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => {
              handleClick(product.id);
            }}
            className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg font-medium text-sm shadow-md transition-all transform hover:scale-105"
          >
            View Details
          </button>
        </div>

        <button className="absolute top-3 right-3 h-8 w-8 bg-white bg-opacity-80 backdrop-blur-sm hover:bg-amber-50 rounded-full flex items-center justify-center shadow-sm transition-colors">
          <Heart size={16} className="text-gray-700 hover:text-amber-600" />
        </button>
      </div>
    </div>
  );
});

const Shop = () => {
  const { user, setUser } = useContext(UserContext);
  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    loading: true,
    selectedCategory: "all",
    priceRange: { min: 0, max: 500 },
    sortBy: "featured",
    mobileFiltersOpen: false,
    activePage: 1,
    itemsPerPage: 9,
    searchQuery: "",
  });
  const navigator = useNavigate();
  // Load products
  useEffect(() => {
    const loadProducts = async () => {
       try {
        const response = await fetch_products();
        setState((prev) => ({
          ...prev,
          products: response,
          filteredProducts: response,
          loading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
        toast.error("Failed to load products. Please try again.");
      }
    };
    loadProducts();
  }, []);
  
  const handleProductClick = (_id) => {
    navigator(`/product/${_id}`);
  };

  // Filter and sort products
  const filterAndSort = useCallback(() => {
    const { products, selectedCategory, priceRange, sortBy, searchQuery } =
      state;

    let filtered = [...products]
      .filter(
        (p) => selectedCategory === "all" || p.category === selectedCategory
      )
      .filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    // Add search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.artisan.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    const sortOptions = {
      "price-low": (a, b) => a.price - b.price,
      "price-high": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      featured: (a, b) => Number(b.featured) - Number(a.featured),
    };

    return filtered.sort(sortOptions[sortBy] || sortOptions.featured);
  }, [
    state.products,
    state.selectedCategory,
    state.priceRange.min,
    state.priceRange.max,
    state.sortBy,
    state.searchQuery,
  ]);

  // Update filtered products
  useEffect(() => {
    setState((prev) => ({ ...prev, filteredProducts: filterAndSort() }));
  }, [filterAndSort]);

  // Price change handler
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Math.min(500, parseInt(value, 10) || 0));

    setState((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: numericValue,
      },
      activePage: 1,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setState((prev) => ({
      ...prev,
      selectedCategory: "all",
      priceRange: { min: 0, max: 500 },
      sortBy: "featured",
      activePage: 1,
      searchQuery: "",
    }));
  };

  // Handle search
  const handleSearch = (e) => {
    setState((prev) => ({
      ...prev,
      searchQuery: e.target.value,
      activePage: 1,
    }));
  };

  // Rating component
  const RatingStars = memo(({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < Math.floor(rating)
              ? "fill-amber-500 text-amber-500"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  ));

  // Filter section
  const FilterSection = memo(({ isMobile = false }) => (
    <div
      className={`bg-white rounded-xl shadow-sm ${isMobile ? "p-5" : "p-6"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm"
          aria-label="Reset filters"
        >
          <RefreshCw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={state.searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 mb-4">Categories</h3>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  selectedCategory: category.id,
                  activePage: 1,
                }))
              }
              className={`flex items-center p-3 rounded-lg transition-colors ${
                state.selectedCategory === category.id
                  ? "bg-amber-50 border-l-4 border-amber-500 text-amber-800"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span className="mr-3">{category.icon}</span>
              <span>{category.name}</span>
              {state.selectedCategory === category.id && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 mb-6">Price Range</h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>${state.priceRange.min}</span>
            <span>${state.priceRange.max}</span>
          </div>
          <div className="relative h-1 bg-gray-200 rounded-full">
            <div
              className="absolute h-full bg-amber-500 rounded-full"
              style={{
                left: `${(state.priceRange.min / 500) * 100}%`,
                right: `${100 - (state.priceRange.max / 500) * 100}%`,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Min ($)
              </label>
              <input
                type="number"
                min="0"
                max={state.priceRange.max}
                name="min"
                value={state.priceRange.min}
                onChange={handlePriceChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
                aria-label="Minimum price"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Max ($)
              </label>
              <input
                type="number"
                min={state.priceRange.min}
                max="500"
                name="max"
                value={state.priceRange.max}
                onChange={handlePriceChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Shop Promo */}

      {isMobile && (
        <div className="flex gap-2">
          <button
            onClick={() =>
              setState((prev) => ({ ...prev, mobileFiltersOpen: false }))
            }
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() =>
              setState((prev) => ({ ...prev, mobileFiltersOpen: false }))
            }
            className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  ));

  // Product grid
  const ProductGrid = memo(() => {
    const { loading, filteredProducts, activePage, itemsPerPage } = state;
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );

    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="bg-gray-200 aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (!paginatedProducts.length) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm"
        >
          <div className="mb-4 text-amber-400 mx-auto w-max">
            <Sliders size={48} className="rotate-90" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters</p>
          <button
            onClick={resetFilters}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <ProductListing product={product} />
              <div className="p-4" onClick={()=>{handleProductClick(product._id)}}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                    {product.title}
                  </h3>
                  <span className="text-amber-600 font-semibold">
                    ${product.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <RatingStars rating={product.averageReview} />
                  <span className="text-xs text-gray-500">
                    {product.category}
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(user.id, product._id, 1)
                      .then(() => {
                        // Show a success message (optional)
                        toast.success(`${product.name} added to cart`);
                        // Navigate to cart page after adding to cart
                        navigator("/cart");
                      })
                      .catch((error) => {
                        // Handle any errors
                        toast.error("Failed to add item to cart");
                        console.error("Error adding to cart:", error);
                      });
                  }}
                  className="mt-3 w-full bg-white border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    activePage: Math.max(1, prev.activePage - 1),
                  }))
                }
                disabled={state.activePage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                aria-label="Previous page"
              >
                Previous
              </button>

              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() =>
                    setState((prev) => ({ ...prev, activePage: i + 1 }))
                  }
                  className={`px-4 py-2 rounded-lg ${
                    state.activePage === i + 1
                      ? "bg-amber-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    activePage: Math.min(pageCount, prev.activePage + 1),
                  }))
                }
                disabled={state.activePage === pageCount}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </>
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 md:w-3/5">
              <div className="flex items-center mb-2">
                <Award size={24} className="mr-2 text-amber-200" />
                <span className="text-amber-100 font-medium">
                  Premium Quality
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Artisan Marketplace
              </h1>
              <p className="text-amber-100 text-lg mb-6 max-w-lg">
                Discover unique handcrafted products from around the world,
                expertly made by skilled artisans.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    navigator("/cart");
                  }}
                  className="bg-white text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium shadow-md transition-colors flex items-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Go to Cart
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, mobileFiltersOpen: true }))
          }
          className="md:hidden w-full mb-6 flex items-center justify-center gap-2 py-2.5 px-4 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Open filters"
        >
          <Filter size={18} className="text-amber-600" />
          <span className="font-medium">Filter Products</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-full md:w-80">
            <FilterSection />
          </div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6"
            >
              <p className="text-gray-600 mb-3 sm:mb-0">
                <span className="font-medium">
                  {state.filteredProducts.length}
                </span>{" "}
                products
                {state.selectedCategory !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="text-amber-600 font-medium">
                      {
                        categories.find((c) => c.id === state.selectedCategory)
                          ?.name
                      }
                    </span>
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3">
                <label className="text-gray-600">Sort by:</label>
                <select
                  value={state.sortBy}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, sortBy: e.target.value }))
                  }
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </motion.div>

            <ProductGrid />
          </div>
        </div>
      </div>

      {/* Featured Artisans Section */}
      <div className="bg-amber-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Featured Artisans
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Maya Crafts",
              "Pottery Masters",
              "Eco Designs",
              "Silver Artisans",
            ].map((artisan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-200">
                  <img
                    src={`https://media.istockphoto.com/id/871957726/photo/senior-craftsman.jpg?s=612x612&w=0&k=20&c=i7DtAA0cvU5PID2tak5X7qU7uGWB0WtG3p0sH7Q1CHI=`}
                    alt={artisan}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{artisan}</h3>
                <p className="text-gray-500 text-sm mb-4">Master Artisan</p>
                <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                  View Profile →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {state.mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 md:hidden"
            onClick={() =>
              setState((prev) => ({ ...prev, mobileFiltersOpen: false }))
            }
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white p-4 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSection isMobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
