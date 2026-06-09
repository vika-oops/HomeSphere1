import Wishlist from "../models/wishlistmodel.js";

// to add property to wishlist
export const addToWishlist = async (req, res) => {
try {
const propertyId = req.params.propertyId;

const existing = await Wishlist.findOne({
  user: req.user._id,
  property: propertyId,
});

if (existing) {
  return res.status(400).json({
    success: false,
    message: "Property already in wishlist",
  });
}

await Wishlist.create({
    user: req.user._id,
    property: propertyId
});



res.status(201).json({
  success: true,
  message: "Property added to wishlist",
  wishlistEntry,
});

} 

catch (error) {
res.status(500).json({
  success: false,
  message: error.message,
});
}
}

//to get the property that is in the wishlist
export const getWishlist = async (req,res) => {
    try {
        const data = await Wishlist.find({
            user: req.user._id
        }).populate("property");
        res.status(500).json(data);
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// to remove a property from wishlist
export const removeFromWishlist = async (req,res) => {
    try {
        const propertyId = req.params.propertyId;
        const result = await Wishlist.findOneAndDelete({
            user: req.user._id,
            property: propertyId
        });
        if(!result){
            return res.status(404).json({
                success: false,
                message: "Property not found in wishlist"
            });
        }
        res.status(200).json({
            success: true,
            message: "Property removed from wishlist"
        })
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
