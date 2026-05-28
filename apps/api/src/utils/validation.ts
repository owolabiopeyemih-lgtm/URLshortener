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
