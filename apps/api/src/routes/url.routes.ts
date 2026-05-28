import { Router } from 'express'
import { createShortUrl, deleteUrl } from '../controllers/url.controller'
import { shortenLimiter } from '../middleware/rateLimit.middleware'

const router = Router()

router.post('/shorten', shortenLimiter, createShortUrl)
router.delete('/urls/:id', deleteUrl)

export { router as urlRoutes }
