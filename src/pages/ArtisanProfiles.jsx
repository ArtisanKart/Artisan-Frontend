


import React, { useState, useEffect } from 'react';
import ArtisanCard from '../components/Artisan/ArtisanCard';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Layout/Navbar';

const ArtisanProfiles = () => {
  const [artisans, setArtisans] = useState([]);
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories for filtering
  const categories = ['All', 'Weaving', 'Pottery', 'Block Printing', 'Embroidery', 'Bamboo Crafts', 'Wood Carving'];
  const locations = ['All', 'Jaipur', 'Varanasi', 'Kutch', 'Chennai', 'Kashmir', 'Assam'];
  
  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const mockArtisans = [
        {
          id: "1",
          name: "Maya Sharma",
          image: "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Jaipur, Rajasthan",
          rating: 4.8,
          reviewCount: 127,
          specialty: "Block Printing",
          shortBio: "Third-generation artisan specializing in traditional Rajasthani block printing techniques using natural dyes.",
          featured: true,
          productCount: 24
        },
        {
          id: "2",
          name: "Rajesh Kumar",
          image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Varanasi, Uttar Pradesh",
          rating: 4.6,
          reviewCount: 89,
          specialty: "Silk Weaving",
          shortBio: "Skilled in traditional Banarasi silk weaving with over 25 years of experience creating intricate patterns.",
          featured: false,
          productCount: 18
        },
        {
          id: "3",
          name: "Amina Begum",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Kutch, Gujarat",
          rating: 4.9,
          reviewCount: 143,
          specialty: "Embroidery",
          shortBio: "Specializes in Kutch embroidery featuring mirror work, intricate stitches, and vibrant colors.",
          featured: true,
          productCount: 32
        },
        {
          id: "4",
          name: "Ramesh Patel",
          image: "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Jaipur, Rajasthan",
          rating: 4.7,
          reviewCount: 76,
          specialty: "Pottery",
          shortBio: "Creates handcrafted blue pottery using techniques passed down for generations in his family.",
          featured: false,
          productCount: 15
        },
        {
          id: "5",
          name: "Lakshmi Devi",
          image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Chennai, Tamil Nadu",
          rating: 4.5,
          reviewCount: 92,
          specialty: "Bronze Sculpture",
          shortBio: "Practitioner of the ancient lost-wax method creating intricate bronze sculptures of deities and dancers.",
          featured: false,
          productCount: 12
        },
        {
          id: "6",
          name: "Farooq Ahmed",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Kashmir",
          rating: 4.9,
          reviewCount: 108,
          specialty: "Wood Carving",
          shortBio: "Master craftsman creating intricate walnut wood carvings with traditional Kashmiri patterns.",
          featured: true,
          productCount: 20
        },
        {
          id: "7",
          name: "Meenakshi Iyer",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Chennai, Tamil Nadu",
          rating: 4.7,
          reviewCount: 64,
          specialty: "Tanjore Painting",
          shortBio: "Creates stunning Tanjore paintings with gold leaf work and semi-precious stones on solid wooden panels.",
          featured: false,
          productCount: 16
        },
        {
          id: "8",
          name: "Biren Gogoi",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          location: "Assam",
          rating: 4.8,
          reviewCount: 73,
          specialty: "Bamboo Crafts",
          shortBio: "Bamboo craft specialist creating sustainable furniture, home accessories and decorative items.",
          featured: false,
          productCount: 28
        }
      ];
      
      setArtisans(mockArtisans);
      setFilteredArtisans(mockArtisans);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter artisans based on search term, category and location
  useEffect(() => {
    let results = artisans;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        artisan => 
          artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.shortBio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(artisan => 
        artisan.specialty === selectedCategory
      );
    }
    
    // Filter by location
    if (selectedLocation !== 'All') {
      results = results.filter(artisan => 
        artisan.location.includes(selectedLocation)
      );
    }
    
    setFilteredArtisans(results);
  }, [searchTerm, selectedCategory, selectedLocation, artisans]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle location change
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLocation('All');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Skilled Artisans</h1>
        <p className="max-w-3xl mx-auto text-gray-600">
          Discover talented craftspeople from across India, each bringing generations of tradition and expertise to their handmade creations.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, craft, or keywords..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FaFilter className="mr-2" />
            Filters
            {(selectedCategory !== 'All' || selectedLocation !== 'All') && (
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Active
              </span>
            )}
          </button>
          
          {/* Clear Filters */}
          {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchTerm) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600"
            >
              <FaTimes className="mr-1" />
              Clear all
            </button>
          )}
        </div>
        
        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Craft Specialty</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Locations Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map(location => (
                    <button
                      key={location}
                      onClick={() => handleLocationChange(location)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedLocation === location
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredArtisans.length}</span> artisans
        </p>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Sort by:</span>
          <select className="ml-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option>Featured</option>
            <option>Highest Rated</option>
            <option>Most Products</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Artisans Grid */}
          {filteredArtisans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtisans.map(artisan => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artisans found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default ArtisanProfiles;