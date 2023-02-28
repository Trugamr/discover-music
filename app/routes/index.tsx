import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export function loader() {
  return json({ now: Date.now() })
}

export default function Index() {
  const { now } = useLoaderData<typeof loader>()

  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-green-500">
      <h1 className="text-4xl font-bold text-gray-800">discover</h1>
      <h2>{now}</h2>
    </main>
  )
}
