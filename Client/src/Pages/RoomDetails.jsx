import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, hotelDummyData, roomCommonData, roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';

const RoomDetails = () => {
  const { id } = useParams(); 
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1
  });

  useEffect(() => {
    const foundRoom = roomsDummyData.find(room => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking details:', formData);
  };

    const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const start = new Date(formData.checkInDate);
      const end = new Date(formData.checkOutDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

     const nights = calculateNights();
  const subtotal = room ? room.pricePerNight * nights : 0;
  const serviceFee = 45;
  const total = subtotal + serviceFee;

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center py-28">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading room details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-28 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-8xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900">
                {room.hotel?.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{room.roomType}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <StarRating />
                  <span className="text-sm text-gray-600">200+ Reviews</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
                  <span className="text-sm">{room.hotel.address}</span>
                </div>
              </div>
            </div>
            
            <div className=" text-black px-4 py-2 rounded-lg text-center">
              
              <p className="text-2xl font-bold">${room.pricePerNight} <p className="text-sm font-normal">per night</p></p>
            </div>
          </div>
        </div>

 {/* Room Gallery Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
  {/* Left: Main Image */}
  <div className="w-full">
    <img
      src={mainImage}
      alt="Room Main"
      className="w-full h-[450px] object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.01]"
    />
  </div>

  {/* Right: Thumbnail Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
    {room?.images.slice(0, 4).map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Room Thumbnail ${index + 1}`}
        onClick={() => setMainImage(image)}
        className={`cursor-pointer w-full h-[215px] object-cover rounded-2xl transition-all duration-300 ${
          mainImage === image
            ? "ring-4 ring-orange-500 scale-[1.02]"
            : "hover:opacity-80"
        }`}
      />
    ))}
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Discount Badge
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-2">
              <span className="text-sm font-semibold">🔥 20% OFF - Limited Time Offer</span>
            </div> */}

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Room Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-50 transition-colors">
                    <img 
                      src={facilityIcons[amenity]} 
                      alt={amenity} 
                      className="w-6 h-6 text-amber-500" 
                    />
                    <span className="text-sm font-medium text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                About This Room
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Guests will be allocated on the ground floor according to availability. You get a comfortable 
                Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest 
                slot please mark the number of guests to get the exact price for groups. The Guests will be 
                allocated ground floor according to availability. You get the comfortable two bedroom apartment 
                that has a true city feeling.
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                What's Included
              </h2>
              <div className="space-y-4">
                {roomCommonData.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src={spec.icon} 
                      alt={`${spec.title} icon`} 
                      className="w-6 h-6 mt-1 text-amber-500" 
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{spec.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img 
                  src={assets.heartIcon} 
                  alt="Host" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-200" 
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Hosted by {room.hotel.owner.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating />
                    <span className="text-sm text-gray-600">200+ Reviews</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Contact Host
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
                Check Availability
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-amber-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Check Availability
                </button>
              </form>

              {/* Price Summary */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100/80">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Price Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">${room.pricePerNight} × {nights} nights</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">${serviceFee}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-black">${total}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <span>🛡️</span>
                    <span className="font-medium">Free cancellation until 24 hours before check-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;