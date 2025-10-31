import User from "../models/User";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try{

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);


        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting Data from request body
        const {data , type} = req.body
        const userData = {
            _id : data.id,
            username : data.first_name + " " + data.last_name,
            email : data.email_addresses[0].email_address,
            password : Math.random().toString(36).slice(-8), // Generating Random Password
            image : data.image_url,
        }

        switch(type){
            case "user.created": {
                // Create New User
                await User.create(userData);
                break;
            }
            case "user.deleted": {
                // Delete User
                await User.findByIdAndDelete(data.id , userData);
                break;
            } 
            case "user.updated": {
                // Update User
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            default:
                console.log("Unhandled Webhook Type: " + type);
                break;
        }

        res.status(200).json({message : "Clerk Webhook Handled Successfully" , success : true});

    }catch(err){
        console.log("Error In Clerk Webhook" , err);
        res.status(500).json({message : "Internal Server Error\n" + err.message , success : false});
    }

}