import express from "express";
import ProductController from "../controllers/ProductController.js";
import SellerController from "../controllers/SellerController.js"

const router = express.Router();

router.get('/:id', ProductController.getaProduct);
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);



//login route
router.post('/login', SellerController.loginSeller)

//signup route
router.post('/signup', SellerController.signupSeller)

export default router;