"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const orderSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    productId: joi_1.default.string().required().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required'
    }),
    price: joi_1.default.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    quantity: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.positive': 'Quantity must be a positive number',
        'any.required': 'Quantity is required'
    })
});
exports.default = orderSchema;
