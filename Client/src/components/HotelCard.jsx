import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({room, index}) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300'>
      <div className='relative'>
        <img 
          src={room.images[0]} 
          alt="Room Image" 
          className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300'
        />
        {index%2===0 && (
          <p className='absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm'>
            Best Seller
          </p>
        )}
        
        {/* Rating badge positioned on image */}
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1'>
          <img src={assets.starIconFilled} alt="starIcon" className="h-3 w-3" />
          <span className="text-xs font-semibold">4.9</span>
        </div>
      </div>
      
      <div className='p-5'>
        {/* Hotel name */}
        <h3 className='font-playfair text-2xl text-gray-900 mb-3'>
          {room.hotel.name}
        </h3>
        
        {/* Location above hotel name */}
        <div className='flex items-center gap-1.5 mb-2'>
          <img src={assets.locationIcon} alt="Location-icon" className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">Maldives</span>
        </div>

        {/* Price and button */}
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-md font-medium text-black'>${room.pricePerNight}<span className='text-sm font-normal text-gray-500'>/ night</span></p>
          </div>
          <button className='bg-white text-black border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard