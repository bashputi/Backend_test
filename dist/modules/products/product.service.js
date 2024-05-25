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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProduct = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payLoad);
    return result;
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
const putProduct = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.updateOne({ _id: id }, { $set: updateData });
    const updatedProduct = yield product_model_1.Product.findOne({ _id: id });
    return updatedProduct;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.deleteOne({ _id: id });
    return deletedProduct;
});
const searchProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTermRegex = new RegExp(searchTerm, 'i');
    const products = yield product_model_1.Product.aggregate([
        {
            $match: {
                name: { $regex: searchTermRegex }
            }
        }
    ]);
    return products;
});
exports.productService = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct,
    searchProduct
};
