import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(`🔗 Connecting to MongoDB: ${process.env.MONGODB_URI}`);
    
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on('connected', () =>
      console.log("✅ Database Connected 😊")
    );
  } catch (err) {
    console.log("❌ Error In Mongo DB Connection", err);
  }
};

export default connectDB;
