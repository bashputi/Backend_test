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

const getProducts = async (req: Request, res: Response) => {
    const result = await productService.getProducts();
    res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
};

const getProduct = async (req: Request, res: Response) => {
   const { productId } = req.params;
    const result = await productService.getProduct(productId);
    res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
};

const putProduct = async (req: Request, res: Response) => {
   const { productId } = req.params;
   const updateData = req.body;
    const updatedProduct = await productService.putProduct(productId, updateData);
    res.json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
    });
  
};



export const productController = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
}