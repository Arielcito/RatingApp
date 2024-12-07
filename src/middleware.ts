import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const subscriber = request.cookies.get('subscriber')?.value
  
  if (request.nextUrl.pathname.startsWith('/servicios')) {
    
    if (!subscriber) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    
    try {
      const parsedSubscriber = JSON.parse(subscriber);
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/servicios/:path*'
} 