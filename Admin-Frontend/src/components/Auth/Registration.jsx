import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, EyeOff, Eye, AlertCircle, Globe, Home, Key } from 'lucide-react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const body = {
        userName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };      
      const response = await axios.post("http://localhost:5000/api/admin/auth/admin-register", body);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
      });      
      navigate('/admin-panel/auth/login', { state: { message: 'Registration successful. Please log in.' } });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-4">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-block bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-lg mb-6"
          >
            <Globe size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-purple-900">Admin Portal</h1>
          <p className="text-purple-700 mt-2">Create your admin account</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Key size={20} className="mr-2" />
              Admin Registration
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start"
            >
              <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
              <p className="text-red-800 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-purple-800">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3.5 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-purple-50/50 hover:bg-white focus:bg-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-purple-800">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3.5 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-purple-50/50 hover:bg-white focus:bg-white"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-purple-800">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-purple-50/50 hover:bg-white focus:bg-white"
                    placeholder="Create a secure password"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-purple-400 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-purple-600 mt-1">Password must be at least 8 characters</p>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2 text-purple-800">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-purple-50/50 hover:bg-white focus:bg-white"
                    placeholder="Confirm your password"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-purple-400 hover:text-purple-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-70 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create Admin Account'
                )}
              </motion.button>
            </form>

            {/* Home button */}
            <div className="mt-8 pt-6 border-t border-purple-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToHomePage}
                className="w-full flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                <Home size={18} className="mr-2" />
                Go to Home Page
              </motion.button>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100">
            <p className="text-center text-purple-700 text-sm">
              Already have an account?{' '}
              <Link to="/admin-panel/auth/login" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors">
                <span>Sign In</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </p>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-purple-700 text-sm">
          <p>©️ 2025 Admin Portal. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;