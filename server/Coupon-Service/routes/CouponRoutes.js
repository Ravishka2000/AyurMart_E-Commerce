import express from "express";
import CouponController from "../controllers/CouponController.js";
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

router.post('/', CouponController.createCoupon);
router.get('/', CouponController.getAllCoupons);
router.get('/:id', verifyToken, CouponController.getACoupon);
router.put('/:id', verifyToken, CouponController.updateCoupon);
router.delete('/:id', CouponController.deleteCoupon);

export default router;