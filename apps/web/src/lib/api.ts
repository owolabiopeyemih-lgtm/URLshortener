import axios from 'axios'

const api = axios.create({ baseURL: '' })

export interface ShortUrl {
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  clicks: number
  createdAt: string
}

export interface AnalyticsData {
  url: ShortUrl
  totalClicks: number
  byDevice: Record<string, number>
  byCountry: Record<string, number>
  byReferrer: Record<string, number>
  byDate: Record<string, number>
}

export const shortenUrl = async (originalUrl: string, customAlias?: string) => {
  const { data } = await api.post<{ url: ShortUrl }>('/api/shorten', {
    originalUrl,
    customAlias: customAlias || undefined,
  })
  return data.url
}

export const deleteUrl = async (id: string) => {
  await api.delete(`/api/urls/${id}`)
}

export const getAnalytics = async (id: string): Promise<AnalyticsData> => {
  const { data } = await api.get<AnalyticsData>(`/api/analytics/${id}`)
  return data
}
