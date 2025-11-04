import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req,res)=>{
    try{
        const {userId} = req.auth();
        if(!userId){
            return res.status(500).json({response : false , message : "Not authenticated "})
        }

        const { name , address , contact , city ,description , email} = req.body;

        const hotel = await Hotel.findOne({owner : userId });
        if(hotel){
            return res.json({success : true , message : "Hotel Already Registered"})
        }

        await Hotel.create({name,address,contact,city, description,email ,owner : userId});
        await User.findByIdAndUpdate(userId , { role : "hotelOwner"});

        res.json({success : true , message : 'Hotel Registered Successfully'})

    }catch(err){
        res.json({success : false , message : err.message});
    }
}