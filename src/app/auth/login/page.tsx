'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"

type FormData = {
  username: string
  password: string
}

export default function LoginPage() {

  const [errors, setErrors] = useState<string>("")

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const router = useRouter()


  const onSubmit = async (data: FormData) => {
    console.log(data)
    const { username, password } = data

    try {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      console.log(response)
      if (!response?.error) {
        router.push("/admin")
      } else {
        setErrors("Credenciales incorrectas")
      }
      if (!response.ok) {
        throw new Error("Error al iniciar sesión")
      }
    } catch (error) {
      console.log(error)
    }
  }


  //LIMPIEZA DE ERRORES
  useEffect(() => {
    if (errors) {
      const errorTimeout = setTimeout(() => {
        setErrors("")
      }, 5000)
      return () => {
        clearTimeout(errorTimeout)
      }
    }
    return () => {
    }
  }, [errors])


  return (
    <main>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <header className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            alt="JepiCorp"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
            priority
            width={300}
            height={300}
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            Inicia sesión en tu cuenta
          </h2>
        </header>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="credentials-username" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                Nombre de usuario
                <input type="text" id="credentials-username"
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...form.register("username", { required: true })}
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="credentials-password" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input type="password" id="credentials-password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...form.register("password", { required: true })}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Iniciar sesión
              </button>
              {errors && <p className="text-red-500 text-center my-3">{errors}</p>}
            </div>
          </form>
        </div>
      </section>
      <ToastContainer position="bottom-right" />
    </main>
  )
}
