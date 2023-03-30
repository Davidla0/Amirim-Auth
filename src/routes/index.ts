import express from 'express'
import auth from './auth.router'
import user from './user.router'

const router = express.Router()

router.use(auth)
router.use(user)

export default router
