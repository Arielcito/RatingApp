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
        const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
        if (!response.ok) throw new Error('Error al cargar ubicaciones')
        
        const channels: Channel[] = await response.json()
        
        // Extraer ubicaciones únicas
        const uniqueLocations = channels.reduce((acc: Location[], channel) => {
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

        setLocations(sortedLocations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error cargando ubicaciones:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return { locations, isLoading, error }
} 