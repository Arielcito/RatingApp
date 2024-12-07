import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL no proporcionada' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    const contentType = response.headers.get('content-type')
    const content = await response.text()
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType || 'text/html',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    console.error('Error en el proxy:', error)
    return NextResponse.json({ error: 'Error al obtener el contenido' }, { status: 500 })
  }
} 