import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    })

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free Wi-Fi': false,
            'Air Conditioning': false,
            'Room Service': false,
            'Mountain View': false,
            'Ocean View': false,
            'Breakfast Included': false,
            'Swimming Pool': false,
            'Fitness Center': false,
        },
    })

    const handleImageUpload = (key, file) => {
        setImages(prev => ({ ...prev, [key]: file }))
    }

    const handleAmenityChange = (amenity) => {
        setInputs(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [amenity]: !prev.amenities[amenity]
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted:', { images, inputs })
    }

    return (
      <>
              <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Header */}
                    <Title 
                        align='left' 
                        font='outfit' 
                        title='Add Room' 
                        subTitle='Fill in the details carefully with accurate room information, pricing, and amenities to enhance the user booking experience.' 
                    />

                    {/* Images Section */}
                    <div className="mt-8">
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                            Room Images <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-4">Upload at least 3 images (Max 5)</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {Object.keys(images).map((key) => (
                                <label 
                                    htmlFor={`roomImage${key}`} 
                                    key={key}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {images[key] ? (
                                            <img 
                                                className="w-full h-full object-cover"
                                                src={URL.createObjectURL(images[key])} 
                                                alt={`Room preview ${key}`} 
                                            />
                                        ) : (
                                            <div className="text-center p-4">
                                                <img 
                                                    src={assets.uploadArea} 
                                                    alt="Upload" 
                                                    className="w-8 h-8 mx-auto mb-2 opacity-60"
                                                />
                                                <span className="text-xs text-gray-500">Image {key}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-xl flex items-center justify-center">
                                        <div className="bg-white bg-opacity-90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-200">
                                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept='image/*' 
                                        id={`roomImage${key}`} 
                                        hidden
                                        onChange={e => handleImageUpload(key, e.target.files[0])} 
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Room Details Section */}
                    <div className="mt-8">
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                            Room Details
                        </label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Room Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Type <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    value={inputs.roomType}
                                    onChange={e => setInputs({...inputs, roomType: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                    required
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Single Bed">Single Bed</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Luxury Room">Luxury Room</option>
                                    <option value="Family Suite">Family Suite</option>
                                    <option value="Executive Suite">Executive Suite</option>
                                    <option value="Presidential Suite">Presidential Suite</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Per Night <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input 
                                        type="number" 
                                        placeholder="0.00"
                                        value={inputs.pricePerNight}
                                        onChange={e => setInputs({...inputs, pricePerNight: e.target.value})}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="mt-8">
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                            Amenities
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.keys(inputs.amenities).map((amenity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                                    <input 
                                        type="checkbox" 
                                        id={`amenities${index + 1}`}
                                        checked={inputs.amenities[amenity]}
                                        onChange={() => handleAmenityChange(amenity)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                    />
                                    <label 
                                        htmlFor={`amenities${index + 1}`}
                                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                                    >
                                        {amenity}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 pt-6 border-t border-gray-200">
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 focus:outline-none"
                        >
                            Add Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
<div className="h-20"></div>
</>


    )
}

export default AddRoom