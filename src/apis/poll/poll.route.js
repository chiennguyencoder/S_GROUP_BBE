import express from 'express'
import PollController from './poll.controller.js'
import VerifyMiddleware from '../../middleware/verify.middleware.js'

const PollRoute = express.Router()

PollRoute.route("/")
    .post(VerifyMiddleware.checkAuth, PollController.createPoll) // request : {title, option : [...]}
    .get(PollController.getAll)

export default PollRoute