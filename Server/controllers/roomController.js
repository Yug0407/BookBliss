import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// Api to create a new for hotel 
export const createRoom = async (req,res) => {
    try {
        const { roomType , pricePerNight , amenities} = req.body;
        const hotel = await Hotel.findOne({owner : req.auth.userId})

        if(!hotel){
        return res.json({success : false , message : "No Hotel Found"});
        }

        //upload image from Cloudniry 
        const uploadImages = req.files.map(async(file) =>{
           const response =  await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })
        const images = await Promise.all(uploadImages);
        await Room.create({
            hotel : hotel._id,
            roomType,
            pricePerNight : +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        })

        res.status(200).json({success : true , message : "Room Created Successfully"})

    }catch(err){
        res.status(500).json({success : false , message : "Error in Room Creating " + err.message})
    }
}

// Apit to get All Rooms 
export const getRooms = async (req,res) => {
    try {
        const rooms = await Room.find({isAvailable : true}).populate({
            path : 'hotel',
            populate : {
                path:'owner',
                select:'image'
            }
        }).sort({createdAt : -1});


        res.status(200).json({success : true , data : rooms});
    }catch(err){
        res.status(500).json({success : false , message : "Error in Getting Rooms " + err.message});
        
    }
}

// Apit to get all room for Specific hotel 

export const getOwnerRooms = async (req,res) => {
    try {

        const hotelData = await Hotel({owner :req.auth.userId})
        const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        res.status(200).json({success : true , data : rooms});

    }catch(err){
        res.status(500).json({success : false , message : err.message});
        
    }
}

//API to toggle avalibility of a room
export const toogleRoomAvailabilty = async (req,res) => {
    try {
        const { roomId} = req.body;
        const roomData = await Room.findById(roomId);

        roomData.isAvailable = !roomData.isAvailable;
        res.status(200).json({success : true , message : "Room Availability Updated"});
    }catch(err){
        res.status(500).json({success : false  , message : err.message});
    }
}