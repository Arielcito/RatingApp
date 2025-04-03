import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Only check for subscriber on servicios routes
  if (request.nextUrl.pathname.startsWith('/servicios')) {
    try {
      const subscriber = request.cookies.get('subscriber')?.value
      
      if (!subscriber) {
        // Redirect to login page
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
      
      try {
        // Validate that the subscriber cookie is valid JSON
        const parsedSubscriber = JSON.parse(subscriber)
        
        // Basic validation of subscriber data
        if (!parsedSubscriber || typeof parsedSubscriber !== 'object') {
          throw new Error('Invalid subscriber data')
        }
      } catch (error) {
        // If there's an error parsing the subscriber, redirect to login
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      // If there's any other error, log it but don't redirect
      console.error('Middleware error:', error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/servicios/:path*'
} 