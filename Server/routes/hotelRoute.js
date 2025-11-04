import express from "express";
import { registerHotel } from "../controllers/hotelController.js";
import { requireAuth } from '@clerk/express'

const hotelRouter = express.Router();

hotelRouter.post('/', requireAuth() , registerHotel);

export default hotelRouter ;