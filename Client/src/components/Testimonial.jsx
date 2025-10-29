import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 px-6 md:px-16 lg:px-24">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Title 
          title='What Our Guests Say' 
          subTitle='Discover why discerning travelers choose QuickStay for their luxury accommodations around the world.' 
        />
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-14 border-t border-gray-200">
        <StatItem number="10K+" label="Happy Guests" />
        <StatItem number="50+" label="Luxury Hotels" />
        <StatItem number="15+" label="Countries" />
        <StatItem number="4.9" label="Average Rating" />
      </div>
    </section>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div 
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-10 translate-x-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      {/* Quote Icon */}
      <div className="text-4xl text-amber-400 font-serif mb-4 opacity-80">"</div>
      
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed mb-6 text-lg italic relative z-10">
        "{testimonial.review}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className="relative">
          <img 
            className="w-14 h-14 rounded-full border-2 border-white shadow-md" 
            src={testimonial.image} 
            alt={testimonial.name} 
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <p className="font-playfair text-xl font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {testimonial.address}
          </p>
        </div>
      </div>
    </div>
  )
}

// Stat Item Component
const StatItem = ({ number, label }) => {
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
        {number}
      </div>
      <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

export default Testimonial