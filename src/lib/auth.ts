import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import { ZodError } from "zod"
import CONSTANTS from "@/config/CONSTANTS"


class ServerError extends CredentialsSignin {
  code = "SERVER_ERROR"
  errorMessage = "Error al conectar con el servidor"
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions)
    this.errorMessage = message
  }
}
class UserNotFound extends CredentialsSignin {
  code = "USER_NOT_FOUND"
  errorMessage = "Usuario no encontrado"
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions)
    this.errorMessage = message
  }
}

class InvalidCredentials extends CredentialsSignin {
  code = "INVALID_CREDENTIALS"
  errorMessage = "Credenciales inválidas"
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions)
    this.errorMessage = message
  }
}

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      user_type: "WORKER" | "CLIENT" | "SUPERADMIN";
      client: any | null
      business: any | null
    }
  }

  interface User {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      user_type: "WORKER" | "CLIENT" | "SUPERADMIN";
      client: any | null
      business: any | null
    }
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      authorize: async (credentials) => {
        try {
          let user = null

          console.log(credentials)


          const { username, password } = await signInSchema.parseAsync(credentials)

          const response = await fetch(`${CONSTANTS.API_URL}/api/v1/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          })

          const data = await response.json()

          if (response.status === 404) {
            throw new UserNotFound("Usuario no encontrado.")
          }

          if (response.status === 401) {
            throw new InvalidCredentials("Contraseña incorrecta.")
          }

          console.log(data)

          user = data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error("Datos inválidos. Revisa tus credenciales.");
          }
          console.log(error)
          throw error
        }

      },
    })
  ],
  pages: {
    error: "/auth/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.token = token.token as string
      session.user = token.user as any
      return session
    },
  }
})