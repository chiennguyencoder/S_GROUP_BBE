import UserController  from "./user.controller.js";
import express from 'express'

const route = express.Router()

route.route('/')
    .get(UserController.getAll)
    .post(UserController.createUser)

route.route('/:id')
    .get(UserController.getDetail)
    .delete(UserController.deleteUser)
    .put(UserController.updateUser)

export default route