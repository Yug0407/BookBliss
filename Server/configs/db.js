import mongoose from "mongoose";

const connectDB = async()=> {
    try{
        mongoose.connection.on('connected' , ()=> console.log("Database Connected 😊"))
        await mongoose.connect(`${process.env.MONGODB_URI}/BookBliss`)
    }catch(err){
        console.log("Error In Mongo DB Connection" , err);
        
    }
}

export default connectDB ;