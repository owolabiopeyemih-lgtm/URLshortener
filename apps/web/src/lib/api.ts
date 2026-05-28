import axios from 'axios'

const api = axios.create({ baseURL: '' })

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('snapurl_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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

export const getUserUrls = async () => {
  const { data } = await api.get<{ urls: ShortUrl[] }>('/api/urls')
  return data.urls
}

export const deleteUrl = async (id: string) => {
  await api.delete(`/api/urls/${id}`)
}

export const getAnalytics = async (id: string): Promise<AnalyticsData> => {
  const { data } = await api.get<AnalyticsData>(`/api/analytics/${id}`)
  return data
}

export const login = async (email: string, password: string) => {
  const { data } = await api.post<{ user: { id: string; email: string }; token: string }>(
    '/api/auth/login',
    { email, password }
  )
  return data
}

export const register = async (email: string, password: string) => {
  const { data } = await api.post<{ user: { id: string; email: string }; token: string }>(
    '/api/auth/register',
    { email, password }
  )
  return data
}
