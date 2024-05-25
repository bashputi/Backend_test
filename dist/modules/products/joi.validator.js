"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const variantSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    value: joi_1.default.string().required()
});
const inventorySchema = joi_1.default.object({
    quantity: joi_1.default.number().integer().required(),
    inStock: joi_1.default.boolean().required()
});
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required(),
    variants: joi_1.default.array().items(variantSchema).required(),
    inventory: inventorySchema.required()
});
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.number(),
    category: joi_1.default.string(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    variants: joi_1.default.array().items(variantSchema),
    inventory: inventorySchema
}).min(1);
