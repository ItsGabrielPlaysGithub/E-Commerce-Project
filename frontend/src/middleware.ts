import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type UserRole = "admin" | "partner" | "consumer"

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".")
  if (parts.length < 2) return null

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    return JSON.parse(atob(padded)) as Record<string, unknown>
  } catch {
    return null
  }
}

function getRoleFromRequest(request: NextRequest): UserRole | null {
  const token = request.cookies.get("access_token")?.value
  if (!token) return null

  const payload = decodeJwtPayload(token)
  const role = payload?.role

  if (typeof role !== "string") return null

  const normalizedRole = role.toLowerCase()
  if (normalizedRole === "admin" || normalizedRole === "partner" || normalizedRole === "consumer") {
    return normalizedRole
  }

  return null
}

function redirectByRole(request: NextRequest, role: UserRole): NextResponse {
  if (role === "admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  if (role === "partner") return NextResponse.redirect(new URL("/b2b/home", request.url))
  return NextResponse.redirect(new URL("/consumer", request.url))
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const role = getRoleFromRequest(request)

  if (path === "/login" && role) {
    return redirectByRole(request, role)
  }

  if (path.startsWith("/admin")) {
    if (!role || role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (path.startsWith("/b2b")) {
    if (!role || role !== "partner") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (path.startsWith("/consumer")) {
    if (!role || role !== "consumer") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/b2b/:path*", "/consumer/:path*"],
}