import express from 'express';
import CustomerController from '../../controllers/CustomerControllers/CustomerController.js';

const router = express.Router();

router.get('/', CustomerController.getAllProucts);

export default router;