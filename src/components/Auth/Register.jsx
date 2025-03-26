import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const link=import.meta.env.VITE_BACKEND_LINK;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const body = {
        userName:formData.fullName,
        email:formData.email,
        password:formData.password,
      };      
      // Simulating API call
      const response=await axios.post(`${link}/api/auth/register`,body);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });      
      // Replace with actual API call
      navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg border-t-4 border-t-amber-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-600">ArtisanKart</h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto my-2"></div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our community of artisans and craft enthusiasts
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Satyam Kesarwani"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-amber-600 hover:text-amber-500">Terms of Service</a> and <a href="#" className="text-amber-600 hover:text-amber-500">Privacy Policy</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-amber-500 group-hover:text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </span>
              Create Account
            </button>
          </div>
          
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
                className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;