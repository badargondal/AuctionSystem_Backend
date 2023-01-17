const joi = require('joi');

const registerVendorValidation = joi.object({
    name: joi.string().required().max(75),
    email: joi.string().required(),
    password: joi.required(),
    re_password: joi.string()
});

const loginVendorValidation = joi.object({
    name: joi.string().max(75),
    email: joi.string().required(),
    password: joi.string().required(),
});

exports.registerVendorValidation = registerVendorValidation;
exports.loginVendorValidation = loginVendorValidation;


