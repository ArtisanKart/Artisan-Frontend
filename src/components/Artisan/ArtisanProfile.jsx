import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import { Tab } from "@headlessui/react";

const ArtisanProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  
  const artisan = {
    id: id,
    name: "Maya Sharma",
    profileImage: "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1516554646385-7642248096d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "sillariye, Assam",
    phone: "+91 98765 43210",
    email: "maya.sharma@example.com",
    website: "www.mayashandicraft.com",
    socialMedia: {
      instagram: "maya_handicrafts",
      facebook: "MayaHandicrafts",
      twitter: "maya_crafts"
    },
    rating: 4.8,
    reviewCount: 127,
    specialty: "Block Printing",
    craftType: ["Block Printing", "Natural Dyeing", "Textile Art"],
    yearStarted: 2005,
    bio: "Maya Sharma is a third-generation artisan specializing in traditional Rajasthani block printing techniques. Born and raised in Jaipur, she learned the craft from her grandmother and has been perfecting it for over 15 years. Maya uses only natural dyes derived from plants, minerals, and insects, following age-old recipes that have been passed down through generations. Her work combines traditional motifs with contemporary designs, making her products both authentic and relevant to modern tastes. Maya works with a small team of local women artisans, providing employment opportunities and preserving cultural heritage.",
    story: "My journey began when I was just 8 years old, watching my grandmother carve intricate designs into wooden blocks. By 12, I was helping mix natural dyes from indigo, madder root, and turmeric. After studying textile design in college, I returned to my village to revive and modernize our family craft. The greatest challenge came when synthetic dyes threatened to replace our traditional methods due to their lower cost. But I was determined to preserve our heritage. In 2005, I established my own workshop, committed to using only natural materials and traditional techniques. Today, I'm proud that our products reach homes worldwide while staying true to our roots.",
    awards: [
      { year: 2018, title: "National Handicraft Award", organization: "Ministry of Textiles" },
      { year: 2020, title: "Master Craftsperson", organization: "Craft Council of India" }
    ],
    products: [
      { id: "p1", name: "Block Printed Bedsheet", price: 2500, image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { id: "p2", name: "Indigo Dyed Scarf", price: 1200, image: "https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { id: "p3", name: "Table Runner Set", price: 1800, image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
      { id: "p4", name: "Cushion Covers (Set of 4)", price: 1600, image: "https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566836610593-62a541d6fb8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1530968561612-811c03122da3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1529186523419-1f17d6709257?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1605512529826-54b18cfd935e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600263574583-24a553171b41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    reviews: [
      { id: "r1", user: "Priya M.", rating: 5, date: "May 12, 2023", comment: "Beautiful craftsmanship and colors! The bedsheet I ordered exceeded my expectations." },
      { id: "r2", user: "Rahul K.", rating: 4, date: "April 3, 2023", comment: "High quality products and fast shipping. Would recommend!" },
      { id: "r3", user: "Sarah J.", rating: 5, date: "March 18, 2023", comment: "I love supporting traditional artisans. Maya's work is exceptional and authentic." }
    ]
  };
  console.log(artisan.id);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={artisan.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img 
                  src={artisan.profileImage} 
                  alt={artisan.name} 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              
              {/* Profile Info */}
              <div className="md:ml-6 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{artisan.name}</h1>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{artisan.rating}</span>
                    <span className="text-gray-500 ml-1">({artisan.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <span>{artisan.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {artisan.craftType.map((craft, index) => (
                      <span 
                        key={index} 
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {craft}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Artisan since {artisan.yearStarted}</div>
                </div>
                
                {/* Contact & Social */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FaPhoneAlt className="mr-2 text-gray-500" />
                    <span>{artisan.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    <span>{artisan.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaGlobe className="mr-2 text-gray-500" />
                    <span>{artisan.website}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href={`https://instagram.com/${artisan.socialMedia.instagram}`} className="text-pink-600 hover:text-pink-700">
                      <FaInstagram className="text-xl" />
                    </a>
                    <a href={`https://facebook.com/${artisan.socialMedia.facebook}`} className="text-blue-600 hover:text-blue-700">
                      <FaFacebook className="text-xl" />
                    </a>
                    <a href={`https://twitter.com/${artisan.socialMedia.twitter}`} className="text-blue-400 hover:text-blue-500">
                      <FaTwitter className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex border-t border-gray-200">
              <Tab className={({ selected }) => 
                `py-4 px-6 text-sm font-medium focus:outline-none transition-colors
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                About
              </Tab>
              <Tab className={({ selected }) => 
                `py-4 px-6 text-sm font-medium focus:outline-none transition-colors
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                Products
              </Tab>
              <Tab className={({ selected }) => 
                `py-4 px-6 text-sm font-medium focus:outline-none transition-colors
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                Gallery
              </Tab>
              <Tab className={({ selected }) => 
                `py-4 px-6 text-sm font-medium focus:outline-none transition-colors
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                Reviews
              </Tab>
            </Tab.List>
            
            <Tab.Panels>
              {/* About Panel */}
              <Tab.Panel className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Bio</h2>
                    <p className="text-gray-700 mb-6">{artisan.bio}</p>
                    
                    <h2 className="text-xl font-semibold mb-4">My Craft Story</h2>
                    <p className="text-gray-700">{artisan.story}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Awards & Recognition</h2>
                    <div className="space-y-4">
                      {artisan.awards.map((award, index) => (
                        <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                          <div className="font-medium">{award.title}</div>
                          <div className="text-sm text-gray-600">{award.organization}, {award.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              
              {/* Products Panel */}
              <Tab.Panel className="p-6">
                <h2 className="text-xl font-semibold mb-6">Products by {artisan.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {artisan.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </Tab.Panel>
              
              {/* Gallery Panel */}
              <Tab.Panel className="p-6">
                <h2 className="text-xl font-semibold mb-6">Craft Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {artisan.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                      <img src={image} alt={`Gallery ${index+1}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              
              
              <Tab.Panel className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Customer Reviews</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-6">
                  {artisan.reviews.map(review => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{review.date}</div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;