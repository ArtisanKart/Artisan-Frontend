import React from "react";
import { ChevronRight, Award, Heart, Globe, Users } from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import { Link, useLocation } from "react-router-dom";
const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Satyam Kesarwani",
      role: "Team Leader",
      bio: "With over 15 years of experience working with artisan communities, Priya founded ArtisanKart to create sustainable livelihoods for North Eastern craftspeople.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 2,
      name: "Sakina Khan",
      role: "Unknown",
      bio: "A graduate from National Institute of Design, Rahul works closely with artisans to blend traditional craftsmanship with contemporary design.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 3,
      name: "Sarafaraj Nasardi",
      role: "Backend Developer",
      bio: "Born and raised in Assam, Mohan brings deep cultural understanding and helps artisans navigate the digital marketplace.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 4,
      name: "Saptadip Saha",
      role: "AI-ML Lead",
      bio: "With roots in Manipur, Lakshmi travels across the North East to discover and onboard talented artisans to our platform.",
      image: "/api/placeholder/300/300",
    },
  ];

  const craftDetails = [
    {
      state: "Assam",
      description:
        "Famous for silk weaving (Muga, Eri, Pat), bell metal crafts, and cane & bamboo products",
      image: "/api/placeholder/400/300",
    },
    {
      state: "Meghalaya",
      description:
        "Known for bamboo and cane crafts, traditional textiles, and indigenous jewelry making",
      image: "/api/placeholder/400/300",
    },
    {
      state: "Nagaland",
      description:
        "Renowned for wood carving, tribal textiles with geometric patterns, and metalwork",
      image: "/api/placeholder/400/300",
    },
    {
      state: "Manipur",
      description:
        "Celebrated for handloom textiles, Longpi pottery, and intricate bamboo crafts",
      image: "/api/placeholder/400/300",
    },
    {
      state: "Tripura",
      description:
        "Recognized for bamboo handicrafts, handloom textiles, and Risha (traditional stoles)",
      image: "/api/placeholder/400/300",
    },
    {
      state: "Arunachal Pradesh",
      description:
        "Distinguished by its tribal weaving, carpet making, and wood carving traditions",
      image: "/api/placeholder/400/300",
    },
  ];

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />

      {/* Modified Hero Section with Background */}
      <div className=" bg-gradient-to-r from-slate-900 to-slate-800 text-white  mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: "url('/api/placeholder/1600/600')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-28 md:py-36 flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Heart className="text-white" size={36} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            <span className="text-white">About </span>
            <span className="text-orange-500">ArtisanKart</span>
          </h1>
          <div className="w-32 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl md:text-3xl text-orange-200 font-medium mb-8 text-center">
            Preserving Heritage, Empowering Communities
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed">
            Connecting the rich craft traditions of North Eastern India to
            conscious consumers worldwide through authentic handcrafted
            treasures.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Our Collection
            </Link>
            <Link
              to="/artisans"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
            >
              Meet Our Artisans
            </Link>
          </div>
        </div>

        {/* Decorative shape at bottom of hero */}
        <div className="absolute -bottom-2 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 40"
            className="w-full h-auto"
          >
            <path
              fill="#fff9e6"
              fillOpacity="1"
              d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,42.7C1120,43,1280,21,1360,10.7L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Mission Section with Design Elements */}
        <div className="mb-24 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 -z-10 rounded-full translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200 -z-10 rounded-full -translate-x-1/2 translate-y-1/4 opacity-60"></div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-l-4 border-orange-500 transition-transform hover:scale-[1.01]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Award className="text-orange-600" size={24} />
              </div>
              <h2 className="text-3xl font-semibold text-slate-800">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              ArtisanKart is dedicated to preserving and promoting the rich
              cultural heritage of North Eastern India through its exquisite
              handicrafts. Our mission is to create a sustainable marketplace
              that connects skilled artisans directly with conscious consumers
              worldwide, ensuring fair compensation and recognition for
              traditional craftsmanship.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-orange-200 pl-4">
              We believe that every handcrafted piece tells a story - of ancient
              traditions, of skilled hands, and of cultural identities that
              deserve to be celebrated and preserved for generations to come.
            </p>
          </div>
        </div>

        {/* Story Section with Image */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div>
            <div className="inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-600 font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-orange-200 pb-2 inline-block">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Our story began with a vision to showcase the vibrant and diverse
              handicrafts of North Eastern India to the world. Inspired by the
              rich heritage and the incredible craftsmanship of local artisans,
              we set out to create a platform that not only honors their skills
              but also provides them with the recognition they deserve.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Every product on our platform tells a story—of tradition passed
              down through generations, of creativity rooted in culture, and of
              artisans who pour their hearts into every piece. We are passionate
              about preserving these traditions while empowering artisans with
              opportunities to thrive in the modern market.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, ArtisanKart stands as a bridge between tradition and
              modernity, helping artisans reach global markets while preserving
              their cultural identity and traditional methods.
            </p>
          </div>
          <div className="relative">
            <img
              src="/api/placeholder/600/500"
              alt="ArtisanKart Journey"
              className="rounded-lg shadow-xl z-10 relative"
            />
            <div className="absolute top-6 right-6 bottom-6 left-6 border-2 border-orange-300 rounded-lg -z-10"></div>
          </div>
        </div>

        {/* Impact Stats with Enhanced Visuals */}
        <div className="bg-orange-100 rounded-xl p-10 mb-24 shadow-lg">
          <h3 className="text-3xl font-semibold text-orange-800 mb-8 text-center">
            Our Impact
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                500+
              </div>
              <h4 className="font-semibold text-xl mb-2">Artisan Families</h4>
              <p className="text-gray-700">
                Providing sustainable livelihoods across 8 North Eastern states
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                25+
              </div>
              <h4 className="font-semibold text-xl mb-2">Craft Forms</h4>
              <p className="text-gray-700">
                Including bamboo craft, weaving, pottery and indigenous textiles
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                8
              </div>
              <h4 className="font-semibold text-xl mb-2">States Covered</h4>
              <p className="text-gray-700">
                Recording traditional techniques and stories from all North
                Eastern states
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                100%
              </div>
              <h4 className="font-semibold text-xl mb-2">Eco-friendly</h4>
              <p className="text-gray-700">
                Promoting sustainable materials and traditional eco-conscious
                methods
              </p>
            </div>
          </div>
        </div>

        {/* Craft Heritage Section with Cards and Images */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">
              North Eastern Craft Heritage
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The North Eastern region of India is home to some of the country's
              most distinctive and diverse handicraft traditions. Each state has
              its own unique cultural identity reflected in its crafts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {craftDetails.map((craft, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-48">
                  <img
                    src={craft.image}
                    alt={`${craft.state} crafts`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-2xl font-semibold p-4">
                      {craft.state}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{craft.description}</p>
                  <button className="mt-4 flex items-center text-orange-600 font-medium hover:text-orange-800 transition">
                    Discover more <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section with Improved Cards */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Behind ArtisanKart is a passionate team dedicated to supporting
              artisans and bringing the beauty of North Eastern handicrafts to
              the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-medium">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t-4 border-orange-500">
                  <h3 className="font-bold text-xl text-slate-800">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section with Icons */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-orange-600 mb-4">
                Authenticity
              </h3>
              <p className="text-gray-700">
                We celebrate genuine craftsmanship and ensure every product
                tells an authentic story of its cultural origins.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-orange-600 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-700">
                We promote eco-friendly practices and materials that honor
                traditional methods while protecting our environment.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-orange-600 mb-4">
                Community
              </h3>
              <p className="text-gray-700">
                We believe in fair trade practices that empower artisan
                communities and preserve their cultural heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action with Enhanced Design */}
        <div className="relative mb-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('/api/placeholder/1600/600')" }}
          ></div>
          <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl p-12 text-center">
            <Heart className="mx-auto mb-6" size={48} />
            <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Support North Eastern artisans and bring home a piece of cultural
              heritage. Every purchase makes a difference in preserving
              traditional crafts and empowering communities.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/shop"
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full hover:bg-orange-50 shadow-lg transition-transform hover:scale-105"
              >
                Shop Collection
              </Link>

              <Link
                to="/artisans"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-orange-500 transition-transform hover:scale-105"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup - New */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-700 mb-4">
                Join our community of craft enthusiasts and be the first to know
                about new artisans, collections, and stories from North Eastern
                India.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-orange-500 mr-2" />
                  <span>Exclusive early access to new collections</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-orange-500 mr-2" />
                  <span>Artisan stories and craft techniques</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-orange-500 mr-2" />
                  <span>Special discounts for subscribers</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
