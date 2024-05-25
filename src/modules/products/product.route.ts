import { productController } from "./product.controller";
import express from 'express';
const router = express.Router()

router.post('/products', productController.createProduct); 
router.get('/products', productController.getProducts); 
router.get('/products/:productId', productController.getProduct); 
router.put('/products/:productId', productController.putProduct); 
router.delete('/products/:productId', productController.deleteProduct); 
router.get('/products', productController.searchProduct); 

export const ProductRoutes = router;