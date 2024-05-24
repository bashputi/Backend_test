import { productController } from "./product.controller";
import express from 'express';
const router = express.Router()

router.post('/', productController.createProduct);

export const ProductRoutes = router;