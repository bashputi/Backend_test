import { productController } from "./product.controller";
import express from 'express';
const router = express.Router()

router.post('/', productController.createProduct); 
router.get('/', productController.getProducts); 
router.get('/:productId', productController.getProduct); 
router.put('/:productId', productController.putProduct); 

export const ProductRoutes = router;