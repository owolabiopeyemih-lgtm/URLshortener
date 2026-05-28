import { Response } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth.middleware'

export async function getAnalytics(req: AuthRequest, res: Response) {
  const { id } = req.params

  const url = await prisma.url.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      clicks: true,
      shortCode: true,
      originalUrl: true,
      createdAt: true,
    },
  })

  if (!url) {
    return res.status(404).json({ error: 'Link not found' })
  }
  if (url.userId !== req.userId) {
    return res.status(403).json({ error: 'You do not own this link' })
  }

  const analytics = await prisma.clickAnalytic.findMany({
    where: { urlId: id },
    orderBy: { timestamp: 'desc' },
    take: 1000,
    select: { device: true, country: true, referrer: true, timestamp: true },
  })

  const byDevice = aggregate(analytics, 'device')
  const byCountry = aggregate(analytics, 'country')

  const byReferrer = analytics.reduce<Record<string, number>>((acc, c) => {
    const key = c.referrer || 'Direct'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const byDate = analytics
    .filter((c) => c.timestamp >= thirtyDaysAgo)
    .reduce<Record<string, number>>((acc, c) => {
      const date = c.timestamp.toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

  return res.json({
    url,
    totalClicks: url.clicks,
    byDevice,
    byCountry,
    byReferrer,
    byDate,
  })
}

function aggregate(
  rows: Array<Record<string, unknown>>,
  field: string
): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, row) => {
    const key = (row[field] as string) || 'Unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
}
