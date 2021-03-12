import * as Joi from '@hapi/joi';

export const ProductValidationSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .required(),
    price: Joi.number()
        .min(1)
        .required(),
    category: Joi.string()
        .min(3)
        .required(),
    imageUrl: Joi.string()
        .min(6)
        .required()
        // ,imagesUrls: Joi.array()
        // .items( Joi.string().min(10))
        // .required()
});
