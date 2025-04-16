
import Joi from 'joi'

const schemaUser = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age : Joi.number().integer().min(0).max(120).required(),
})
const schemaId = Joi.object({
    id : Joi.number().integer().min(1).required()
})

const validateMiddleware = {
    validateUser : async (req, res, next) => {
        try {
            const {error} = schemaUser.validate(req.body)
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
    }
}

export default validateMiddleware