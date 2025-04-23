import validateMiddleware from '../../middleware/validate.middleware.js'

import UserController from './user.controller.js'
import express from 'express'

const userRoute = express.Router()

userRoute.route('/')
    .get(UserController.getAllUsers)
    .post(validateMiddleware.validateUser ,UserController.postUser)

userRoute.route('/:id')
    .get(UserController.getUser)
    .put(validateMiddleware.validateUser ,UserController.updateUser)
    .delete(UserController.deleteUser)
export default userRoute