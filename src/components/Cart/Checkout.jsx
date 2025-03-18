import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCity, 
  FaGlobeAmericas, 
  FaMapPin, 
  FaCreditCard, 
  FaLock, 
  FaShoppingBag, 
  FaTags, 
  FaTruck, 
  FaPercentage, 
  FaInfoCircle, 
  FaArrowRight, 
  FaClock,
  FaGift,
  FaArrowLeft,
  FaShippingFast,
  FaMoneyBillWave,
  FaShieldAlt,
  FaHandHoldingUsd,
  FaRegCreditCard,
  FaCalendarAlt,
  FaPiggyBank,
  FaStarOfLife
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast"

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Currency mapping for common countries
  const countryCurrencyMap = {
    "United States": "USD",
    "United Kingdom": "GBP",
    "Australia": "AUD",
    "Canada": "CAD",
    "European Union": "EUR",
    "Japan": "JPY",
    "China": "CNY",
    "India": "INR",
    "Brazil": "BRL",
    "South Africa": "ZAR",
    // Add more countries and their currencies as needed
  };

  // Default currencies for selection
  const currencies = [
    "USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY", "INR", "BRL", "ZAR"
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    currency: 'USD'
  });

  // Get cart data from location state (passed from Cart component)
  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    shipping: 20,
    tax: 0
  });

  // Sample products data (in case no cart data is passed)
 
  // Initialize cart from location state or use sample data
  useEffect(() => {
    if (location.state && location.state.cartItems && location.state.cartItems.length > 0) {
      const cartItems = location.state.cartItems;
      const subtotal = location.state.subtotal || cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxRate = 0.07; // 7% tax
      const tax = subtotal * taxRate;
      
      setCart({
        items: cartItems,
        subtotal: subtotal,
        shipping: 20,
        tax: tax
      });
    } else {
      // Use sample data if no cart data is passed
      const subtotal = sampleProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxRate = 0.07;
      const tax = subtotal * taxRate;
      
      setCart({
        items: sampleProducts,
        subtotal: subtotal,
        shipping: 20,
        tax: tax
      });
    }
  }, [location]);

  const total = cart.subtotal + cart.shipping + cart.tax;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Update currency based on country selection
    if (name === 'country' && countryCurrencyMap[value]) {
      setFormData(prevState => ({ 
        ...prevState, 
        [name]: value,
        currency: countryCurrencyMap[value]
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiptId = "RCPT-" + Math.floor(Math.random() * 100000);
    
        // Create an order on the server
        const response = await fetch("http://localhost:5000/api/payment/create-order", {
            method: "POST",
            body: JSON.stringify({
                amount: total,
                currency: formData.currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Order creation failed!");

        const order = await response.json();

       console.log(order);
       verifyPayment(order);
        // Step 2.3: Open Razorpay payment gateway

        
};
const verifyPayment=async (order)=>
  {
   
    const options = {
      key:"rzp_test_AwFFGcqPgNWstn", // Replace with your Razorpay key
      amount: total*100,
      currency: formData.currency,
      order_id: order.id,
      name: "ArtisanKart",
      description: "Payment for your order",
      image: "/logo.png",
      handler: async (response) => {
          console.log("Payment successful! Response:", response);
  try
          {// Send payment details to the backend for verification
          const res = await fetch("http://localhost:5000/api/payment/verify-payment", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
              }),})
             const verifyData=await res.json();
  
             if(verifyData.message)
              toast.success(verifyData.message)
          }
          catch(error)
         { console.log(error);}
        },
        theme:
        {
          color:"#5f63b8"
        }
      };
      const rzp1=new window.Razorpay(options);
      rzp1.open();
    }
  

       

  
  

  // Comprehensive list of countries
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", 
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", 
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", 
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", 
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", 
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", 
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", 
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-gray-50 min-h-screen">
      <div className="bg-yellow-50 absolute top-0 left-0 right-0 h-40 -z-10"></div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
        <FaShoppingBag className="mr-3 text-yellow-600" />
        Complete Your Purchase
      </h1>
      <p className="text-gray-600 mb-8">You're just a few steps away from supporting amazing artisans.</p>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaShoppingBag />
            </div>
            <span className="text-sm font-medium text-gray-700">Cart</span>
          </div>
          <div className="h-1 bg-yellow-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaTruck />
            </div>
            <span className="text-sm font-medium text-yellow-600">Shipping</span>
          </div>
          <div className="h-1 bg-yellow-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaCreditCard />
            </div>
            <span className="text-sm font-medium text-gray-500">Payment</span>
          </div>
          <div className="h-1 bg-gray-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaGift />
            </div>
            <span className="text-sm font-medium text-gray-500">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="font-semibold text-gray-700 text-xl flex items-center">
                <span className="bg-yellow-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">1</span>
                Shipping Information
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaUser className="mr-2 text-yellow-600" size={14} />
                    First Name <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="firstName" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required 
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaUser className="mr-2 text-yellow-600" size={14} />
                    Last Name <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="lastName" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required 
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaEnvelope className="mr-2 text-yellow-600" size={14} />
                    Email <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required 
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaPhone className="mr-2 text-yellow-600" size={14} />
                    Phone <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="phone" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-yellow-600" size={14} />
                    Street Address <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="address" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaCity className="mr-2 text-yellow-600" size={14} />
                    City <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="city" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapPin className="mr-2 text-yellow-600" size={14} />
                    State/Province <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="state" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapPin className="mr-2 text-yellow-600" size={14} />
                    ZIP/Postal Code <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaGlobeAmericas className="mr-2 text-yellow-600" size={14} />
                    Country <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <select 
                    name="country" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    value={formData.country}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMoneyBillWave className="mr-2 text-yellow-600" size={14} />
                    Currency <span className="text-red-500 ml-1"><FaStarOfLife size={8} /></span>
                  </label>
                  <select 
                    name="currency" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200" 
                    onChange={handleChange} 
                    required
                    value={formData.currency}
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Link to="/cart" className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-200">
                  <FaArrowLeft className="mr-2" />
                  Back to Cart
                </Link>
                <button 
                  type="submit" 
                  className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition duration-200 flex items-center"
                >
                  Proceed to Payment
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 sticky top-6">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="font-semibold text-gray-700 text-xl flex items-center">
                <FaTags className="mr-2 text-yellow-600" />
                Order Summary
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-gray-500 text-xs mt-1">Artisan: {item.artisan}</p>
                    </div>
                    <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 py-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-800">${cart.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium text-gray-800">${cart.shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (7%)</p>
                  <p className="font-medium text-gray-800">${cart.tax.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 font-semibold text-lg">
                <p>Total</p>
                <p className="text-yellow-600">${total.toFixed(2)}</p>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <FaShieldAlt className="mr-2 text-yellow-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaHandHoldingUsd className="mr-2 text-yellow-600" />
                  <span>Support artisans worldwide</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaPercentage className="mr-2 text-yellow-600" />
                  <span>Fair trade certified products</span>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 flex items-center">
                  <FaInfoCircle className="mr-2 text-yellow-600" />
                  Your purchase directly supports artisans and their communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;