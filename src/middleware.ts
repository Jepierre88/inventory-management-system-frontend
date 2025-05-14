import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 🔹 Si el usuario NO está autenticado e intenta acceder a /admin → Redirigir a login
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 🔹 Si el usuario YA está autenticado y visita /auth/login → Redirigir a /admin
  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Si la ruta es publica dejarlo continuar SOLO si esta autenticado
  // if (token && pathname.startsWith("/admin") && token.permissions?.some((permission: any) => permission.route === pathname && permission.isPublic === true)) {
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

// 🔹 Configuración: Se ejecuta en /admin/* y en /auth/login
export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
