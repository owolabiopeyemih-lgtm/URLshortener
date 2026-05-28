import { Request, Response, NextFunction } from 'express'
import geoip from 'geoip-lite'
import { prisma } from '../config/database'
import { cache } from '../config/redis'
import { generateShortCode } from '../utils/shortCode'
import { createUrlSchema } from '../utils/validation'
import { parseDevice } from '../utils/deviceParser'

const RESERVED_CODES = new Set(['api', 'health', 'favicon.ico', 'robots.txt', 'sitemap.xml'])
const CACHE_TTL = 3600

const SHORT_URL_BASE = process.env.SHORT_URL_BASE || 'http://localhost:3001'

export async function createShortUrl(req: Request, res: Response) {
  const parsed = createUrlSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message })
  }

  const { originalUrl, customAlias } = parsed.data

  if (customAlias) {
    if (RESERVED_CODES.has(customAlias)) {
      return res.status(400).json({ error: 'That alias is reserved' })
    }
    const taken = await prisma.url.findUnique({ where: { shortCode: customAlias } })
    if (taken) {
      return res.status(409).json({ error: 'Custom alias is already in use' })
    }
  }

  let shortCode = customAlias || generateShortCode()

  if (!customAlias) {
    let attempts = 0
    while (await prisma.url.findUnique({ where: { shortCode } })) {
      shortCode = generateShortCode()
      if (++attempts > 5) {
        return res.status(500).json({ error: 'Could not generate a unique code. Try again.' })
      }
    }
  }

  const url = await prisma.url.create({
    data: { originalUrl, shortCode },
    select: { id: true, originalUrl: true, shortCode: true, clicks: true, createdAt: true },
  })

  await cache.setex(`url:${shortCode}`, CACHE_TTL, originalUrl)

  return res.status(201).json({
    url: { ...url, shortUrl: `${SHORT_URL_BASE}/${shortCode}` },
  })
}

export async function redirectToUrl(req: Request, res: Response, next: NextFunction) {
  const { shortCode } = req.params

  if (RESERVED_CODES.has(shortCode)) {
    return next()
  }

  let originalUrl = await cache.get(`url:${shortCode}`)

  if (!originalUrl) {
    const url = await prisma.url.findUnique({ where: { shortCode } })
    if (!url) {
      return res.status(404).json({ error: 'Link not found or has been deleted' })
    }
    originalUrl = url.originalUrl
    await cache.setex(`url:${shortCode}`, CACHE_TTL, originalUrl)
  }

  trackClick(shortCode, req).catch(console.error)

  return res.redirect(301, originalUrl)
}

export async function deleteUrl(req: Request, res: Response) {
  const { id } = req.params

  const url = await prisma.url.findUnique({ where: { id } })
  if (!url) {
    return res.status(404).json({ error: 'Link not found' })
  }

  await prisma.url.delete({ where: { id } })
  await cache.del(`url:${url.shortCode}`)

  return res.json({ success: true })
}

async function trackClick(shortCode: string, req: Request) {
  const url = await prisma.url.findUnique({ where: { shortCode }, select: { id: true } })
  if (!url) return

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    ''

  const geo = geoip.lookup(ip)
  const country = geo?.country || 'Unknown'
  const device = parseDevice(req.headers['user-agent'] || '')
  const referrer = (req.headers.referer as string) || ''

  await Promise.all([
    prisma.url.update({ where: { id: url.id }, data: { clicks: { increment: 1 } } }),
    prisma.clickAnalytic.create({
      data: { urlId: url.id, country, device, referrer },
    }),
  ])
}
