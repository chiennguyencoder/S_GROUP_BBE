import express from 'express'
import PollController from './poll.controller.js'
import VerifyMiddleware from '../../middleware/verify.middleware.js'
import validateMiddleware from '../../middleware/validate.middleware.js'

const PollRoute = express.Router()

PollRoute.route("/")
    .post(VerifyMiddleware.checkAuth, validateMiddleware.validateCreatePoll, PollController.createPoll)
    .get(PollController.getAll)

PollRoute.route('/:id')
    .get(PollController.getOne)
    .delete(PollController.delete)
    .put(PollController.update)

PollRoute.route('/:id/vote')
    .post(
        VerifyMiddleware.checkAuth, 
        validateMiddleware.validateCheckID, 
        PollController.vote
    )

PollRoute.route('/:id/unvote')
    .post(
        VerifyMiddleware.checkAuth, 
        validateMiddleware.validateCheckID, 
        PollController.unvote
    )

PollRoute.route('/:id/lock')
    .post(
        VerifyMiddleware.checkAuth,
        PollController.lock
    )

PollRoute.route('/:id/unlock')
    .post(
        VerifyMiddleware.checkAuth,
        PollController.unlock
    )
export default PollRoute