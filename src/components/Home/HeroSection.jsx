import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-amber-50 to-amber-100 text-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50 to-amber-100"></div>
      
      {/* Refined Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-amber-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      {/* Content Container with Better Spacing and Alignment */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 lg:py-32">
        {/* Content Wrapper for better text alignment */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Improved Handcrafted Label */}
          <motion.div
            className="inline-block bg-amber-500/15 border border-amber-500/30 text-amber-700 px-5 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Handcrafted with passion
          </motion.div>
          
          {/* Enhanced Heading with Improved Typography & Alignment */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-800 tracking-tight mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover <span className="text-amber-600 relative inline-block">
              Authentic
              <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-200/50 -z-10 rounded-full"></span>
            </span> Handcrafted Treasures
          </motion.h1>
          
          {/* Improved Subtitle with Better Text Alignment */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-700 mx-auto max-w-2xl mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Supporting local artisans and celebrating traditional craftsmanship.
            Every purchase helps preserve cultural heritage and sustainability.
          </motion.p>
          
          {/* Refined Buttons with Centered Alignment */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mx-auto justify-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Enhanced Shop Button */}
            <Link
              to="/shop"
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:from-amber-500 hover:to-amber-400 flex-1 flex items-center justify-center group"
            >
              <span>Shop Collection</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            {/* Enhanced Artisans Button */}
            <Link
              to="/artisans"
              className="bg-white/70 backdrop-blur-sm border border-amber-200 text-gray-800 px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-sm transition-all duration-300 hover:bg-white/90 flex-1 flex items-center justify-center"
            >
              <span>Meet Artisans</span>
            </Link>
          </motion.div>
          
          {/* Enhanced Featured Crafts Pills with Text Label Alignment */}
          <motion.div
            className="mt-10 md:mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-gray-600 mb-3">Popular categories:</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {["Pottery", "Weaving", "Textiles", "Jewelry", "Bamboo", "Woodwork"].map((craft) => (
                <Link
                  key={craft}
                  to={`/category/${craft.toLowerCase()}`}
                  className="bg-white/40 backdrop-blur-sm border border-amber-100 text-gray-700 px-4 py-1.5 rounded-full text-sm hover:bg-amber-100/70 transition-colors hover:text-amber-800 hover:border-amber-200"
                >
                  {craft}
                </Link>
              ))}
            </div>
          </motion.div>
          
          {/* Added Trust Indicators with Improved Alignment */}
          <motion.div
            className="mt-12 md:mt-16 pt-6 border-t border-amber-200/30 text-gray-600 text-sm w-full max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
              <div className="flex items-center justify-center sm:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Authentic Craft</span>
              </div>
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4m16 0v10l-8 4m-8-4V7l8-4 8 4m-8 4v10" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;