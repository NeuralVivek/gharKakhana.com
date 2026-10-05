import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import uploadRoutes from "./routes/cloudinary.js";


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", uploadRoutes);

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../src/.env");
dotenv.config({ path: envPath });


const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;



if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET_KEY,
});




// app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5002;



app.listen(PORT, () => {
  console.log(`utils service is running on port ${PORT}`);
  
});