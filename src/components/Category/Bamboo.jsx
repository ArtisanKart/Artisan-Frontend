import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Info, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import fetch_products from '../../utils/products';

const Bamboo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bambooProducts, setBambooProducts] = useState([]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  useEffect(() => {
    setFeaturedArtisans([
      {
        id: 1,
        name: 'Bamboo Weavers',
        image: 'https://media.istockphoto.com/id/824299522/photo/weaving-traditional-bamboo-basket.jpg?s=612x612&w=0&k=20&c=qM_tHxSnB2BcX2_H09PvF6Kr22jbrmkjTAbByr-hIhI=',
        location: 'Chiang Mai, Thailand',
        specialty: 'Traditional basket weaving',
        bio: 'Multi-generational family of artisans preserving ancient Thai bamboo weaving techniques from the northern highlands. Led by master weaver Niran Prasert who has over 40 years of experience.',
        productCount: 24,
        established: 1978,
        rating: 4.8,
        reviews: 89
      },
      {
        id: 2,
        name: 'Green Forest Crafts',
        image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51',
        location: 'Hangzhou, China',
        specialty: 'Bamboo furniture and home decor',
        bio: 'Cooperative of skilled craftspeople combining traditional Chinese bamboo techniques with contemporary design principles. Founded by Liu Wei and now includes 12 master artisans.',
        productCount: 18,
        established: 2005,
        rating: 4.9,
        reviews: 67
      },
      {
        id: 3,
        name: 'Eco Artisans',
        image: 'https://media.istockphoto.com/id/2178322876/photo/close-up-of-wooden-pipe.jpg?s=612x612&w=0&k=20&c=IuMyf8K9B0pxGkmb1xXffXTsY-ctPmBzvUOEXxkMMuU=',
        location: 'Kyoto, Japan',
        specialty: 'Bamboo kitchenware and vessels',
        bio: 'Japanese artisans with expertise in traditional bamboo processing for functional and durable everyday items. Led by third-generation bamboo master Hiroshi Tanaka.',
        productCount: 20,
        established: 1996,
        rating: 4.7,
        reviews: 54
      }
    ]);
  }, []);
  
  
  useEffect(() => {
    const fetchBambooProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch_products();
        const filtered = response.filter(p => p.category === "Bamboo");

        setBambooProducts(filtered);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bamboo products:", error);
      }
    };
    
    fetchBambooProducts();
  }, []); 
  const bambooTechniques = [
    {
      name: 'Split Weaving',
      description: 'Bamboo is split into thin strips and woven together to create intricate patterns and durable structures.',
      image: 'https://media.istockphoto.com/id/1453245838/photo/skilled-craftsman-working-manually-a-detailed-bamboo-wood-armchair-with-his-fingers-and-tools.jpg?s=612x612&w=0&k=20&c=qX_7yM8EAMWSOAi_0OK2jm_HQaUP4xljg5Tzi1oibuI='
    },
    {
      name: 'Node Carving',
      description: 'Artisans work with bamboo nodes and joints to create unique decorative elements and functional features.',
      image: 'https://media.istockphoto.com/id/482186532/photo/beautiful-woven-bamboo.jpg?s=612x612&w=0&k=20&c=tjDqf-fwuJQLoddgt84nUywbNH2wqQAJjhKS3E3JQnQ='
    },
    {
      name: 'Steam Bending',
      description: 'Bamboo is heated with steam to make it pliable, then shaped into graceful curves and forms.',
      image: 'https://media.istockphoto.com/id/1202419556/photo/selective-focus-on-traditional-stairs-made-of-fresh-cut-green-long-bamboo-handcrafted-closeup.jpg?s=612x612&w=0&k=20&c=ai_CFJWE90gGA-GCZygaoMB31nv1t09XjKN8zaN4ZaM='
    }
  ];
  

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-green-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-green-200/30 rounded-md"></div>
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
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-600"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Sustainable Label */}
          <motion.div
            className="bg-green-100/20 border border-green-100/30 text-green-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sustainable Craftsmanship
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-green-100">Bamboo</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-green-50/90 max-w-2xl mb-10"
          >
            Explore the beauty of sustainable bamboo crafts, handmade by skilled artisans using
            traditional techniques passed down through generations. Environmentally friendly,
            durable, and exquisitely crafted.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a 
              href="#bamboo-products" 
              className="bg-gradient-to-r from-green-200 to-green-100 text-green-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=bamboo"
              className="bg-white/20 border border-green-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
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
            {bambooTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white/20 border border-green-100/30 text-green-50 px-4 py-1 rounded-full text-sm hover:bg-green-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="bamboo-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-900">Featured Bamboo Pieces</h2>
            <Link to="/shop?category=bamboo" className="flex items-center text-green-600 hover:text-green-700 font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bambooProducts.map((product, index) => (
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

      {/* Bamboo Techniques */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-green-500/10 border border-green-500/20 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Artisanal Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-green-900 mb-4">Bamboo Crafting Techniques</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From intricate weaving to precision carving, bamboo craftsmanship requires patience, skill, and deep understanding of the material.
              Discover the techniques our artisans use to transform bamboo into functional art.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bambooTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={technique.image} 
                  alt={technique.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">{technique.name}</h3>
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
            <h2 className="text-3xl font-bold text-green-900">Meet Our Bamboo Artisans</h2>
            <Link to="/artisans?craft=bamboo" className="flex items-center text-green-600 hover:text-green-700 font-medium">
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
                className="bg-green-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-green-100"
              >
                <div className="relative h-56">
                  <img 
                    src={artisan.image} 
                    alt={artisan.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-1">{artisan.name}</h3>
                  <p className="text-green-600 mb-3">{artisan.location}</p>
                  <p className="text-gray-700 font-medium text-sm mb-2">Specialty: {artisan.specialty}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{artisan.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{artisan.productCount} products</span>
                    <Link to={`/artisans/${artisan.id}`} className="text-green-600 hover:text-green-700 font-medium text-sm">
                      View Profile
                    </Link>
                  </div>
                </div>
            
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-green-500/10 border border-green-500/20 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-flex items-center">
                <Leaf size={16} className="mr-2" />
                Eco-Friendly Material
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-6">Sustainability at the Core</h2>
              <p className="text-gray-700 mb-6">
                Bamboo is one of the most sustainable materials on earth. It grows incredibly fast - up to 91 cm per day - and requires no pesticides or fertilizers. Unlike hardwood trees that take decades to mature, bamboo can be harvested in just 3-5 years.
              </p>
              <p className="text-gray-700 mb-6">
                By choosing bamboo products, you're supporting a renewable resource that helps reduce deforestation and carbon emissions. Our artisans work with bamboo sourced from managed forests where sustainable harvesting practices are followed.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center border border-green-100">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Leaf size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Renewable</h3>
                    <p className="text-sm text-gray-600">Fastest growing plant on Earth</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center border border-green-100">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Info size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Carbon Negative</h3>
                    <p className="text-sm text-gray-600">Absorbs more CO2 than it releases</p>
                  </div>
                </div>
              </div>
              <Link to="/sustainability" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                Learn more about our sustainability practices <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://media.istockphoto.com/id/1252966289/photo/giant-bamboo.jpg?s=612x612&w=0&k=20&c=5x0jn0KgVmiVRp_aNIdq_t9uX1buCsEctYK3Di4coIA=" 
                alt="Sustainable bamboo harvesting" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-xs border border-green-100">
                <div className="flex items-center mb-2">
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500" />
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Our bamboo products are not just beautiful, they're a testament to nature's resilience and our commitment to preserving it."
                </p>
                <p className="text-green-700 font-medium text-sm mt-2">
                  — Lin Wei, Green Forest Crafts
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Join the Bamboo Movement
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-green-50/90 max-w-2xl mx-auto mb-8"
          >
            Subscribe to our newsletter for exclusive offers, artisan stories, and early access to new bamboo collections.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-4"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-full flex-grow border-2 border-green-700 bg-green-700/50 text-white placeholder:text-green-50/70 focus:outline-none focus:border-green-100"
            />
            <button className="bg-green-100 text-green-900 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bamboo;