import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ProductCategoryRoutes from "./routes/ProductsCategoryRoutes.js";
import BrandRoutes from "./routes/BrandRotes.js";
import CouponRoutes from "./routes/CouponRoutes.js";
import Handlers from "./middlewares/errorHandler.js";
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

app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/category", ProductCategoryRoutes);
app.use("/api/brand", BrandRoutes);
app.use("/api/Coupon", CouponRoutes);
app.use("/api/stripe", stripe);

app.use(Handlers.notfound);
app.use(Handlers.errorHandler);

mongoose.set("strictQuery", false);
mongoose.connect(URI, PARAMS)
    .then(() => app.listen(PORT, 
        () => console.info(`Server running on PORT ${PORT} 🔥`)))
    .catch((err) => console.error(err.message));
