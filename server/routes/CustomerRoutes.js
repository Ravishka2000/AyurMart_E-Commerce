import express from 'express';
import CustomerController from '../controllers/CustomerController.js';

const router = express.Router();

router.get('/', CustomerController.getAllProucts);

export default router;