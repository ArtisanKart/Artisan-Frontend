import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../Product/productCard1';
import fetch_products from '../../utils/products';

const Pottery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [potteryProducts, setPotteryProducts] = useState([]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
      
      setFeaturedArtisans([
        {
          id: 1,
          name: 'Terra Ceramics',
          image: 'https://www.goodnet.org/photos/620x0/42756_hd.jpg',
          location: 'Kyoto, Japan',
          specialty: 'Traditional Japanese pottery',
          bio: 'Master ceramicists with over five generations of experience crafting traditional Japanese stoneware.',
          productCount: 18
        },
        {
          id: 2,
          name: 'Clay Studio',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFFrCeNNH5798vaKNiAFT-THikqN6iP_79w&s',
          location: 'Portland, USA',
          specialty: 'Contemporary functional pottery',
          bio: 'Artist collective specializing in modern designs that balance aesthetic beauty and everyday functionality.',
          productCount: 12
        },
        {
          id: 3,
          name: 'Garden Pottery',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy1yq23uMfsJUZObYc-OBNH-gQpg9ZnO4Cg&s',
          location: 'Valencia, Spain',
          specialty: 'Terracotta garden accessories',
          bio: 'Family workshop using traditional Mediterranean techniques to create durable and beautiful terracotta pieces.',
          productCount: 15
        }
      ]);

      setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchTextileProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch_products();
        const filtered = response.filter(p => p.category === "Pottery");
        setPotteryProducts(filtered); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching textile products:", error);
      }
    };
    
    fetchTextileProducts();
}, []);

  const potteryTechniques = [
    {
      name: 'Wheel Throwing',
      description: 'Creating symmetrical forms by shaping clay on a potters wheel, a technique dating back thousands of years.',
      image: 'https://media.istockphoto.com/id/1147402081/photo/top-view-of-hands-with-clay-making-of-a-ceramic-pot-on-the-pottery-wheel-hobby-and-leisure.jpg?s=612x612&w=0&k=20&c=vh5HDGUN0Xr7UAtz4yrNyPEMaeArZQswp26iJuaXZDg='
    },
    {
      name: 'Hand Building',
      description: 'Constructing pottery by hand using techniques such as pinching, coiling, and slab building.',
      image: 'https://media.istockphoto.com/id/1144440788/photo/woman-hand-working-on-pot.jpg?s=612x612&w=0&k=20&c=0Cj4nIlKumIINr_jz-ORWoHf5XczCTktjx5RH4cE3Ak='
    },
    {
      name: 'Raku Firing',
      description: 'A Japanese firing technique creating distinctive crackle patterns and metallic finishes.',
      image: 'https://media.istockphoto.com/id/1171178824/photo/glassblower-in-the-work.jpg?s=612x612&w=0&k=20&c=9PmmZetkx_Ra1xZHiThzFgl09Um9Yoi3H3vF6-GrVyM='
    }
  ];

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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-amber-100/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ancient Craftsmanship
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-amber-100">Pottery</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-amber-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handcrafted ceramics from master artisans around the world, 
            each piece reflecting centuries of tradition, creativity, and cultural heritage.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a 
              href="#pottery-products" 
              className="bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=pottery"
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
            {potteryTechniques.map((technique) => (
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
      <section id="pottery-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900">Featured Ceramic Pieces</h2>
            <Link to="/shop?category=pottery" className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potteryProducts.map((product, index) => (
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

      {/* Pottery Techniques */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Traditional Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Pottery Creation Techniques</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From ancient hand-building to refined wheel-throwing, pottery encompasses a rich array of techniques.
              Learn about the methods our artisans use to transform clay into beautiful vessels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {potteryTechniques.map((technique, index) => (
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
            <h2 className="text-3xl font-bold text-amber-900">Meet Our Ceramic Artisans</h2>
            <Link to="/artisans?craft=pottery" className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-amber-100 rounded-xl p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-amber-100/20 p-4 rounded-lg w-full md:w-auto">
                <Info className="w-12 h-12 text-amber-600" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Preserving Pottery Heritage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Each ceramic piece tells a story of cultural heritage. Our artisans employ 
                      time-honored techniques passed down through generations, ensuring traditional 
                      craftsmanship thrives in the modern world.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>100% natural clay materials</li>
                      <li>Hand-processed mineral glazes</li>
                      <li>Low-fire traditional kilns</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We maintain strict quality standards while encouraging artistic innovation. 
                      Every purchase supports artisanal communities and helps preserve endangered 
                      pottery traditions.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/sustainability"
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Our Sustainability Promise
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-8 border-t border-amber-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Artisan Workshops', value: '12+' },
                  { label: 'Years of Tradition', value: '100+' },
                  { label: 'Unique Techniques', value: '8' },
                  { label: 'Community Members', value: '240+' }
                ].map((stat, index) => (
                  <div key={index} className="p-4 bg-amber-50/50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-700">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pottery;