import { productController } from "./product.controller";
import express from 'express';
const router = express.Router()

router.post('/', productController.createProduct); 
router.get('/', productController.getProducts); 

export const ProductRoutes = router;