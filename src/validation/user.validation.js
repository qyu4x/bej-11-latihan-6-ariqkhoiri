const Joi = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    full_name: Joi.string().min(2).max(255).required(),
    gender: Joi.string().valid('MALE', 'FEMALE'),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(4).max(255).required(),
})

const loginUserSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(4).max(255).required(),
})

module.exports = {
    createUserSchema,
    loginUserSchema
}