import {orderService} from "./order.service";
import { Request, Response} from 'express';
import {Product} from "../products/product.model";

const createOrder = async (req: Request, res: Response) => {
    const { email, productId, quantity, price } = req.body;
    try {
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
                message: "Insufficient stock!",
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
        res.json({
            success: false,
            message: "Server site error",
        });
    }
};

const getOrders = async (req: Request, res: Response) => {
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
};

const getOrder = async (req: Request, res: Response) => {
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
};


export const orderController = {
    createOrder,
    getOrders,
    getOrder,
};