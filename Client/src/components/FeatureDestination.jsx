import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import { useNavigate } from 'react-router-dom'

const FeatureDestination = () => {
    const navigate = useNavigate();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center aligned text */}
        <div className="text-center max-w-3xl mx-auto"> {/* Added text-center and mx-auto */}
          <h2 className="font-playfair text-6xl font-bold text-brand-black mb-4">
            Featured Hotels
          </h2>
          <p className="text-lg text-gray-600">
            Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences
          </p> 
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-6 mt-12 overflow-x-auto pb-6 scrollbar-hide">
          {roomsDummyData.map((room, index) => (
            <div key={index} className="min-w-[320px] flex-shrink-0">
              <HotelCard room={room} index={index} />
            </div>
          ))}
        </div>

        {/* Centered button */}
        <div className="text-center mt-6">
          <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className="bg-white text-black border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-sm">
            View All Hotels
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeatureDestination