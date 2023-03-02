import { createCookieSessionStorage } from '@remix-run/node'
import { getEnv } from '~/utils/env.server'

const { COOKIE_SECRET } = getEnv()

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [COOKIE_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
