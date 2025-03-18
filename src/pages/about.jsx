import React from 'react';
import { ChevronRight, Award, Heart, Globe, Users, ArrowRight, Star, Mail } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { Link, useLocation } from "react-router-dom";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Satyam Kesarwani',
      role: 'Team Leader and Frontend Developer',
      bio: 'With over 15 years of experience working with artisan communities, Satyam founded ArtisanKart to create sustainable livelihoods for North Eastern craftspeople.',
      image: '/satyam.jpg'
    },
    {
      id: 2,
      name: 'Sakina Khan',
      role: 'Backend Developer',
      bio: 'A graduate from National Institute of Design, Sakina works closely with artisans to blend traditional craftsmanship with contemporary design.',
      image: '/sakina.jpg'
    },
    {
      id: 3,
      name: 'Sarafaraj Nasardi',
      role: 'Lead Backend Developer',
      bio: 'Born and raised in Assam, Sarafaraj brings deep cultural understanding and helps artisans navigate the digital marketplace.',
      image: '/sarafaraj.jpg'
    },
    {
      id: 4,
      name: 'Saptadip Saha',
      role: 'AI-ML Lead',
      bio: 'With roots in Manipur, Saptadip travels across the North East to discover and onboard talented artisans to our platform.',
      image: '/saptadip.jpg'
    }
  ];
  const craftDetails = [
      { 
        state: 'Assam', 
        description: 'Famous for silk weaving (Muga, Eri, Pat), bell metal crafts, and cane & bamboo products', 
        image: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?q=80&w=600&auto=format&fit=crop' 
      },
      { 
        state: 'Meghalaya', 
        description: 'Known for bamboo and cane crafts, traditional textiles, and indigenous jewelry making', 
        image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=600&auto=format&fit=crop' 
      },
      { 
        state: 'Nagaland', 
        description: 'Renowned for wood carving, tribal textiles with geometric patterns, and metalwork', 
        image: 'https://images.unsplash.com/photo-1617526738882-1ea1a9ed6899?q=80&w=600&auto=format&fit=crop' 
      },
      { 
        state: 'Manipur', 
        description: 'Celebrated for handloom textiles, Longpi pottery, and intricate bamboo crafts', 
        image: 'https://images.unsplash.com/photo-1599634874685-3e2841ca5a2d?q=80&w=600&auto=format&fit=crop' 
      },
      { 
        state: 'Tripura', 
        description: 'Recognized for bamboo handicrafts, handloom textiles, and Risha (traditional stoles)', 
        image: 'https://images.unsplash.com/photo-1582903222032-12c3dfbe0e35?q=80&w=600&auto=format&fit=crop' 
      },
      { 
        state: 'Arunachal Pradesh', 
        description: 'Distinguished by its tribal weaving, carpet making, and wood carving traditions', 
        image: 'https://images.unsplash.com/photo-1627483298235-f3eb0a3e9169?q=80&w=600&auto=format&fit=crop' 
      }
    
  ];

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center transform scale-105" 
             style={{ backgroundImage: "url('/api/placeholder/1600/600')", transformOrigin: 'center center' }}></div>
        <div className="relative container mx-auto px-4 py-32 md:py-40 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse">
            <Heart className="text-white" size={36} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
            <span className="text-white">About </span>
            <span className="text-orange-500">ArtisanKart</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8"></div>
          <p className="text-2xl md:text-4xl text-orange-200 font-medium mb-8 text-center italic">
            Preserving Heritage, Empowering Communities
          </p>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-center leading-relaxed">
            Connecting the rich craft traditions of North Eastern India to conscious consumers worldwide through authentic handcrafted treasures.
          </p>
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <Link to="/shop" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105 flex items-center">
              Our Collection <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/artisans" className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105">
              Meet Our Artisans
            </Link>
          </div>
        </div>
        
        {/* Decorative wave at bottom of hero */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#fff9e6" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section with Design Elements */}
        <div className="mb-32 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 -z-10 rounded-full translate-x-1/3 -translate-y-1/3 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-200 -z-10 rounded-full -translate-x-1/3 translate-y-1/4 opacity-70"></div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8 border-l-4 border-orange-500 transition-transform hover:scale-[1.01]">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-5">
                <Award className="text-orange-600" size={30} />
              </div>
              <h2 className="text-4xl font-bold text-slate-800">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              ArtisanKart is dedicated to preserving and promoting the rich cultural heritage of 
              North Eastern India through its exquisite handicrafts. Our mission is to create a 
              sustainable marketplace that connects skilled artisans directly with conscious consumers 
              worldwide, ensuring fair compensation and recognition for traditional craftsmanship.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-orange-200 pl-6 py-2">
              We believe that every handcrafted piece tells a story - of ancient traditions, of skilled hands, 
              and of cultural identities that deserve to be celebrated and preserved for generations to come.
            </p>
          </div>
        </div>

        {/* Impact Stats with Enhanced Visuals */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-12 mb-32 shadow-xl">
          <h3 className="text-4xl font-bold text-orange-800 mb-12 text-center">Our Impact</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">500+</div>
              <h4 className="font-bold text-2xl mb-3 text-slate-800">Artisan Families</h4>
              <p className="text-gray-700">Providing sustainable livelihoods across 8 North Eastern states</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">25+</div>
              <h4 className="font-bold text-2xl mb-3 text-slate-800">Craft Forms</h4>
              <p className="text-gray-700">Including bamboo craft, weaving, pottery and indigenous textiles</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">8</div>
              <h4 className="font-bold text-2xl mb-3 text-slate-800">States Covered</h4>
              <p className="text-gray-700">Recording traditional techniques and stories from all North Eastern states</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">100%</div>
              <h4 className="font-bold text-2xl mb-3 text-slate-800">Eco-friendly</h4>
              <p className="text-gray-700">Promoting sustainable materials and traditional eco-conscious methods</p>
            </div>
          </div>
        </div>

        {/* Craft Heritage Section with Cards and Images */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">North Eastern Craft Heritage</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The North Eastern region of India is home to some of the country's most distinctive and 
              diverse handicraft traditions. Each state has its own unique cultural identity reflected 
              in its crafts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {craftDetails.map((craft, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-200 group">
                <div className="relative h-56">
                  <img 
                    src={craft.image} 
                    alt={`${craft.state} crafts`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <h3 className="text-white text-3xl font-bold p-6">{craft.state}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-lg text-gray-700 mb-4">{craft.description}</p>
                  <button className="mt-2 flex items-center text-orange-600 font-semibold hover:text-orange-800 transition group-hover:translate-x-1">
                    Discover more <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        Team Section with Improved Cards

    
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Meet Our Team</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Behind ArtisanKart is a passionate team dedicated to supporting artisans and bringing the 
              beauty of North Eastern handicrafts to the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-orange-200">
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-medium">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t-4 border-orange-500">
                  <h3 className="font-bold text-2xl text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium text-lg">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section with Icons */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Values</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-xl p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-300 transition-colors">
                <Award className="text-orange-600" size={36} />
              </div>
              <h3 className="font-bold text-2xl text-orange-600 mb-5">Authenticity</h3>
              <p className="text-gray-700 text-lg">
                We celebrate genuine craftsmanship and ensure every product tells an authentic story of 
                its cultural origins.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Globe className="text-orange-600" size={36} />
              </div>
              <h3 className="font-bold text-2xl text-orange-600 mb-5">Sustainability</h3>
              <p className="text-gray-700 text-lg">
                We promote eco-friendly practices and materials that honor traditional methods while 
                protecting our environment.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-orange-200">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="text-orange-600" size={36} />
              </div>
              <h3 className="font-bold text-2xl text-orange-600 mb-5">Community</h3>
              <p className="text-gray-700 text-lg">
                We believe in fair trade practices that empower artisan communities and preserve their 
                cultural heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action with Enhanced Design */}
        <div className="relative mb-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/api/placeholder/1600/600')" }}></div>
          <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl p-16 text-center shadow-2xl">
            <Heart className="mx-auto mb-8" size={56} />
            <h2 className="text-5xl font-bold mb-8">Join Our Journey</h2>
            <p className="text-2xl mb-10 max-w-3xl mx-auto">
              Support North Eastern artisans and bring home a piece of cultural heritage. Every purchase 
              makes a difference in preserving traditional crafts and empowering communities.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/shop" className="bg-white text-orange-600 hover:text-orange-700 font-bold py-4 px-10 rounded-full hover:bg-orange-50 shadow-xl transition-all hover:scale-105 text-xl flex items-center">
                Shop Collection <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/artisans" className="border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-orange-500 transition-all hover:scale-105 text-xl">
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;