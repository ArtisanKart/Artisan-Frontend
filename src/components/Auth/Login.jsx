import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const link=import.meta.env.VITE_BACKEND_LINK;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const body = {
        email:email,
        password:password,
      };
     const response= await axios.post(`${link}/api/auth/login`,body);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
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
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to continue your artisan journey
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
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-amber-500 group-hover:text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
          
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
                className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
              >
                Join ArtisanKart
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;