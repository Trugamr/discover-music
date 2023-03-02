import { z } from 'zod'

const envSchema = z.object({
  COOKIE_SECRET: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  SPOTIFY_CALLBACK_URL: z.string().url(),
})

export function getEnv() {
  return envSchema.parse(process.env)
}
