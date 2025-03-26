import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../Product/productCard1';
import fetch_products from '../../utils/products';
const Weaving = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weavingProducts, setWeavingProducts] = useState([]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    

      setFeaturedArtisans([
        {
          id: 1,
          name: 'Mountain Weavers',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvG-M6HZNh9KT-KkYR4XHpi7dH-H3obwTbQ&s',
          location: 'Oaxaca, Mexico',
          specialty: 'Traditional Zapotec weaving',
          bio: 'A cooperative of indigenous weavers using natural dyes and ancient techniques passed down through generations.',
          productCount: 14
        },
        {
          id: 2,
          name: 'Textile Traditions',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_X0CCA_zHdP3fOXEsEHuonT9u8hfvsg82Q&s',
          location: 'Marrakech, Morocco',
          specialty: 'Berber weaving patterns',
          bio: 'Family-run studio preserving centuries-old techniques while creating contemporary designs.',
          productCount: 9
        },
        {
          id: 3,
          name: 'Fiber Arts Collective',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR839t5Khdp6lHTPVLJIDz9MIY4YZcmURtEnQ&s',
          location: 'Bali, Indonesia',
          specialty: 'Ikat and batik textiles',
          bio: 'Artist collective combining traditional Indonesian weaving with modern sustainable practices.',
          productCount: 11
        }
      ]);
     setIsLoading(false);
  }, []);

  const weavingTechniques = [
    {
      name: 'Tapestry Weaving',
      description: 'Creating pictorial designs by interlacing weft threads through the warp to completely cover it.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjGQvZw89WLqH6nYXpz_PhY8LKvszhje8LXw&s'
    },
    {
      name: 'Ikat',
      description: 'A resist-dyeing technique where threads are bound and dyed before weaving to create patterns.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXWyc-oeqI0Pedu8627xIoQG45Bdi-jr7jQ&s'
    },
    {
      name: 'Backstrap Weaving',
      description: 'Ancient technique using a simple loom attached to the weavers body to create intricate textiles.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pAMrGAHpVtyphjT2lmBa-wDOhoAL51rEdQ&s'
    }
  ];
  useEffect(() => {
    const fetchTextileProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch_products();
        const filtered = response.filter(p => p.category === "Weaving");
        setWeavingProducts(filtered); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching textile products:", error);
      }
    };
    
    fetchTextileProducts();
}, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-amber-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-amber-200/30 rounded-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-80 shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-amber-100/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Traditional Craftsmanship
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-amber-100">Weaving</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-amber-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handwoven textiles from master artisans around the world, 
            each piece reflecting centuries of tradition, skill, and cultural heritage.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a 
              href="#weaving-products" 
              className="bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=weaving"
              className="bg-white/20 border border-amber-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
            >
              Meet Artisans
            </Link>
          </motion.div>
          
          {/* Featured Techniques Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {weavingTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm hover:bg-amber-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="weaving-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900">Featured Woven Pieces</h2>
            <Link to="/shop?category=weaving" className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weavingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weaving Techniques */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ancient Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Traditional Weaving Techniques</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Weaving is among the oldest human crafts, with diverse techniques developed across cultures.
              Learn about the methods our artisans use to create their beautiful textiles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weavingTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={technique.image} 
                  alt={technique.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{technique.name}</h3>
                  <p className="text-gray-700">{technique.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900">Meet Our Weaving Artisans</h2>
            <Link to="/artisans?craft=weaving" className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-amber-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-amber-100"
              >
                <div className="relative h-56">
                  <img 
                    src={artisan.image} 
                    alt={artisan.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">{artisan.name}</h3>
                  <p className="text-amber-600 mb-3">{artisan.location}</p>
                  <p className="text-gray-700 font-medium text-sm mb-2">Specialty: {artisan.specialty}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{artisan.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{artisan.productCount} products</span>
                    <Link to={`/artisans/${artisan.id}`} className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Box */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-amber-100 rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-700">
                <Info size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">About Handwoven Textiles</h3>
                <p className="text-gray-700 mb-4">
                  Handwoven textiles are created using traditional looms and techniques that have been
                  passed down through generations. Each piece is unique and tells a story of cultural heritage,
                  with patterns that often have symbolic meaning.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Sustainable</h4>
                    <p className="text-gray-600 text-sm">
                      Traditional weaving uses natural fibers and dyes with minimal environmental impact.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Durable</h4>
                    <p className="text-gray-600 text-sm">
                      Hand-woven textiles are often stronger and longer-lasting than machine-made alternatives.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Unique</h4>
                    <p className="text-gray-600 text-sm">
                      Each piece has subtle variations that make it one-of-a-kind and impossible to replicate exactly.
                    </p>
                  </div>
                </div>
                <Link 
                  to="/learn/weaving-process" 
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                >
                  Learn more about the weaving process
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover how our handwoven pieces have brought joy and beauty to homes around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Mitchell",
                location: "Portland, OR",
                text: "The wool blanket I purchased is absolutely stunning. The craftsmanship is exceptional, and it's become the focal point of my living room. Worth every penny!",
                rating: 5
              },
              {
                name: "David Chen",
                location: "Chicago, IL",
                text: "I've been collecting handwoven textiles for years, and the pieces from Mountain Weavers are among the finest I've seen. The colors and patterns are exquisite.",
                rating: 5
              },
              {
                name: "Amara Johnson",
                location: "Austin, TX",
                text: "The table runner I ordered exceeded my expectations. The attention to detail is remarkable, and I love knowing the story behind who made it.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-amber-50/50 rounded-xl p-6 border border-amber-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-medium text-amber-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-amber-100 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive updates on new arrivals, artisan stories, and exclusive offers.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-800"
              />
              <button className="bg-amber-800 hover:bg-amber-900 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-amber-200 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Weaving;