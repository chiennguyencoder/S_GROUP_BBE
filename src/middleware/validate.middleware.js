
import Joi from 'joi'


const schemaUser = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    age : Joi.number().integer().min(0).max(120),
    email : Joi.string().email().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone : Joi.string().min(10).max(12),
    address : Joi.string()
})

const schemaLogin = Joi.object({
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email : Joi.string().email().required()
})

const schemaEmail = Joi.object({
    email : Joi.string().email().required()
})

const schemaResetPassword = Joi.object({
    resetEmail : Joi.string().email().required(),
    resetNewPassword : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    resetOTP : Joi.number().min(1000).max(9999).required()
})

const schemaPolls = Joi.object({
    question : Joi.string().required(),
    description : Joi.string(),
    options : Joi.array().items(Joi.object().required()).required(),
    endTime : Joi.date()
})

const validateMiddleware = {
    validateUser : async (req, res, next) => {
        try {
            const {error} = schemaUser.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }
            next();
        }
        catch(error){
            next(error)
        }
    },
    validateId : async(req, res, next) => {
        try {
            const {error} = schemaId.validate({...req.params})
            if (error){
                throw new Error(error.details[0].message)
            }
            next()
        }
        catch(error){
            next(error)
        }
    },
    validateLogin : async(req, res, next) => {
        try {
            const {error} = schemaLogin.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }
            next()
        }
        catch(err){
            next(err)
        }
    },
    validateEmail : async(req, res, next) => {
        try {
            const {error} = schemaEmail.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }
            next()
        }
        catch(err){
            next(err)
        }
    },
    schemaResetPassword : async(req, res, next) => {
        try {
            const {error} = schemaResetPassword.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }
            next()
        }
        catch(err){
            next(err)
        }
    },

    validateCreatePoll : async(req, res, next) => {
        try {
            const {error} = schemaPolls.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }
            next()
        }
        catch(err){
            next(err)
        }
    }
}

export default validateMiddleware
