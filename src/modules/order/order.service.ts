import {Order} from "./order.interface";
import {order} from "./order.model";

const createOrder = async(payLoad: Order) => {
    const result = await order.create(payLoad);
    return result;
};

const getOrders = async() => {
    const result = await order.find();
    return result;
};

const getOrder = async(email: string) => {
    const result = await order.findOne({ email});
    return result;
};




export const orderService = {
    createOrder,
    getOrders,
    getOrder,
};