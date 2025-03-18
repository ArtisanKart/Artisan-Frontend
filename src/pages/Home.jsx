import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import CategorySection from '../components/Home/CategorySection';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Testimonials from '../components/Home/Testimonials';
import { motion } from 'framer-motion';

const Home = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Section */}
      <div className="scroll-mt-16" id="categories">
        <CategorySection />
      </div>
      
      {/* Featured Products Section */}
      <div className="scroll-mt-16" id="featured">
        <FeaturedProducts />
      </div>
      
      {/* Testimonials Section */}
      <div className="scroll-mt-16" id="testimonials">
        <Testimonials />
      </div>
      
      {/* Join Artisan Section */}
      <div className="scroll-mt-16" id="join">
        <JoinArtisanSection />
      </div>
    </div>
  );
};

const JoinArtisanSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-100 to-amber-50/30 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements - Match Hero Section Style */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-amber-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-amber-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Badge - Matching Hero Badge Style */}
          <div className="inline-block bg-amber-500/15 border border-amber-500/30 text-amber-700 px-5 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            For Artisans
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 tracking-tight leading-tight">
            Join Our Community of <span className="text-orange-600 relative inline-block">
              Artisans
              <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-200/50 -z-10 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            Are you a craftsperson looking to share your unique creations with the world?
            Join our marketplace and connect with customers who value handmade quality.
          </p>
          
          {/* Features - Amber Theme Consistency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-full text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Fair Commission</h3>
                <p className="text-sm text-gray-600">Lower fees than other marketplaces</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-full text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Quick Payments</h3>
                <p className="text-sm text-gray-600">Get paid within 48 hours</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-full text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Global Reach</h3>
                <p className="text-sm text-gray-600">Connect with customers worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/admin-panel/"
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center group"
            >
              <span>Start Selling Today</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/artisans"
              className="bg-white/60 backdrop-blur-sm border border-amber-200 text-gray-800 px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-sm transition-all duration-300 hover:bg-white/90 flex-1 flex items-center justify-center"
            >
              Meet Our Artisans
            </Link>
          </div>
          
          {/* Testimonial */}
          <div className="mt-12 pt-6 border-t border-amber-200/30 text-gray-600 text-sm">
            <blockquote className="italic text-gray-600">
              "Joining this marketplace transformed my small pottery business. The support and exposure have been incredible!"
            </blockquote>
            <p className="text-sm font-medium text-gray-800 mt-2">— Maria C., Potter since 2018</p>
            
            {/* Trust Indicators - Matching Hero Section */}
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto pt-4">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs">Easy Setup</span>
              </div>
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Quick Onboarding</span>
              </div>
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs">Secure Platform</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;