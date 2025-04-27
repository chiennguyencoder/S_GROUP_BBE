import express from 'express'
import AutherController from './auth.controller.js'
import validateMiddleware from '../../middleware/validate.middleware.js'
import VerifyMiddleware from '../../middleware/verify.middleware.js'

const authRouter = express.Router()


authRouter.route("/register")
    .post(  
        validateMiddleware.validateUser, 
        AutherController.register
    )
authRouter.route("/login")
    .post(
        validateMiddleware.validateLogin,
        AutherController.login
    )

authRouter.route("/profile")
    .get(
        VerifyMiddleware.checkAuth,
        AutherController.getProfile
    )

export default authRouter