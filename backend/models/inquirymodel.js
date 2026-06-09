import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    businessProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessProfile"
},

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    message: {
        type: String,
        required: true
    },
      isRead: {
        type: Boolean,
        default: false,
      },
    },{
        timestamps: true
});


const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;