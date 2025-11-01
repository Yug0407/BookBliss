import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (red,res)=>{
    try{
        const { name , address , contact , city} = req.body;
        const owner = req.user._id;

        const hotel = await Hotel.findOne({owner});
        if(hotel){
            return res.json({success : true , message : "Hotel Already Registered"})
        }

        await Hotel.create({name,address,contact,city});
        await User.findByIdAndUpdate(owner , { role : "hotelOwner"});

        res.json({success : true , message : 'Hotel Registered Successfully'})

    }catch(err){
        res.json({success : false , message : err.message});

    }
}