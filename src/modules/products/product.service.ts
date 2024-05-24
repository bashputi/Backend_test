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
    console.log(id)
    const result = await Product.findOne({_id : id});
    console.log(result)
    return result;
};


export const productService = {
    createProduct,
    getProducts,
    getProduct,
};