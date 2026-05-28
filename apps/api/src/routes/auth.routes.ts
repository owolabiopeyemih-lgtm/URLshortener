import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { authLimiter } from '../middleware/rateLimit.middleware'

const router = Router()

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)

export { router as authRoutes }
