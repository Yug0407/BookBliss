import React from "react";
import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-start h-screen text-white bg-no-repeat bg-cover bg-center px-6 md:px-16 lg:px-24 xl:px-32 pt-40 md:justify-center md:pt-0"
      style={{ backgroundImage: `url(${heroImage})`, paddingTop: '60px' }}
    >
      <p className="inline-block bg-white/20 backdrop-blur-sm text-white text-1xl font-medium py-2 px-4 rounded-full mb-6">
        The Ultimate Hotel Experience
      </p>
      <h1 className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Discover Your Perfect{" "}
            <span className="font-playfair text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              Getaway
            </span>
          </h1>

      <p className="text-base md:text-lg text-white/90">
            Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
    </p>

    {/* Search Form */}
        <form className='bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 mt-8 max-w-sm mx-auto flex flex-col items-start gap-3 md:flex-row md:max-w-none md:mx-0 md:px-6 md:py-4 md:mt-10 md:gap-4'>
                <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="Calender Icon" className="h-4" />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-2 py-1 mt-1 text-sm outline-none w-full" placeholder="Type here" required />
                <datalist id="destinations">
                    {cities.map((city,index)=>(
                    <option value={city} key={index}/>
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="Calender Icon" className="h-4" />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="Calender Icon" className="h-4" />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black/70 py-3 px-4 text-white hover:bg-black/90 my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="Calender Icon" className="h-7" />
                <span>Search</span>
            </button>
        </form>
    </div>
  );
};

export default Hero;
