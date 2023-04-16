import express from "express";
import ProductController from "../controllers/ProductController.js";
import AuthMiddlewares from "../middlewares/authMiddleware.js"
import UploadImages from "../middlewares/uploadImages.js";

const router = express.Router();

router.get('/:id', ProductController.getaProduct);
router.get('/', ProductController.getAllProducts);

export default router;