import { Router } from 'express'
import { createShortUrl, deleteUrl, getUserUrls } from '../controllers/url.controller'
import { requireAuth, optionalAuth } from '../middleware/auth.middleware'
import { shortenLimiter } from '../middleware/rateLimit.middleware'

const router = Router()

// POST /api/shorten — public with optional auth
router.post('/shorten', optionalAuth, shortenLimiter, createShortUrl)

// GET /api/urls — authenticated users only
router.get('/urls', requireAuth, getUserUrls)

// DELETE /api/urls/:id — authenticated users only
router.delete('/urls/:id', requireAuth, deleteUrl)

export { router as urlRoutes }
