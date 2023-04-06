import express from "express";
import AuthMiddlewares from "../middlewares/authMiddleware.js";
import BrandController from "../controllers/BrandController.js";

const router = express.Router();

router.post('/', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, BrandController.createBrand);
router.put('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, BrandController.updateBrand);
router.delete('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, BrandController.deleteBrand);
router.get('/', AuthMiddlewares.authMiddleware, BrandController.getAllBrand);
router.get('/:id', AuthMiddlewares.authMiddleware, BrandController.getABrand);

export default router;