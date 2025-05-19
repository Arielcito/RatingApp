'use client'

import { useEffect, useState } from 'react'
import { useSubscriber } from "@/app/context/SubscriberContext"
import { getOnlineNewsChannels } from '@/lib/api/channels'
import type { Channel } from '@/types/channel'
import { AdvertisingBanner } from '@/components/advertising-banner'
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { Button } from "@/components/ui/button"
import { ServiceSkeleton } from '@/components/Servicios/service-skeleton'
import { NavigationControls } from '@/components/navigation-controls'
import { ChannelList } from '@/components/channel-list'

export default function DiarioViewerPage({ params }: { params: { id: string } }) {
  const { subscriber, isLoading: isSubscriberLoading } = useSubscriber()
  const [newspaper, setNewspaper] = useState<Channel | null>(null)
  const [allNewspapers, setAllNewspapers] = useState<Channel[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayLimit, setDisplayLimit] = useState(20)

  useEffect(() => {
    const loadData = async () => {
      try {
        const newsChannels = await getOnlineNewsChannels()
        setAllNewspapers(newsChannels)
        const selectedId = Number(params.id)
        const selectedIndex = newsChannels.findIndex(channel => channel.id === selectedId)
        setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0)
        const selectedNewspaper = newsChannels.find(channel => channel.id === selectedId) || null
        setNewspaper(selectedNewspaper)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error cargando diario:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [params.id])

  const handleNextNewspaper = () => {
    const nextIndex = (currentIndex + 1) % allNewspapers.length
    setCurrentIndex(nextIndex)
    setNewspaper(allNewspapers[nextIndex])
  }

  const handlePrevNewspaper = () => {
    const prevIndex = (currentIndex - 1 + allNewspapers.length) % allNewspapers.length
    setCurrentIndex(prevIndex)
    setNewspaper(allNewspapers[prevIndex])
  }

  const handleNewspaperSelect = (selectedNewspaper: Channel) => {
    const index = allNewspapers.findIndex(n => n.id === selectedNewspaper.id)
    setCurrentIndex(index)
    setNewspaper(selectedNewspaper)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Set up keyboard shortcuts
  useHotkeys('left', () => handlePrevNewspaper(), [allNewspapers])
  useHotkeys('right', () => handleNextNewspaper(), [allNewspapers])

  // Show skeleton while subscriber is loading or data is loading
  if (isSubscriberLoading || isLoading) {
    return <ServiceSkeleton />;
  }

  // Handle errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="text-red-500 text-xl font-semibold">Error</div>
        <div className="text-gray-400">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // If no subscriber, the layout will handle the redirect
  if (!subscriber) return null;

  // If no newspaper found
  if (!newspaper) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="text-yellow-500 text-xl font-semibold">Diario no encontrado</div>
        <div className="text-gray-400">El diario que buscas no existe o no está disponible.</div>
        <Button 
          onClick={() => window.location.href = '/servicios/diarios'}
          className="bg-yellow-500 text-black hover:bg-yellow-600"
        >
          Volver a Diarios
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <NavigationControls
        onPrevious={handlePrevNewspaper}
        onNext={handleNextNewspaper}
        currentChannel={newspaper}
      />

      <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden min-h-[80vh]">
        <iframe 
          src={newspaper.onlineNewsUrl || '#'} 
          className="w-full h-full border-0"
          title={newspaper.name}
        />
      </div>

      <div className="mt-4">
        <AdvertisingBanner />
      </div>

      {/* Newspaper List */}
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-400">
            Diario actual: {newspaper.name}
          </div>
          <div className="flex items-center gap-2">
            <span>Siguiente</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white"
              onClick={handleNextNewspaper}
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ChannelList
          channels={allNewspapers.slice(0, displayLimit)}
          currentChannel={newspaper}
          onChannelSelect={handleNewspaperSelect}
          isPlaying={false}
        />

        {allNewspapers.length > displayLimit && (
          <div className="flex justify-center mt-4">
            <Button
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setDisplayLimit(prev => prev + 20)}
            >
              Ver más diarios
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
} 