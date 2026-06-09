import mongooose from "mongoose";

const contactSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["buyer", "seller", "other"],
        required: true
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongooose.model("Contact", contactSchema);