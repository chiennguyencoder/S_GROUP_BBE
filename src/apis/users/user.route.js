import UserController  from "./user.controller.js";
import express from 'express'

const route = express.Router()

route.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.postUser)

route.route('/:id')
    .put(UserController.updateUser)
    .get(UserController.getDetailUser)
    .delete(UserController.deleteUser)
export default route