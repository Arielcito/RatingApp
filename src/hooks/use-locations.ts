import { useState, useEffect } from 'react'
import type { Channel } from '@/types/channel'

interface Location {
  pais: string
  provincia: string
  localidad: string
}

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log('Iniciando fetch de ubicaciones...')
        const token = localStorage.getItem('token')
        console.log('Token presente:', !!token)
        
        const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        console.log('Respuesta del servidor:', response.status)
        
        if (!response.ok) throw new Error('Error al cargar ubicaciones')
        const channels: Channel[] = await response.json()
        
        // Filtrar solo canales activos en web
        const activeChannels = channels.filter(channel => channel.activeOnWeb === true)
        
        // Extraer ubicaciones únicas
        console.log('Procesando', activeChannels.length, 'canales activos en web')
        const uniqueLocations = activeChannels.reduce((acc: Location[], channel) => {
          const locationExists = acc.some(
            loc => 
              loc.pais === channel.pais && 
              loc.provincia === channel.provincia && 
              loc.localidad === channel.localidad
          )

          if (!locationExists && channel.pais && channel.provincia && channel.localidad) {
            acc.push({
              pais: channel.pais,
              provincia: channel.provincia,
              localidad: channel.localidad
            })
          }

          return acc
        }, [])

        // Ordenar por provincia y localidad
        const sortedLocations = uniqueLocations.sort((a, b) => {
          if (a.provincia === b.provincia) {
            return a.localidad.localeCompare(b.localidad)
          }
          return a.provincia.localeCompare(b.provincia)
        })

        console.log('Ubicaciones únicas encontradas:', sortedLocations.length)
        setLocations(sortedLocations)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        console.error('Error detallado:', {
          message: errorMessage,
          error: err,
          token: !!localStorage.getItem('token')
        })
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return { locations, isLoading, error }
} 