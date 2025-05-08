import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import { ZodError } from "zod"
import CONSTANTS from "@/config/CONSTANTS"


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

          user = data

          console.log(user)

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            console.log(error.issues)
            return null
          }
          console.log(error)
          return null
        }
      },

    })
  ],
  pages: {
    signIn: "/auth/login"
  }
})