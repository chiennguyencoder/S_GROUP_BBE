import express from 'express'
import PollController from './poll.controller.js'
import VerifyMiddleware from '../../middleware/verify.middleware.js'
import validateMiddleware from '../../middleware/validate.middleware.js'

const PollRoute = express.Router()

PollRoute.route("/")
    .post(VerifyMiddleware.checkAuth, validateMiddleware.validateCreatePoll, PollController.createPoll) // request : {title, option : [...]}
    .get(PollController.getAll)

PollRoute.route('/:id')
    .get(PollController.getOne)
    .delete(PollController.delete)
    .put(PollController.update)
    .post(VerifyMiddleware.checkAuth, PollController.vote)
export default PollRoute