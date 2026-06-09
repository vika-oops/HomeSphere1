import express from "express";
import Chat from "../models/chatmodel.js";
import { protect } from "../middlewares/authmiddleware.js";

const chatRouter = express.Router();

chatRouter.use(protect);

// CREATE OR START CHAT
chatRouter.post("/start", async (req, res) => {
    try {
        const {
            propertyId,
            sellerId,
            buyerId: provideBuyerId,
            businessProfile
        } = req.body;

        let buyerId, finalSellerId;

        if (req.user.role === "seller") {
            buyerId = provideBuyerId;
            finalSellerId = req.user._id;
        } else {
            buyerId = req.user._id;
            finalSellerId = sellerId;
        }

        if (!buyerId || !finalSellerId) {
            return res.status(400).json({
                message: "Missing buyer or seller Id"
            });
        }

        let chat = await Chat.findOne({
            buyer: buyerId,
            seller: finalSellerId
        });

        if (!chat) {
            chat = await Chat.create({
                property: propertyId,
                buyer: buyerId,
                seller: finalSellerId,
                businessProfile,
                messages: []
            });
        }

        chat = await Chat.findById(chat._id)
            .populate("buyer", "name email profilePic")
            .populate("seller", "name email profilePic")
            .populate("property", "title price images")
            .populate("businessProfile", "businessName businessType");

        res.json(chat);

    } catch (err) {
        res.status(500).json({
            message: "Error creating chat or retrieving chat",
            error: err.message
        });
    }
});

// SEND MESSAGE
chatRouter.post("/send", async (req, res) => {
    try {
        const { chatId, text, image } = req.body;
        const userId = req.user._id;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        // authorization check
        if (
            chat.buyer.toString() !== userId.toString() &&
            chat.seller.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized to send messages in this chat"
            });
        }

        const newMessage = {
            sender: userId,
            text,
            image,
            createdAt: new Date()
        };

        chat.messages.push(newMessage);
        await chat.save();

        const savedMessage = chat.messages[chat.messages.length - 1];

        res.json({
            chat,
            newMessage: savedMessage
        });

    } catch (err) {
        res.status(500).json({
            message: "Error sending message",
            error: err.message
        });
    }
});

// GET USER CHATS
chatRouter.get("/user", async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({
            $or: [
                { buyer: userId },
                { seller: userId }
            ]
        })
        .populate("buyer", "name email profilePic")
        .populate("seller", "name email profilePic")
        .populate("property", "title price images")
        .populate("businessProfile", "businessName businessType")
        .sort({ updatedAt: -1 });

        res.json(chats);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching user chats",
            error: err.message
        });
    }
});

// GET CHAT MESSAGES
chatRouter.get("/:chatId", async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        const userId = req.user._id.toString();

        if (
            chat.buyer.toString() !== userId &&
            chat.seller.toString() !== userId
        ) {
            return res.status(403).json({
                message: "You are not authorized"
            });
        }

        res.json(chat);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching chat",
            error: err.message
        });
    }
});

// DELETE CHAT
chatRouter.delete("/:chatId", async (req, res) => {
    try {
        const userId = req.user._id;
        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        if (
            chat.buyer.toString() !== userId.toString() &&
            chat.seller.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await Chat.findByIdAndDelete(req.params.chatId);

        res.json({
            message: "Chat deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting chat",
            error: err.message
        });
    }
});

export default chatRouter;