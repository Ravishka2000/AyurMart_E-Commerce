import express from "express";
import ProductController from "../controllers/ProductController.js";
import requireAuth from '../middlewares/requireAuth.js'

// controller functions
import SellerController from '../controllers/SellerController.js';

const router = express.Router();

// login route
router.post('/login', SellerController.loginSeller)

// signup route
router.post('/signup', SellerController.signupSeller)

router.get('/:id', ProductController.getaProduct);
router.post('/', ProductController.createProduct);

// require authentication
router.use(requireAuth)
router.get('/', ProductController.getAllProducts);


export default router;