const Joi = require('joi');
const response = require('../../helpers/Responsehelper'); //Response helpers

// add joi schema
const schemas = {
    validatebankRequest: Joi.object().keys({
        bankName: Joi.string().required(),
        bankIFSCode: Joi.string().required(),
        branchName: Joi.string().required(),
        bankAddress: Joi.string().required()
    }),
    validatebankRegister: Joi.object().keys({
        bankid:Joi.number().integer().required(),
        depositeAmount: Joi.string().required()
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

// validatebankRequest
module.exports.validatebankRequest = (req, res, next) => {
    let schema = schemas.validatebankRequest;
    let option = options.basic;
    const data = schema.validate({
        ...req.body       
    }, option)

    if (data.error) {
        return response.joierrors(req, res, data.error);
    }
    next()
};

module.exports.validatebankRegister = (req, res, next) => {
    let schema = schemas.validatebankRegister;
    let option = options.basic;
    const data = schema.validate({
        ...req.body       
    }, option)

    if (data.error) {
        return response.joierrors(req, res, data.error);
    }
    next()
};