import { z } from 'zod'

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url('Please provide a valid URL')
    .max(2048, 'URL is too long'),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{3,20}$/, 'Alias must be 3-20 characters (letters, numbers, _ or -)')
    .optional(),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})
