const Joi = require('joi');
const response = require('../../helpers/Responsehelper'); //Response helpers

// add joi schema
const schemas = {
    validateusersignup: Joi.object().keys({
        email: Joi.string().required(),
        phone: Joi.string().required(),
        Name: Joi.string().required(),
        Address: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    }),
    validateusersignin: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
};

const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

//signup
module.exports.validateusersignup = (req, res, next) => {
    let schema = schemas.validateusersignup;
    let option = options.basic;
    const data = schema.validate({
        ...req.body       
    }, option)

    if (data.error) {
        return response.joierrors(req, res, data.error);
    }
    next()
};

//signin
module.exports.validateusersignin = (req, res, next) => {
    let schema = schemas.validateusersignin;
    let option = options.basic;
    const data = schema.validate({
        ...req.body       
    }, option)

    if (data.error) {
        return response.joierrors(req, res, data.error);
    }
    next()
};