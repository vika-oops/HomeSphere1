import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// chat schema
const chatSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: false
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    businessProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessProfile",
    },

    // IMPORTANT: needed for your current routes
    messages: [messageSchema],

    // optional but kept for future use
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }

}, {
    timestamps: true,
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;