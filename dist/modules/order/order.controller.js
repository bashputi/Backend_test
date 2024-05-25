"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../products/product.model");
const jai_validator_1 = __importDefault(require("./jai.validator"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // joy validation 
        const { error, value } = jai_validator_1.default.validate(req.body, { abortEarly: false });
        if (error) {
            res.json({
                success: false,
                message: "validation error",
                details: error.details.map((detail) => detail.message)
            });
        }
        const { email, productId, quantity, price } = value;
        // find product by productId
        const product = yield product_model_1.Product.findById(productId);
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
        yield product_model_1.Product.findByIdAndUpdate(productId, {
            "inventory.quantity": newQuantity,
            "inventory.inStock": inStock,
        });
        // create the order 
        const result = yield order_service_1.orderService.createOrder({
            email, productId, price, quantity
        });
        // send response 
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getOrders();
        if (result) {
            res.json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        else {
            res.json({
                success: false,
                message: "Order not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query);
        const { email } = req.query;
        const result = yield order_service_1.orderService.getOrder(email);
        if (result) {
            res.json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            res.json({
                success: false,
                message: "Order not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    createOrder,
    getOrders,
    getOrder,
};
