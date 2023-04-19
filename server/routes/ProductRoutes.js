import express from "express";
import ProductController from "../controllers/ProductController.js";
import AuthMiddlewares from "../middlewares/authMiddleware.js"
import UploadImages from "../middlewares/uploadImages.js";

const router = express.Router();

router.post('/', ProductController.createProduct);
router.put('/upload/:id', 
    AuthMiddlewares.authMiddleware, 
    AuthMiddlewares.isAdmin, 
    UploadImages.uploadPhoto.array('images', 10), 
    UploadImages.productImgResize,
    ProductController.uploadImages
);
router.get('/:id', ProductController.getaProduct);
router.get('/', ProductController.getAllProducts);
router.put('/wishlist', AuthMiddlewares.authMiddleware, ProductController.addToWishlist);
router.put('/rating', AuthMiddlewares.authMiddleware, ProductController.rating);
router.put('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;