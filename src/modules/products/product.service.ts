import {TProduct} from "./product.interface";
import {Product} from "./product.model";

const createProduct = async(payLoad: TProduct) => {
    const result = await Product.create(payLoad);
    return result;
};

const getProducts = async() => {
    const result = await Product.find();
    return result;
};

const getProduct = async(id: string) => {
    const result = await Product.findOne({_id : id});
    return result;
};

const putProduct = async(id: string,  updateData: object) => {
    await Product.updateOne({_id : id}, {$set: updateData});
    const updatedProduct = await Product.findOne({ _id: id });
    return updatedProduct;
};


export const productService = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
};