import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🔒 Middleware ejecutándose para:', request.nextUrl.pathname);
  const subscriber = request.cookies.get('subscriber')?.value
  
  if (request.nextUrl.pathname.startsWith('/servicios')) {
    console.log('🔍 Verificando acceso a ruta protegida /servicios');
    
    if (!subscriber) {
      console.log('⚠️ No se encontró cookie de subscriber, redirigiendo a login');
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    
    try {
      console.log('🍪 Verificando validez de la cookie:', subscriber);
      const parsedSubscriber = JSON.parse(subscriber);
      console.log('✅ Cookie válida:', parsedSubscriber);
    } catch (error) {
      console.error('❌ Cookie inválida:', error);
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/servicios/:path*'
} 