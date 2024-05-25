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
    if (result) {
        res.json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }else{
        res.json({
            success: false,
            message: "Product not found!",
        });
    }
};

const getProduct = async (req: Request, res: Response) => {
   const { productId } = req.params;
    const result = await productService.getProduct(productId);
if (result) {
    res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
}else{
    res.json({
        success: false,
        message: "Product not found!",
    });
}
};

const putProduct = async (req: Request, res: Response) => {
   const { productId } = req.params;
   const updateData = req.body;
    const updatedProduct = await productService.putProduct(productId, updateData);
if (updatedProduct) {
    res.json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
    });
}else {
    res.json({
        success: false,
        message: "Product not found!",
    });
}
  
};

const deleteProduct = async (req: Request, res: Response) => {
   const { productId } = req.params;
    const deletedProduct = await productService.deleteProduct(productId);
   if (deletedProduct.deletedCount > 0) {
    res.json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
    });
   }else {
    res.json({
        success: false,
        message: "Product not found!",
    });
   }
  
};



export const productController = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct,
}