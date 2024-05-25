import { model, Schema } from "mongoose";
import { Order } from "./order.interface";


const orderSchema = new Schema<Order>({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    productId: {
        type: String,
        required: [true, 'Product ID is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    }
});

export const order = model<Order>('order', orderSchema);