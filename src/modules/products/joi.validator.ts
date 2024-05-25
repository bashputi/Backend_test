import Joi from "joi";

const variantSchema = Joi.object({
    type: Joi.string().required(),
    value: Joi.string().required()
});

const inventorySchema = Joi.object({
    quantity: Joi.number().integer().required(),
    inStock: Joi.boolean().required()
});

 export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array().items(variantSchema).required(),
    inventory: inventorySchema.required()
});

export const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(variantSchema),
    inventory: inventorySchema
}).min(1);

