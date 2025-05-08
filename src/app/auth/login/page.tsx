'use client'
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const signinAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    await signIn("credentials", {
      username,
      password,
      redirect: true, // o false si quieres manejarlo tú
      callbackUrl: "/", // o a donde quieras redirigir tras login
    })
  }

  return (
    <section>
      <form action={signinAction}>
        <label htmlFor="credentials-username">
          Email
          <input type="text" id="credentials-username" name="username" />
        </label>
        <label htmlFor="credentials-password">
          Password
          <input type="password" id="credentials-password" name="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
    </section>
  )
}
