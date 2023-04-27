import express from "express";
import UserControllers from "../controllers/UserControllers.js";
import AuthMiddlewares from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.put('/password', AuthMiddlewares.authMiddleware, UserControllers.updatePassword);
router.post('/forgot-password-token', UserControllers.forgotPasswordToken);
router.put('/reset-password/:token', UserControllers.resetPassword);
router.post('/login', UserControllers.loginUser);
router.post('/admin-login', UserControllers.loginAdmin);
router.get('/all-users', UserControllers.getAllUsers);
router.get('/refresh', UserControllers.handleRefreshToken);
router.get('/logout', UserControllers.logout);
router.get('/wishlist', AuthMiddlewares.authMiddleware, UserControllers.getWishlist);
router.get('/:id', UserControllers.getUser);
router.delete('/:id', UserControllers.deleteUser);
router.put('/update-user', AuthMiddlewares.authMiddleware, UserControllers.updateUser);
router.put('/save-address', AuthMiddlewares.authMiddleware, UserControllers.saveAddress);
router.put('/block-user/:id', UserControllers.blockUser);
router.put('/unblock-user/:id', UserControllers.unBlockUser);
router.post("/verify",AuthMiddlewares.authMiddleware,UserControllers.verifyToken)

export default router;