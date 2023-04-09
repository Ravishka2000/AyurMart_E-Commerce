import express from "express";
import UserControllers from "../controllers/UserController.js";
import AuthMiddlewares from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.put('/password', AuthMiddlewares.authMiddleware, UserControllers.updatePassword);
router.post('/forgot-password-token', UserControllers.forgotPasswordToken);
router.put('/reset-password/:token', UserControllers.resetPassword);
router.put('/order/update-order/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, UserControllers.updateOrderStatus);
router.post('/login', UserControllers.loginUser);
router.post('/admin-login', UserControllers.loginAdmin);
router.post('/cart', AuthMiddlewares.authMiddleware, UserControllers.userCart);
router.post('/cart/applycoupon', AuthMiddlewares.authMiddleware, UserControllers.applyCoupon);
router.post('/cart/cash-order', AuthMiddlewares.authMiddleware, UserControllers.createOrder);
router.get('/all-users', UserControllers.getAllUsers);
router.get('/get-orders', AuthMiddlewares.authMiddleware, UserControllers.getOrders);
router.get('/refresh', UserControllers.handleRefreshToken);
router.get('/logout', UserControllers.logout);
router.get('/wishlist', AuthMiddlewares.authMiddleware, UserControllers.getWishlist);
router.get('/cart', AuthMiddlewares.authMiddleware, UserControllers.getUserCart);
router.get('/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, UserControllers.getUser);
router.delete('/empty-cart', AuthMiddlewares.authMiddleware, UserControllers.emptyCart);
router.put('/cart/:productId', AuthMiddlewares.authMiddleware, UserControllers.removeFromCart);
router.delete('/:id', UserControllers.deleteUser);
router.put('/update-user', AuthMiddlewares.authMiddleware, UserControllers.updateUser);
router.put('/save-address', AuthMiddlewares.authMiddleware, UserControllers.saveAddress);
router.put('/block-user/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, UserControllers.blockUser);
router.put('/unblock-user/:id', AuthMiddlewares.authMiddleware, AuthMiddlewares.isAdmin, UserControllers.unBlockUser);

export default router;