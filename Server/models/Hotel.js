import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name : {
        type : String ,
        require : true
    },address : {
        type : String ,
        require : true
    },contact : {
        type : String ,
        require : true
    },owner : {
        type : String ,
        require : true,
        ref : "User"
    },city : {
        type : String ,
        require : true
    },
    description : {
        type :String ,
    },
    email : {
        type :String ,
        require : true ,
    }
    
},{timestamps : true})

const Hotel = mongoose.model("Hotel" , HotelSchema);

export default Hotel ;