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

export default function DiarioViewerPage({ params }: { params: { id: string } }) {
  const { subscriber } = useSubscriber()
  const [newspaper, setNewspaper] = useState<Channel | null>(null)
  const [allNewspapers, setAllNewspapers] = useState<Channel[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const handlePreviousNewspaper = () => {
    const previousIndex = currentIndex === 0 ? allNewspapers.length - 1 : currentIndex - 1
    setCurrentIndex(previousIndex)
    setNewspaper(allNewspapers[previousIndex])
  }

  useHotkeys('arrowleft', (e) => {
    e.preventDefault()
    handlePreviousNewspaper()
  }, [handlePreviousNewspaper])

  useHotkeys('arrowright', (e) => {
    e.preventDefault()
    handleNextNewspaper()
  }, [handleNextNewspaper])

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
      <div className="mt-4">
        <AdvertisingBanner />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={handlePreviousNewspaper}
          className="text-white"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <h1 className="text-2xl font-bold text-white">{newspaper.name}</h1>
        <Button
          variant="ghost"
          onClick={handleNextNewspaper}
          className="text-white"
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={newspaper.onlineNewsUrl || newspaper.siteUrl || ''}
          className="w-full h-full min-h-[calc(100vh-200px)]"
          style={{ border: 'none' }}
          title={newspaper.name}
        />
      </div>
    </div>
  )
} 