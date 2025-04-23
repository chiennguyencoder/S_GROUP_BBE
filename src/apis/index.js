import express from 'express'
import userRoute from './users/user.route.js'
import authRouter from './auth/auth.route.js'

const router = express.Router()

router.use('/users', userRoute)
router.use('/auth', authRouter)

export default router