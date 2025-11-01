import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    console.log("✅ Clerk webhook received (raw)");

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Headers from Clerk
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook (raw buffer)
    const payload = req.body; // still a Buffer here, not JSON yet
    const payloadString = payload.toString("utf8");

    const verified = wh.verify(payloadString, headers);

    const { data, type } = JSON.parse(payloadString);

    const userData = {
      _id: data.id,
      username: data.first_name + " " + data.last_name,
      email: data.email_addresses[0].email_address,
      password: Math.random().toString(36).slice(-8),
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      default:
        console.log("Unhandled Webhook Type:", type);
    }

    res.status(200).json({ message: "Webhook handled successfully ✅" });
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    res.status(400).json({ message: err.message });
  }
};

export default clerkWebhooks;
