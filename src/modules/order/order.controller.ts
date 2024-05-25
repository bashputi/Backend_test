import {orderService} from "./order.service";
import { NextFunction, Request, Response} from 'express';
import {Product} from "../products/product.model";
import orderSchema from "./jai.validator";


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        // joy validation 
        const { error, value } = orderSchema.validate(req.body, { abortEarly: false });
        if(error) {
            res.json({
                success: false,
                message: "validation error",
                details: error.details.map((detail: { message: any; }) => detail.message)
            });
        }
        const { email, productId, quantity, price } = value;

        // find product by productId
        const product = await Product.findById(productId);
        if (!product) {
            return res.json({
                success: false,
                message: "Product not found!",
            });
        }
        // check available quantity in inventory
        if (product.inventory.quantity < quantity) {
            return res.json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        // calculate new quantity 
        const newQuantity = product.inventory.quantity - quantity;
        const inStock = newQuantity > 0;

        // update product quantity 
        await Product.findByIdAndUpdate(productId, {
            "inventory.quantity": newQuantity,
            "inventory.inStock": inStock,
        });
       
        // create the order 
        const result = await orderService.createOrder({
            email, productId, price, quantity
        })
        // send response 
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
        
    } catch (error) {
       next(error)
    }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const result = await orderService.getOrders();
    if (result) {
        res.json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }else{
        res.json({
            success: false,
            message: "Order not found!",
        });
    }
   } catch (error) {
    next(error)
   }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    const result = await orderService.getOrder(email as string);
if (result) {
    res.json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
    });
}else{
    res.json({
        success: false,
        message: "Order not found!",
    });
}
  } catch (error) {
    next(error)
  }
};


export const orderController = {
    createOrder,
    getOrders,
    getOrder,
};