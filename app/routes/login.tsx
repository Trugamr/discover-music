import { Form } from '@remix-run/react'

export default function Login() {
  return (
    <main>
      <Form method="post" action="/auth/spotify">
        <button>Spotify Login</button>
      </Form>
    </main>
  )
}
