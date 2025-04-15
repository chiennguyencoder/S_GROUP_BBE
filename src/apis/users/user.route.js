import UserController  from "./user.controller.js";
import validateMiddleware from "../../middleware/validate.middleware.js";
import express from 'express'

const route = express.Router()

route.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.postUser)

route.route('/:id')
    .put(UserController.updateUser)
    .get(validateMiddleware.validateID, UserController.getDetailUser)
    .delete(UserController.deleteUser)

export default route