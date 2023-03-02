import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { spotifyStrategy } from '~/services/auth.server'
import invariant from 'tiny-invariant'

export async function loader({ request }: LoaderArgs) {
  // Handles refresh token rotation
  const session = await spotifyStrategy.getSession(request, {
    failureRedirect: '/login',
  })

  invariant(session.user, 'user not found on session')

  return json({ now: Date.now(), user: session.user })
}

export default function Discover() {
  const { now, user } = useLoaderData<typeof loader>()

  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
      <h1 className="text-4xl font-bold text-gray-800">discover</h1>
      <pre>{now}</pre>
      <h3>{user.id}</h3>
    </main>
  )
}
