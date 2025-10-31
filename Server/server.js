import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 3000 ;

app.use("/api/clerk" , clerkMiddleware)

app.get('/' , (req,res) =>{
    res.send('Hello From Backend');
})

app.listen(PORT ,() => console.log(`Server is Running On Port ${PORT} ✌️`));



