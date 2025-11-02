import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Function to check Avalibilty of Room 


const checkAvailibilty = async(req,res)=>{
    try{
        const bookings = await Booking.find({
            room : req.params.roomId,
            checkOutDate : { $gte : new Date() },
            checkInDate : { $lte : new Date() }
        })

       
        const isAvailable = bookings.length === 0;
        return isAvailable;
    }catch(err){
        res.status(500).json({ message: "Error in Is Available " +err.message });
    }
}

//API to check availabilty of room
// PIST /api/bookings/check-availability

export const checkAvailibiltyAPI = async(req,res)=>{
    try{
        const {room ,checkInDate , checkOutDate} = req.body;
        const isAvailable = await checkAvailibilty({checkInDate,checkOutDate ,room});

        res.status(200).json({success : true , isAvailable});
    }
    catch(err){
        res.status(500).json({success : false , message : "Error in Checking Availability "+err.message})
    }
}

//API to create a new booking 
// POST/api/bookings/book

export const createBooking = async (req,res) =>{
    try{
        const {room ,checkInDate , checkOutDate ,guests }  = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailibilty({
            checkInDate,
            checkOutDate,
            room
        })

        if(!isAvailable){
            return res.json({success : false , message : " Room is not available"})
        
        }

        const roomData  = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights;

        const checkin = new Date(checkInDate)
        const checkout = new Date(checkOutDate);
        const timeDiff = checkout.getTime() = checkin.getTime();
        const nights = Math.ceil(timeDiff/(1000*3600*24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel : roomData.hotel._id,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests : +guests,
        });

        res.status(200).json({success : true ,message : "Booking Created Successfully" ,data : booking});

    }catch(err){
        res.status(500).json({success : false , message : "Error in Creating Booking "+err.message});   
    }
}

// API to get User Bookings
// GET /api/bookings/user

export const getUserBookings = async (req,res) => {{
    try{
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room").populate("room hotel").sort({createdAt : -1});
        res.status(200).json({success : true ,message : "User Bookings Fetched Successfully" , data : bookings});
    }catch(err){
        res.status(500).json({success : false , message : "Error in Getting User Bookings "+ err.message});
    }   
}}


// API to get Hotel Bookings
// GET /api/bookings/hotel
export const getHotelBookings = async (req,res) => {
    try{
        const hotel = await Hotel.findOne({owner : req.auth.userId});
        if(!hotel){
            return res.status(404).json({success : false , message : "Hotel not found"});
        }
        const bookings = await Booking.find({hotel : hotel._id}).populate("room hotel user").sort({createdAt : -1});
        
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((total , booking) => total + booking.totalPrice , 0);

        res.status(200).json({success : true ,message : "Hotel Bookings Fetched Successfully" , dashboardData : { totalBookings , totalRevenue ,bookings}});

    }catch(err){
        res.status(500).json({success : false , message : "Error in fetch Bookling "+ err.message});
    }
}