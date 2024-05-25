import {TProduct} from "./product.interface";
import {Product} from "./product.model";

const createProduct = async(payLoad: TProduct) => {
    const result = await Product.create(payLoad);
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

const deleteProduct = async(id: string) => {
    const deletedProduct = await Product.deleteOne({_id : id});
    return deletedProduct;
};

const getProducts = async() => {
    const result = await Product.find();
    return result;
};

const searchProduct = async ( searchTerm: string) => {
    const searchTermRegex = new RegExp(searchTerm, 'i');
    const products = await Product.aggregate([
       {
        $match: {
            name: { $regex: searchTermRegex }
        }
       }
    ]);
    return products;
};


export const productService = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct,
    searchProduct
};