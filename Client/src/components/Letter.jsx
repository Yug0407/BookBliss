import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Newsletter = () => {

  return (
    <section className="bg-white px-6 py-16 md:py-20 border-t border-b border-gray-100">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Elegant Header */}
        <div className="mb-10">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Be the first to know about new destinations, special offers, and travel tips from QuickStay.
          </p>
        </div>

        {/* Clean Form */}
        <form className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="email"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-400 transition-all duration-200 pr-32"
              placeholder="Enter your email"
              required
            />
            <button 
              type="submit"
              className="absolute right-1 top-1 bg-black hover:bg-amber-600 text-white font-medium rounded-lg px-4 py-3 transition-all duration-200 flex items-center gap-2 text-sm"
            >
              Subscribe
              <img
                src={assets.arrowIcon}
                alt="arrow"
                className="w-3 invert"
              />
            </button>
          </div>
        </form>

        {/* Simple Trust Text */}
        <div className="mt-6 text-gray-500 text-sm">
          <p>Join thousands of travelers. No spam, just inspiration. ✨</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter