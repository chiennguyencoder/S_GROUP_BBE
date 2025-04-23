
import Joi from 'joi'
import "../apis/users/user.model.js"
import { getDatabase } from "../config/db.config.js";


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

const validateMiddleware = {
    validateUser : async (req, res, next) => {
        try {
            const {error} = schemaUser.validate(req.body)
            if (error){
                throw new Error(error.details[0].message)
            }

            // Check duplication email
            const { email } = req.body;
            const existingUser = await getDatabase().collection('users').findOne({email})
            if (existingUser) {
                throw new Error("Email is already in use");
            }
            next();
        }
        catch(error){
            error.statusCode = 500
            error.message = error.message || "Internal server error"
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
            error.statusCode = 500
            error.message = error.message || "Internal server error"
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
    }
}

export default validateMiddleware
