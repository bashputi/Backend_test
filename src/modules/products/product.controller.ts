import {productService} from "./product.service";
import { NextFunction, Request, Response} from 'express';
import{ productSchema, updateProductSchema } from "./joi.validator";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // joi validation 
        const { error, value } = productSchema.validate(req.body, { abortEarly: false });
        
        if(error) {
            return res.json({
                success: false,
                message: "validation error",
                details: error.details.map((detail: { message: any; }) => detail.message)
            });
        }

        // create product after validation 
        const result = await productService.createProduct(value);
        return res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    } catch (error: any) {
        next(error)
    } 
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
try {
    const { productId } = req.params;
    const result = await productService.getProduct(productId);
if (result) {
   return res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
}else{
    return res.json({
        success: false,
        message: "Product not found!",
    });
}
} catch (error) {
   next(error) 
}
};

const putProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // joi validation 
    const { error, value } = updateProductSchema.validate(updateData, { abortEarly: false });

    if (error) {
        return res.json({
            success: false,
            message: "validation error",
            details: error.details.map((detail: { message: any; }) => detail.message)
        });
    }

    // update product after validation 
     const updatedProduct = await productService.putProduct(productId, value);
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
  } catch (error) {
    next(error)
  }
  
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productService.deleteProduct(productId);
   if (deletedProduct.deletedCount > 0) {
    return res.json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
    });
   }else {
    return res.json({
        success: false,
        message: "Product not found!",
    });
   }
  } catch (error) {
    next(error)
  }
};

const searchProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract the searchTerm 
        const {searchTerm } = req.query;
        if (!searchTerm) {
            const result = await productService.getProducts();
            if (result) {
               return res.json({
                    success: true,
                    message: "Products fetched successfully!",
                    data: result,
                });
            }else{
                return res.json({
                    success: false,
                    message: "Product not found!",
                });
            }
        } 
        // search product with searchTerm 
        const products = await productService.searchProduct(searchTerm as string);
        // send response 
        if (products.length > 0) {
            return res.json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: products,
            });
        } else {
            return res.json({
                success: false,
                message: "Product not found!",
            });
        }
    } catch (error) {
        next(error)
    }

};

export const productController = {
    createProduct,
    getProduct,
    putProduct,
    deleteProduct,
    searchProduct
}