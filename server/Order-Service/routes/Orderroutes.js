import express from "express";
import orderController from "../controllers/orderController.js";
import axios from "axios";

const router = express.Router();

const verifyToken = async (req, res, next) => {
    try {
        console.log(req.headers);
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


router.get("/allorders", orderController.allOrders)
router.get('/get-orders', verifyToken, orderController.getOrders);
router.put('/update-order/:id', orderController.updateOrderStatus);
router.get('/cart/order', verifyToken, orderController.createOrder);

export default router;
