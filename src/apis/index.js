import express from 'express'
import route from './users/user.route.js'

const router = express.Router()

router.use('/users', route)

export default router