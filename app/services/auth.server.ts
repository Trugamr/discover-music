import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { SpotifyStrategy } from 'remix-auth-spotify'
import { getEnv } from '~/utils/env.server'

const env = getEnv()

export const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    callbackURL: env.SPOTIFY_CALLBACK_URL,
    sessionStorage,
    scope: ['user-read-email'].join(' '),
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + extraParams.expiresIn * 1000,
      tokenType: extraParams.tokenType,
      user: {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        image: profile.__json.images?.[0]?.url,
      },
    }
  },
)

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: spotifyStrategy.sessionKey,
  sessionErrorKey: spotifyStrategy.sessionErrorKey,
})

authenticator.use(spotifyStrategy)
