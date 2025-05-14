import { auth, signOut } from "@/lib/auth"

export default async function Page() {
  const serverSession = await auth()
  return (
    <div>
      <h1>{serverSession?.user.first_name}</h1>
      <form action={async () => {
        "use server"
        await signOut()
      }}>

        <button type="submit">Sign Out</button>

      </form>
    </div>
  )
}