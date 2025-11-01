import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebHooks.js"; // <-- ensure you import this
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoute.js";

dotenv.config();
connectDB();
connectCloudinary();

const app = express();
app.use(cors());
app.use(clerkMiddleware());

// ⚠️ Important: Add JSON parser AFTER webhook route
app.use("/api/clerk/webhook", express.raw({ type: "application/json" }), clerkWebhooks);

// Now parse JSON for all other routes
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms' , roomRouter);


app.listen(PORT, () => console.log(`Server is Running On Port ${PORT} ✌️`));
