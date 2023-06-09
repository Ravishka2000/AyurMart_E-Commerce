import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import SellerRoutes from "./routes/SellerRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PARAMS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

const URI = process.env.MONGOOSE_URI;
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/seller", SellerRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(URI, PARAMS)
    .then(() => app.listen(PORT, 
        () => console.info(`Seller Service is running on PORT ${PORT} 🔥`)))
    .catch((err) => console.error(err.message));