'use client'

import { SquaresExclude } from "lucide-react"
import Button from "./theme/Button"
import { signOut } from "next-auth/react"

export default function NavBar() {
  return (
    <nav className="flex justify-between px-3">
      <div className="flex items-center gap-2 flex-1">
        <SquaresExclude className="dark:bg-primary/60 w-10 h-10 p-1 rounded-lg text-primary" />
        <h1 className="font-bold uppercase text-3xl">INVENTAPP</h1>
      </div>
      <div className="flex items-center gap-2 flex-1">
      </div>

      <ul className="flex flex-1 items-center gap-2 justify-between">

        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <Button onClick={async () => {
            await signOut()
          }}>Cerrar sesión</Button>
        </li>

      </ul>
    </nav>
  )
}