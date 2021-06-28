"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
exports.ProductValidationSchema = Joi.object({
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
        .min(3)
        .required()
});
//# sourceMappingURL=product-joi.validation.js.map