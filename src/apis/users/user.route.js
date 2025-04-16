import validateMiddleware from '../../middleware/validate.middleware.js'

import UserController from './user.controller.js'
import express from 'express'

const route = express.Router()

route.route('/')
    .get(UserController.getAllUsers)
    .post(validateMiddleware.validateUser ,UserController.postUser)

route.route('/:id')
    .get(validateMiddleware.validateId,UserController.getUser)
    .put(validateMiddleware.validateId,validateMiddleware.validateUser ,UserController.updateUser)
    .delete(validateMiddleware.validateId,UserController.deleteUser)
export default route