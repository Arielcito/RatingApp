'use client'

import { useEffect, useState } from 'react'
import { useSubscriber } from "@/app/context/SubscriberContext"
import { getOnlineNewsChannels } from '@/lib/api/channels'
import type { Channel } from '@/types/channel'
import { AdvertisingBanner } from '@/components/advertising-banner'
import { getActiveCampaigns } from '@/lib/api/campaign'
import type { Campaign } from '@/types/campaign'

export default function DiarioViewerPage({ params }: { params: { id: string } }) {
  const { subscriber } = useSubscriber()
  const [newspaper, setNewspaper] = useState<Channel | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [newsChannel, activeCampaigns] = await Promise.all([
        getOnlineNewsChannels(),
          getActiveCampaigns()
        ])
        console.log(newsChannel)
        setNewspaper(newsChannel.find(channel => channel.id === params.id) || null)
        setCampaigns(activeCampaigns)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error cargando diario:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [params.id])

  if (!subscriber) return null
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"/>
    </div>
  )
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>
  if (!newspaper) return <div className="text-center p-4">Diario no encontrado</div>

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-white">{newspaper.name}</h1>
      
      <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-lg">
        <iframe
          is="x-frame-bypass"
          src={newspaper.onlineNewsUrl || newspaper.siteUrl || ''}
          className="w-full h-full min-h-[calc(100vh-200px)]"
          style={{ border: 'none' }}
          title={newspaper.name}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      <div className="mt-4">
        <AdvertisingBanner />
      </div>
    </div>
  )
} 