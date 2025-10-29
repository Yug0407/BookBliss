import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const Checkbox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900 select-none">
        {label}
      </span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900 select-none">
        {label}
      </span>
    </label>
  );
};

const AllRoom = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = ["Price Low to High", "Price High to Low"];

  const handleRoomTypeChange = (checked, roomType) => {
    if (checked) {
      setSelectedRoomTypes((prev) => [...prev, roomType]);
    } else {
      setSelectedRoomTypes((prev) => prev.filter((item) => item !== roomType));
    }
  };

  const handlePriceRangeChange = (checked, range) => {
    if (checked) {
      setSelectedPriceRanges((prev) => [...prev, range]);
    } else {
      setSelectedPriceRanges((prev) => prev.filter((item) => item !== range));
    }
  };

  const handleClearAll = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSortOption("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hotel Rooms
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Take advantage of these last-minute deals and special packages to
          enhance your next adventure at discounted rates!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-8">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">FILTER</h3>
              <div className="flex gap-4">
                <span
                  onClick={() => setOpenFilters(!openFilters)}
                  className="text-sm text-blue-600 cursor-pointer lg:hidden"
                >
                  {openFilters ? "HIDE" : "SHOW"}
                </span>
                <span
                  onClick={handleClearAll}
                  className="text-sm text-blue-600 cursor-pointer hover:text-blue-700"
                >
                  Clear All
                </span>
              </div>
            </div>

            {/* Filter Content */}
            <div
              className={`${
                openFilters ? "block" : "hidden lg:block"
              } p-6 space-y-6`}
            >
              {/* Room Types */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Room Type</h4>
                <div className="space-y-1">
                  {roomTypes.map((room, index) => (
                    <Checkbox
                      key={index}
                      label={room}
                      selected={selectedRoomTypes.includes(room)}
                      onChange={handleRoomTypeChange}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  Price Range
                </h4>
                <div className="space-y-1">
                  {priceRanges.map((range, index) => (
                    <Checkbox
                      key={index}
                      label={`$${range}`}
                      selected={selectedPriceRanges.includes(range)}
                      onChange={(checked) =>
                        handlePriceRangeChange(checked, range)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Sort By</h4>
                <div className="space-y-1">
                  {sortOptions.map((option, index) => (
                    <RadioButton
                      key={index}
                      label={option}
                      selected={sortOption === option}
                      onChange={setSortOption}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms List - One per row */}
        <div className="lg:w-3/4">
          <div className="space-y-6">
            {roomsDummyData.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Room Image - Left Side */}
                  <div className="md:w-2/5 relative">
                    <img
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        scrollTo(0, 0);
                      }}
                      className="w-full h-64 md:h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      src={room.images[0]}
                      alt={room.hotel.name}
                      title="View Room Detail"
                    />
                    {/* Distance Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                      300 meters
                    </div>
                  </div>

                  {/* Room Details - Middle */}
                  <div className="md:w-2/5 p-6 flex flex-col justify-between">
                    <div>
                      {/* Location */}
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <img
                          src={assets.locationIcon}
                          alt="location"
                          className="w-4 h-4"
                        />
                        <span>
                          {room.hotel.city}, {room.hotel.country}
                        </span>
                      </div>

                      {/* Hotel Name */}
                      <h3
                        onClick={() => {
                          navigate(`/rooms/${room._id}`);
                          scrollTo(0, 0);
                        }}
                        className="font-playfair text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors mb-2"
                      >
                        {room.hotel.name}
                      </h3>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <StarRating />
                          <span className="text-sm font-medium text-gray-700">
                            4.5
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          200+ Reviews
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {room.amenities.slice(0, 4).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-xs text-gray-600"
                          >
                            <img
                              src={facilityIcons[item]}
                              alt={item}
                              className="w-4 h-4"
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="text-xs text-blue-600">
                            +{room.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and Button - Right Side */}
                  <div className="md:w-1/5 p-6 border-l border-gray-100 flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">
                        ${room.pricePerNight}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">/ night</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        scrollTo(0, 0);
                      }}
                      className="relative inline-flex items-center justify-center w-full md:w-auto px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                    >
                      <span className="flex items-center gap-2">
                        View Details
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoom;
