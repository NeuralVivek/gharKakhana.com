import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "fooddatabase",
        });
        console.log("Database connected successfully");
    }
    catch (err) {
        console.log("Database  connection failed");
    }
};
export default connectDB;
