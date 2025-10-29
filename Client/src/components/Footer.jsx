import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🏨</span>
            </div>
            <span className="font-playfair text-3xl font-bold text-gray-900">QuickStay</span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Making your travels memorable with the perfect stay. Experience comfort, luxury, and exceptional service.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 ">
          {[
            { icon: assets.facebookIcon, color: 'bg-blue-500' },
            { icon: assets.instagramIcon, color: 'bg-pink-500' },
            { icon: assets.twitterIcon, color: 'bg-sky-400' },
            { icon: assets.linkendinIcon, color: 'bg-blue-600' }
          ].map((social, index) => (
            <a 
              key={index}
              href="/" 
              className="w-12 h-12 bg-white rounded-xl shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group border border-amber-200"
            >
              <img src={social.icon} alt="social-icon" className="w-5 opacity-70 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-100 bg-white/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 QuickStay. Made with ❤️ for travelers everywhere.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>🌍 Available worldwide</span>
              <span>⭐ 4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decoration */}
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-amber-400 rounded-full opacity-20"></div>
      <div className="absolute top-4 left-4 w-4 h-4 bg-orange-300 rounded-full opacity-30"></div>
    </footer>
  )
}

export default Footer