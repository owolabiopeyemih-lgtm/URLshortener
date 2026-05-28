import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRoutes } from './routes/auth.routes'
import { urlRoutes } from './routes/url.routes'
import { analyticsRoutes } from './routes/analytics.routes'
import { redirectToUrl } from './controllers/url.controller'
import { generalLimiter } from './middleware/rateLimit.middleware'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)
app.use(morgan('combined'))
app.use(express.json())
app.use(generalLimiter)

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api', urlRoutes)
app.use('/api/analytics', analyticsRoutes)

// Short URL redirect — must be last
app.get('/:shortCode([a-zA-Z0-9]{4,10})', redirectToUrl)

// Only bind a port when running locally — Vercel handles listening in serverless
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[API] Server running on http://localhost:${PORT}`)
  })
}

export default app
