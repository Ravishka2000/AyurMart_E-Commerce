import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.get('/:id', ProductController.getaProduct);
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);

export default router;