import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const HotelReg = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    city: '',
    email: '',
    description: ''
  });

  const { setShowHotelReg , axios , getToken , setIsOwner } = useAppContext();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { name, contact, address, city, email, description } = formData;

    const token = await getToken();
    const { data } = await axios.post(
      `/api/hotels/`,
      { name, contact, address, city, email, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response:", data);

    if (data.success) {
      toast.success(data.message);
      setIsOwner(true);
      setShowHotelReg(false);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    toast.error(err.message);
  }
};



  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn'>
      <div className='flex bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp'>
        {/* Left Side - Image */}
        <div className='hidden md:block md:w-1/2 relative'>
          <img 
            src={assets.regImage} 
            alt="Hotel Registration" 
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8'>
            <div className='text-white'>
              <h3 className='text-2xl font-playfair font-bold mb-2'>Join Our Premium Network</h3>
              <p className='text-white/90'>List your property and reach thousands of travelers worldwide</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className=' scrollbar-hide flex flex-col w-full md:w-1/2 p-8 md:p-10 overflow-y-auto'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className='font-playfair text-3xl font-bold text-gray-900'>Register Your Hotel</h2>
              <p className='text-gray-600 mt-2'>Fill in your hotel details to get started</p>
            </div>
            <button 
              onClick={()=>setShowHotelReg(false)}
              className='hover:bg-gray-100 rounded-full transition-colors duration-200'
            >
              <img  src={assets.closeIcon} alt="close" className='h-5 w-5' />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} onClick={(e)=>e.stopPropagation()} className='space-y-6'>
            {/* Hotel Name */}
            <div>
              <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-2'>
                Hotel Name *
              </label>
              <input 
                id="name"
                type="text" 
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl  focus:border-transparent transition-all duration-200 placeholder-gray-400'
                placeholder="Enter your hotel name"
                required
              />
            </div>

            {/* Contact Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor="contact" className='block text-sm font-semibold text-gray-700 mb-2'>
                  Phone Number *
                </label>
                <input 
                  id="contact"
                  type="tel" 
                  value={formData.contact}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 placeholder-gray-400'
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email Address *
                </label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xlfocus:border-transparent transition-all duration-200 placeholder-gray-400'
                  placeholder="hotel@example.com"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className='block text-sm font-semibold text-gray-700 mb-2'>
                Full Address *
              </label>
              <input 
                id="address"
                type="text" 
                value={formData.address}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 placeholder-gray-400'
                placeholder="Street address, landmark"
                required
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className='block text-sm font-semibold text-gray-700 mb-2'>
                City *
              </label>
              <input 
                id="city"
                type="text" 
                value={formData.city}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 placeholder-gray-400'
                placeholder="Enter city name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className='block text-sm font-semibold text-gray-700 mb-2'>
                Hotel Description
              </label>
              <textarea 
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none'
                placeholder="Brief description about your hotel..."
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl'
            >
              Register Hotel
            </button>

            {/* Footer Text */}
            <p className='text-center text-sm text-gray-500'>
              By registering, you agree to our{' '}
              <a href="#" className='text-blue-600 hover:text-blue-700 font-medium'>Terms of Service</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HotelReg