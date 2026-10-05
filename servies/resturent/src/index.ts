import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/resturent.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/restaurant", restaurantRoutes);

const PORT = process.env.PORT || 5001;



app.listen(PORT, () => {
  console.log(`restaurant service is running on port ${PORT}`);
  connectDB();
});