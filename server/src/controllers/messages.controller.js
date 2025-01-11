import userModel from "../models/user.model.js";
import MessageModel from "../models/messages.model.js";
import cloudinary from "../controllers/cloudnary.js";
import { getReciverSocketId } from "../../libs/socket.js";
import { io } from "../../libs/socket.js";

const messageController = {
  getUsersForSidebar: async (req, res) => {
    try {
      const loggedInUser = req.user.id;

      const filteredUser = await userModel
        .find({
          _id: { $ne: loggedInUser },
        })
        .select("-password");

      res.status(200).json(filteredUser);
    } catch (error) {
      console.log("Error getting users for sidebar", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id: recieverId } = req.params;
      const myId = req.user.id;
      const messages = await userModel.find({
        $or: [
          { senderId: myId, recieverId: recieverId },
          { senderId: recieverId, recieverId: myId },
        ],
      });
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error getting messages", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { text, image } = req.body;
      const senderId = req.user.id;
      const recieverId = req.params.id;

      let imageUrl;
      if (image) {
        const result = await cloudinary.uploader.upload(image);
        imageUrl = result.secure_url;
      }

      const message = await MessageModel({
        senderId,
        recieverId,
        text,
        image: imageUrl,
      });
      await message.save();

      // real time update

      const reciverSocketId = getReciverSocketId(recieverId);
      if (reciverSocketId) {
        io.to(reciverSocketId).emit("newMessage", message);
      }

      res.status(201).json(message);
    } catch (error) {
      console.log("Error sending message", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default messageController;
