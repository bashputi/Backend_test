import {productService} from "./product.service";
import { Request, Response} from 'express';

const createProduct = async (req: Request, res: Response) => {
    const result = await productService.createProduct(req.body);
    res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
    });
};



export const productController = {
    createProduct,
    
}