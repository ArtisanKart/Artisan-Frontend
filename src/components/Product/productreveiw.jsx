import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { UserContext } from '../../utils/user_context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const link=import.meta.env.VITE_BACKEND_LINK;

  useEffect(() => {
    axios.get(`${link}/api/shop/review/${productId}`)
      .then(({ data }) => setReviews(data.data))
      .catch(() => toast.error('Failed to load reviews'));
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    
    if (newReview.rating === 0 ) {
      return toast.error('Provide a rating and at least 10 characters');
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${link}/api/shop/review/add`, {
        productId,
        userId: user.id,
        userName: user.userName,
        reviewMessage: newReview.comment,
        reviewValue: newReview.rating
      });

      setReviews([data.data, ...reviews]);
      setNewReview({ rating: 0, comment: '' });
      toast.success('Review submitted');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Review Submission Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <MessageCircle className="mr-3" /> Write Your Review
          </h2>
        </div>
        
        <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
          <div>
            <p className="text-gray-700 mb-3 font-semibold">Your Rating:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={32}
                  className={`
                    cursor-pointer transition-all duration-200 
                    ${star <= newReview.rating 
                      ? 'text-yellow-400 fill-yellow-400 scale-110' 
                      : 'text-gray-300 hover:text-yellow-300'}
                  `}
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                />
              ))}
            </div>
          </div>
          
          <textarea 
            value={newReview.comment} 
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            rows={4}
            placeholder="Share your detailed experience with this product..."
          />
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            disabled={isSubmitting}
            className={`
              w-full py-3 rounded-xl flex items-center justify-center 
              transition-all duration-300
              ${isSubmitting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'}
            `}
          >
            <Send className="mr-2" /> 
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </motion.button>
        </form>

        {/* Reviews Section */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl shadow-md">
              <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <motion.div 
                  key={review._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20}
                          className={i < review.reviewValue ? 'text-yellow-400 fill-yellow-400 scale-110'  : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <small className="text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="text-gray-700 mb-3">{review.reviewMessage}</p>
                  <div className="text-sm text-gray-500 font-semibold">
                    By {review.userName}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductReviews;