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


export const productService = {
    createProduct,
    getProducts,
};