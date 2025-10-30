import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 md:px-8 py-3">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img 
            src={assets.logo} 
            alt="logo" 
            className="h-10  invert w-auto object-contain hover:scale-105 transition-transform"
          />
        </Link>

        {/* User Button */}
        <UserButton 
          appearance={{
            elements: { avatarBox: "h-9 w-9" },
          }} 
          afterSignOutUrl="/"
        />
      </div>
    </nav>
  )
}

export default Navbar
