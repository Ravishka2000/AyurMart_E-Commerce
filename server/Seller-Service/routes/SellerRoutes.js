import express from "express";
import requireAuth from '../middlewares/requireAuth.js'
import SellerController from '../controllers/SellerController.js';

const router = express.Router();

router.post('/login', SellerController.loginSeller)
router.post('/signup', SellerController.signupSeller)
router.get('/:id', SellerController.getaProduct);
router.post('/', SellerController.createProdcut);
router.get('/', SellerController.getAllProducts);

export default router;