import mongoose from "mongoose";


export const connectDB = async () => {

    await mongoose.connect("mongodb+srv://homesphere_db_user:AG1pYFtBA1ADSbEn@cluster0.l6brpe5.mongodb.net/HomeSphere").then(() => {
      console.log("DB CONNECTED");
    });
};
