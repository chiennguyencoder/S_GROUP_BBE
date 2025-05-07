import express from 'express'
import AutherController from './auth.controller.js'
import validateMiddleware from '../../middleware/validate.middleware.js'
import VerifyMiddleware from '../../middleware/verify.middleware.js'

const AutherRouter = express.Router()

AutherRouter.route("/register")
    .post(  
        validateMiddleware.validateUser, 
        AutherController.register
    )
AutherRouter.route("/login")
    .post(
        validateMiddleware.validateLogin,
        AutherController.login
    )

AutherRouter.route("/profile")
    .get(
        VerifyMiddleware.checkAuth,
        AutherController.getProfile
    )

AutherRouter.route("/forgot")
    .post(
        validateMiddleware.validateEmail,
        AutherController.forgotPassword
    )

AutherRouter.route("/reset")
    .post(
        validateMiddleware.schemaResetPassword,
        AutherController.resetPassword
    )

export default AutherRouter