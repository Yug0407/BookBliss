import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({ rating = 5, size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div className="flex items-center gap-1">
      {Array(5).fill('').map((_, index) => (
        <img 
          key={index}
          className={`${sizeClasses[size]} transition-transform duration-200 hover:scale-110`}
          src={rating > index ? assets.starIconFilled : assets.starIconOutlined} 
          alt={rating > index ? "filled star" : "outlined star"} 
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}.0</span>
    </div>
  )
}

export default StarRating