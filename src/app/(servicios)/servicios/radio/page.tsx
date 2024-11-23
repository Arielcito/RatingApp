"use client";

import { useEffect, useState } from 'react'
import { IptvPlatform } from '@/components/iptv-platform'
import { useSubscriber } from "@/app/context/SubscriberContext"
import { getRadioChannels } from '@/lib/api/channels'
import type { Channel } from '@/types/channel'
import { MediaPlatform } from '@/components/media-platform';
import { RadioInterfaceComponent } from '@/components/radio-interface'

export default function RadioPage() {
  const { subscriber } = useSubscriber()
  const [channels, setChannels] = useState<Channel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const radioChannels = await getRadioChannels()
        console.log(radioChannels)
        setChannels(radioChannels)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error fetching radio channels:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadChannels()
  }, [])

  if (!subscriber) return null
  if (isLoading) return <div>Cargando canales...</div>
  if (error) return <div>Error: {error}</div>

  return <RadioInterfaceComponent channels={channels} />
} 