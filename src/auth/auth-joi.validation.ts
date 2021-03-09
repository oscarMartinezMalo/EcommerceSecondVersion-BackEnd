import * as Joi from '@hapi/joi';

// Register Validation
export const registerValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .min(3)
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});

// Login Validation
export const loginValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .min(6)
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});

// Reset Password Validation
export const refreshPasswordValidationSchema = Joi.object({
    currentPassword: Joi.string()
        .min(6)
        .required(),
    newPassword: Joi.string()
        .min(6)
        .required()
});

// Forgot Password Validation
export const forgotPasswordValidationSchema = Joi.object({
    email:  Joi.string()
    .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    .min(6)
    .required()
});