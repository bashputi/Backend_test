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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const joi_validator_1 = require("./joi.validator");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // joi validation 
        const { error, value } = joi_validator_1.productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            res.json({
                success: false,
                message: "validation error",
                details: error.details.map((detail) => detail.message)
            });
        }
        // create product after validation 
        const result = yield product_service_1.productService.createProduct(value);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getProducts();
        if (result) {
            res.json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        else {
            res.json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getProduct(productId);
        if (result) {
            res.json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        else {
            res.json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const putProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        // joi validation 
        const { error, value } = joi_validator_1.updateProductSchema.validate(updateData, { abortEarly: false });
        if (error) {
            return res.json({
                success: false,
                message: "validation error",
                details: error.details.map((detail) => detail.message)
            });
        }
        // update product after validation 
        const updatedProduct = yield product_service_1.productService.putProduct(productId, value);
        if (updatedProduct) {
            res.json({
                success: true,
                message: "Product updated successfully!",
                data: updatedProduct,
            });
        }
        else {
            res.json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_service_1.productService.deleteProduct(productId);
        if (deletedProduct.deletedCount > 0) {
            res.json({
                success: true,
                message: "Product deleted successfully!",
                data: null,
            });
        }
        else {
            res.json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract the searchTerm 
        const { searchTerm } = req.query;
        if (!searchTerm) {
            res.json({
                success: false,
                message: 'search term required',
            });
        }
        // search product with searchTerm 
        const products = yield product_service_1.productService.searchProduct(searchTerm);
        // send response 
        if (products.length > 0) {
            res.json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: products,
            });
        }
        else {
            res.json({
                success: false,
                message: "Product not found!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct,
    searchProduct
};
