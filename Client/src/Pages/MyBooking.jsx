import React, { useState } from 'react'
import Title from '../components/Title';
import { assets, userBookingsDummyData } from '../assets/assets';

const MyBooking = () => {
    const [bookings, setBookings] = useState(userBookingsDummyData);

    const getStatusColor = (isPaid, checkInDate, checkOutDate) => {
        const now = new Date();
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (!isPaid) return 'mt-8 bg-red-100 text-red-700 border-red-200';
        if (now < checkIn) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (now >= checkIn && now <= checkOut) return 'bg-green-100 text-green-700 border-green-200';
        return 'mt-15 bg-green-100 text-gray-700 border-gray-200';
    };

    const getStatusText = (isPaid, checkInDate, checkOutDate) => {
        const now = new Date();
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (!isPaid) return 'Payment Pending';
        if (now < checkIn) return 'Upcoming';
        if (now >= checkIn && now <= checkOut) return 'Active';
        return 'Completed';
    };

    return (
        <div className='bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-12'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <Title 
                        title='My Bookings' 
                        subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks.'
                    />
                </div>

                {/* Bookings List */}
                <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                    {/* Table Header */}
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200'>
                        <div className='md:col-span-6 font-semibold text-gray-700'>Hotel Details</div>
                        <div className='md:col-span-3 font-semibold text-gray-700 '>Date & Timings</div>
                        <div className='md:col-span-3 font-semibold text-gray-700 text-right'>Status & Actions</div>
                    </div>

                    {/* Bookings */}
                    <div className='divide-y divide-gray-300'>
                        {bookings.map((booking) => (
                            <div key={booking._id} className='p-6 hover:bg-gray-50 transition-colors duration-200'>
                                <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start'>
                                    {/* Hotel Details */}
                                    <div className='md:col-span-6'>
                                        <div className='flex flex-col sm:flex-row gap-4'>
                                            <img 
                                                className='w-full sm:w-40 h-32 object-cover rounded-xl shadow-md' 
                                                src={booking.room.images[0]} 
                                                alt="hotel" 
                                            />
                                            <div className='flex-1'>
                                                <div className='flex items-start justify-between'>
                                                    <div>
                                                        <h3 className='font-playfair text-xl font-bold text-gray-900'>
                                                            {booking.hotel.name}
                                                        </h3>
                                                        <span className='text-gray-500 text-sm'>
                                                            {booking.room.roomType}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className='space-y-2 mt-3'>
                                                    <div className='flex items-center gap-2'>
                                                        <img src={assets.locationIcon} alt="location" className='w-4 h-4 text-gray-400' />
                                                        <span className='text-sm text-gray-600'>{booking.hotel.address}</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <img src={assets.guestsIcon} alt="guests" className='w-4 h-4 text-gray-400' />
                                                        <span className='text-sm text-gray-600'>{booking.guests} guests</span>
                                                    </div>
                                                </div>

                                                <div className='mt-4'>
                                                    <p className='text-lg font-semibold text-gray-900'>
                                                        Total: <span className='text-black'>${booking.totalPrice}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date and Timings */}
                                    <div className='md:col-span-3'>
                                        <div className='space-y-4 '>
                                            <div className=' pl-0 p-3'>
                                                <p className='font-semibold text-blue-900 text-sm'>Check-In</p>
                                                <p className='text-blue-700 font-medium'>
                                                    {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className='pl-0 p-3'>
                                                <p className='font-semibold text-orange-900 text-sm'>Check-Out</p>
                                                <p className='text-orange-700 font-medium'>
                                                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Status & Actions */}
                                    <div className='md:col-span-3'>
                                        <div className='flex flex-col items-end gap-4'>
                                            {/* Status Badge */}
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(booking.isPaid, booking.checkInDate, booking.checkOutDate)}`}>
                                                <div className={`w-2 h-2 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                {getStatusText(booking.isPaid, booking.checkInDate, booking.checkOutDate)}
                                            </div>

                                            {/* Actions */}
                                            <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
                                                {!booking.isPaid && (
                                                    <button className='w-full mt-2 mr-6 bg-white border border-black hover:bg-red-100 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm'>
                                                        Pay Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State (optional) */}
                {bookings.length === 0 && (
                    <div className='text-center py-12'>
                        <div className='text-gray-400 text-6xl mb-4'>🏨</div>
                        <h3 className='font-playfair text-2xl font-bold text-gray-600 mb-2'>No Bookings Yet</h3>
                        <p className='text-gray-500'>Start planning your next adventure!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBooking