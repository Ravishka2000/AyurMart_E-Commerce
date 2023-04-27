import express from "express";
import Cart from "../controllers/Cart.js";
import axios from "axios";

const router = express.Router();

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header not present');
        }
        const token = req.headers.authorization.split(' ')[1];
        const response = await axios.post('http://userauth:7002/api/user/verify', {
            token: token
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        req.user = response.data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Unauthorized' });
    }
};

router.post('/cart', verifyToken, Cart.userCart);
router.post('/cart/applycoupon', verifyToken, Cart.applyCoupon);
router.put('/cart/:productId', verifyToken, Cart.removeFromCart);
router.get('/cart', verifyToken, Cart.getUserCart);
router.delete('/empty-cart', verifyToken, Cart.emptyCart);

export default router;