import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';

// Memoized Star Rating component to prevent unnecessary re-renders
const StarRating = memo(({ rating }) => {
  // Pre-compute stars array using useMemo
  const stars = useMemo(() => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`transition-colors duration-300 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
      />
    ));
  }, [rating]);

  return <div className="flex">{stars}</div>;
});

// Memoized TestimonialCard component
const TestimonialCard = memo(({ testimonial, isActive }) => {
  return (
    <div 
      className={`w-full flex-shrink-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col lg:flex-row max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
        {/* Testimonial Content */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-3 transform transition-transform duration-500 hover:scale-110 origin-left">
              <Quote size={32} className="text-amber-400" />
            </div>
            <p className="text-gray-700 text-lg italic mb-5 leading-relaxed">{testimonial.text}</p>
            <div className="flex mb-3">
              <StarRating rating={testimonial.rating} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 flex items-center justify-center shadow-md">
              <User size={20} className="text-amber-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        </div>

        {/* Product Details - Enhanced */}
        <div className="lg:w-1/2 bg-gradient-to-br from-amber-50 to-amber-100 p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Purchased</h3>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center transform transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
              <span className="text-2xl text-amber-600 font-bold">
                {testimonial.product.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-gray-800 font-medium mb-2">{testimonial.product}</h4>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm transform hover:translate-x-1">
                <span>View Product</span>
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Control Button component
const ControlButton = memo(({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="bg-white hover:bg-amber-50 text-amber-600 p-2 rounded-full shadow-md hover:shadow-lg mx-2 transition-all duration-300 transform hover:scale-110"
    aria-label={label}
  >
    {icon}
  </button>
));

// Main Testimonials Component
const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Testimonials data
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'I absolutely love the handwoven basket I purchased! The craftsmanship is incredible, and it\'s clear that a lot of care went into making it. It\'s not just a beautiful piece but also supports traditional artisans.',
      rating: 5,
      product: 'Handwoven Bamboo Basket',
    },
    {
      id: 2,
      name: 'Nikunj Chauhan',
      location: 'Delhi, India',
      text: 'The ceramic vase set exceeded my expectations. Each piece is unique with its own character, and the quality is outstanding. I appreciate being able to connect with the artisan through the platform.',
      rating: 5,
      product: 'Ceramic Vase Collection',
    },
    {
      id: 3,
      name: 'Priya Patel',
      location: 'London, UK',
      text: 'I\'ve been looking for authentic handcrafted items for my home, and this platform has been a revelation. The bamboo tea set I ordered is not only beautiful but also sustainable. Great customer service too!',
      rating: 4,
      product: 'Handcrafted Bamboo Tea Set',
    },
    {
      id: 4,
      name: 'Miguel Rodriguez',
      location: 'Barcelona, Spain',
      text: 'The hand-carved wooden sculpture is a masterpiece. The attention to detail is extraordinary, and it has become the centerpiece of my living room. I\'m already planning my next purchase!',
      rating: 5,
      product: 'Hand-carved Wooden Sculpture',
    },
    {
      id: 5,
      name: 'Aisha Mahmoud',
      location: 'Prayagraj, India',
      text: 'I ordered the handmade leather journal as a gift, and it arrived beautifully packaged with a personalized note. The quality is exceptional, and the recipient was thrilled. Will definitely shop here again.',
      rating: 5,
      product: 'Handmade Leather Journal',
    },
  ], []);

  // Optimized resize handler with useCallback
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Improved resize handler with RAF for better performance
  useEffect(() => {
    let rafId;
    let timeoutId;
    
    const debouncedResize = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(handleResize);
      }, 100);
    };
    
    // Initial check with RAF
    requestAnimationFrame(handleResize);
    window.addEventListener('resize', debouncedResize, { passive: true });
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);

  // Optimized slide change with animation state
  const handleSlideChange = useCallback((index) => {
    if (isAnimating || index === activeSlide) return;
    
    setIsAnimating(true);
    setActiveSlide(index);
    setAutoplay(false);
    
    // Reset animation state after transition completes
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      // Resume autoplay after 5 seconds of inactivity
      const autoplayId = setTimeout(() => setAutoplay(true), 5000);
      return () => clearTimeout(autoplayId);
    }, 500); // Match this with your CSS transition duration
    
    return () => clearTimeout(timeoutId);
  }, [activeSlide, isAnimating]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    const newIndex = activeSlide === 0 ? testimonials.length - 1 : activeSlide - 1;
    handleSlideChange(newIndex);
  }, [activeSlide, testimonials.length, handleSlideChange]);

  const handleNext = useCallback(() => {
    const newIndex = (activeSlide + 1) % testimonials.length;
    handleSlideChange(newIndex);
  }, [activeSlide, testimonials.length, handleSlideChange]);

  // Improved autoplay with RAF for smoother animation
  useEffect(() => {
    if (!autoplay) return;
    
    let rafId;
    const interval = setInterval(() => {
      rafId = requestAnimationFrame(() => {
        setActiveSlide((prev) => (prev + 1) % testimonials.length);
      });
    }, 6000);
    
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafId);
    };
  }, [autoplay, testimonials.length]);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        {/* Enhanced Header Section with subtle animation */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 transform transition-all duration-500 hover:scale-105">
            Customer Stories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-4 transform transition duration-500 hover:scale-x-150" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what our customers love about our authentic handcrafted products from artisans around the world
          </p>
        </div>

        {/* Desktop Testimonials Section - Optimized */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            {/* Use GPU-accelerated transitions for smoother animation */}
            <div className="relative h-96">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ease-out transform ${
                    activeSlide === index 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeSlide 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <TestimonialCard testimonial={testimonial} isActive={activeSlide === index} />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex justify-center mt-8">
            <ControlButton 
              onClick={handlePrev} 
              icon={<ChevronLeft size={20} />} 
              label="Previous testimonial" 
            />
            
            <div className="flex items-center space-x-3 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'w-8 bg-gradient-to-r from-amber-400 to-amber-600' 
                      : 'w-2 bg-gray-300 hover:bg-amber-300 hover:w-4'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <ControlButton 
              onClick={handleNext} 
              icon={<ChevronRight size={20} />} 
              label="Next testimonial" 
            />
          </div>
        </div>

        {/* Mobile Testimonials Section - Enhanced for performance */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-md p-5 mb-6 transform transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="transform transition-all duration-300 hover:scale-110 origin-left">
                <Quote size={20} className="text-amber-400" />
              </div>
              <div className="flex">
                <StarRating rating={testimonials[activeSlide].rating} />
              </div>
            </div>

            <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">{testimonials[activeSlide].text}</p>

            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 flex items-center justify-center shadow-sm">
                <User size={16} className="text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-semibold text-gray-800">{testimonials[activeSlide].name}</h3>
                <p className="text-xs text-gray-500">{testimonials[activeSlide].location}</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Product Purchased</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                  <span className="text-xl text-amber-600 font-bold">
                    {testimonials[activeSlide].product.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-800 mb-1">{testimonials[activeSlide].product}</p>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium py-1 px-2 rounded transition-all duration-300 flex items-center hover:translate-x-1 transform">
                    <span>View</span>
                    <ChevronRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Controls - Enhanced */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'w-6 bg-gradient-to-r from-amber-400 to-amber-600' 
                      : 'w-2 bg-gray-300 hover:bg-amber-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);