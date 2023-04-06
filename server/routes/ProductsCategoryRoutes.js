import express from "express";
import AuthMiddlewares from "../middlewares/authMiddleware.js";
import CategoryController from "../controllers/ProductsCategoryController.js";

const router = express.Router();

router.post('/', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, CategoryController.createCategory);
router.put('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, CategoryController.updateCategory);
router.delete('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, CategoryController.deleteCategory);
router.get('/', AuthMiddlewares.authMiddleware, CategoryController.getAllCategory);
router.get('/:id', AuthMiddlewares.authMiddleware, CategoryController.getACategory);

export default router;