"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
exports.registerValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .min(3)
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});
exports.loginValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .min(6)
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});
exports.refreshPasswordValidationSchema = Joi.object({
    currentPassword: Joi.string()
        .min(6)
        .required(),
    newPassword: Joi.string()
        .min(6)
        .required()
});
exports.forgotPasswordValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .min(6)
        .required()
});
//# sourceMappingURL=auth-joi.validation.js.map