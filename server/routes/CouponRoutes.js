import express from "express";
import AuthMiddlewares from "../middlewares/authMiddleware.js";
import CouponController from "../controllers/CouponController.js";

const router = express.Router();

router.post('/', CouponController.createCoupon);
router.get('/',  CouponController.getAllCoupons);
router.get('/:id', AuthMiddlewares.authMiddleware, CouponController.getACoupon);
router.put('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, CouponController.updateCoupon);
router.delete('/:id', CouponController.deleteCoupon);

export default router;