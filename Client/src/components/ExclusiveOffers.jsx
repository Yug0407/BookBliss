import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-gray-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="flex-1 max-w-2xl">
          <Title 
            title="Exclusive Offers" 
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories." 
            align="left" 
          />
        </div>
        <button className="group flex items-center gap-2 font-medium text-gray-700 hover:text-black transition-colors mt-6 md:mt-0">
          View all offers
          <img 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
            className="group-hover:translate-x-1 transition-transform duration-300" 
          />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exclusiveOffers.map((item) => (
          <OfferCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  )
}

// Separate Offer Card Component for better organization
const OfferCard = ({ item }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group h-80 hover:shadow-xl transition-all duration-300">
      {/* Background Image with Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="absolute inset-0 bg-linear-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-white text-red-600 text-sm font-bold px-3 py-1 rounded-full">
          {item.priceOff}% OFF
        </div>

        {/* Offer Details */}
        <div className="text-white">
          <h3 className="font-playfair text-2xl font-bold mb-2">
            {item.title}
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          <p className="text-white/70 text-xs mb-4">
            Expires: {item.expiryDate}
          </p>
          
          {/* CTA Button */}
          <button className="flex items-center gap-2 text-white font-medium group/btn hover:text-amber-200 transition-colors">
            View Offers
            <img 
              src={assets.arrowIcon} 
              alt="arrow-icon" 
              className="invert group-hover/btn:translate-x-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExclusiveOffers