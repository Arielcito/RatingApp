"use client";

import { useEffect, useState } from 'react'
import { useSubscriber } from "@/app/context/SubscriberContext"
import { getRadioChannels } from '@/lib/api/channels'
import { getActiveCampaigns } from '@/lib/api/campaign'
import { RadioInterfaceComponent } from '@/components/radio-interface'
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';

export default function RadioPage() {
  const { subscriber } = useSubscriber()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [channels, setChannels] = useState<Channel[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  useEffect(() => {
    const loadChannels = async () => {
      try {
        const radioChannels = await getRadioChannels()
        const campaigns = await getActiveCampaigns()

        setChannels(radioChannels)
        setCampaigns(campaigns)
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

  return <RadioInterfaceComponent channels={channels} campaigns={campaigns} />
} 