"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", product_route_1.ProductRoutes);
app.use("/api", order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello Wrold');
});
exports.default = app;
// route not found error 
app.use((req, res, next) => {
    res.json({
        success: false,
        message: "Route not found"
    });
});
// internal server error 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.json({
        success: false,
        message: "An internal server error occurred.",
        err: err.message
    });
});
