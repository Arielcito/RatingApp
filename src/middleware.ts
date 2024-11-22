import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obtener el subscriber del localStorage (convertido a cookie en el cliente)
  const subscriber = request.cookies.get('subscriber')
  
  // Verificar si la ruta actual es /servicios
  if (request.nextUrl.pathname.startsWith('/servicios')) {
    if (!subscriber) {
      // Si no hay subscriber, redirigir al login
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/servicios/:path*'
} 