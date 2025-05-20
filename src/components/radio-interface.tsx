import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'
import type { Channel } from '@/types/channel'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { getResourceURL } from '@/lib/utils'
import { AdvertisingBanner } from '@/components/advertising-banner'
import type { Campaign } from '@/types/campaign'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { Tooltip } from "@/components/ui/tooltip"
import { NavigationControls } from '@/components/navigation-controls'
import { ChannelList } from '@/components/channel-list'

interface RadioInterfaceProps {
  channels: Channel[]
}

export function RadioInterfaceComponent({ channels }: RadioInterfaceProps) {
  const searchParams = useSearchParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(channels[0])
  const [volume, setVolume] = useState(50)
  const [displayLimit, setDisplayLimit] = useState(20)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const VOLUME_STEP = 5

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const validateAudioSource = (url: string): boolean => {
    return Boolean(url) && (
      url.startsWith('http://') || 
      url.startsWith('https://') || 
      url.startsWith('data:')
    )
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const sourceUrl = currentStation.streamingUrl || currentStation.radioWebURL || ''
        if (!validateAudioSource(sourceUrl)) {
          const errorMessage = 'URL de transmisión no válida'
          toast.error(errorMessage)
          setError(errorMessage)
          setIsPlaying(false)
          return
        }

        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
          const errorMessage = 'No se pudo reproducir la emisora. Formato no soportado o conexión inestable.'
          toast.error(errorMessage)
          setError(errorMessage)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentStation])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleStationChange = async (station: Channel) => {
    setIsLoading(true)
    setError(null)
    setIsPlaying(false)
    setCurrentStation(station)
    
    const sourceUrl = station.streamingUrl || station.radioWebURL || ''
    if (!validateAudioSource(sourceUrl)) {
      const errorMessage = 'URL de transmisión no válida'
      toast.error(errorMessage)
      setError(errorMessage)
      setIsLoading(false)
      return
    }
    
    if (audioRef.current) {
      audioRef.current.load()
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        const errorMessage = 'No se pudo reproducir la emisora. Por favor, intente nuevamente.'
        toast.error(errorMessage)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    // Scroll to top when changing stations
    const radioContainer = document.querySelector('.h-\\[400px\\]')
    if (radioContainer) {
      radioContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Add this function to filter channels based on location
  const getFilteredChannels = () => {
    const provincia = searchParams.get('provincia')
    const localidad = searchParams.get('localidad')
    
    return channels.filter(channel => {
      if (provincia === 'all') return true
      if (!provincia) return true
      
      const matchesProvincia = channel.provincia === provincia
      if (localidad === 'all') return matchesProvincia
      if (!localidad) return matchesProvincia
      
      return matchesProvincia && channel.localidad === localidad
    })
  }

  // Update the initial state to use the first filtered channel
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    const filteredChannels = getFilteredChannels()
    if (filteredChannels.length > 0) {
      setCurrentStation(filteredChannels[0])
    }
  }, [searchParams])

  const handleNextStation = () => {
    const filteredChannels = getFilteredChannels()
    const currentIndex = filteredChannels.findIndex(channel => channel.id === currentStation.id)
    const nextIndex = (currentIndex + 1) % filteredChannels.length
    handleStationChange(filteredChannels[nextIndex])
  }

  const handlePreviousStation = () => {
    const filteredChannels = getFilteredChannels()
    const currentIndex = filteredChannels.findIndex(channel => channel.id === currentStation.id)
    const previousIndex = currentIndex === 0 ? filteredChannels.length - 1 : currentIndex - 1
    handleStationChange(filteredChannels[previousIndex])
  }

  useHotkeys('space', (e) => {
    e.preventDefault()
    togglePlay()
  }, [togglePlay])

  useHotkeys('arrowup', (e) => {
    e.preventDefault()
    setVolume(prev => Math.min(prev + VOLUME_STEP, 100))
  }, [])

  useHotkeys('arrowdown', (e) => {
    e.preventDefault() 
    setVolume(prev => Math.max(prev - VOLUME_STEP, 0))
  }, [])

  useHotkeys('arrowleft', (e) => {
    e.preventDefault()
    handlePreviousStation()
  }, [handlePreviousStation])

  useHotkeys('arrowright', (e) => {
    e.preventDefault()
    handleNextStation()
  }, [handleNextStation])

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="text-white">
      <div className="flex">
        <main className="flex-1">
          <NavigationControls
            onPrevious={handlePreviousStation}
            onNext={handleNextStation}
            currentChannel={currentStation}
            disabled={getFilteredChannels().length <= 1}
          />

          {/* Contenedor del reproductor */}
          <div ref={containerRef} className="h-[400px] bg-gray-900 relative">
            {currentStation.isIPTV ? (
              <div className="h-full flex items-center justify-center">
                <audio
                  ref={audioRef}
                  src={currentStation.streamingUrl || ''}
                  preload="none"
                >
                  <track kind="captions" />
                </audio>
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={currentStation.iconUrl ? getResourceURL(currentStation.iconUrl) : ''}
                      alt={currentStation.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-lg"
                      priority={false}
                      quality={75}
                    />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-1">{currentStation.name}</h2>
                  <p className="text-lg text-gray-400 mb-1">
                    {currentStation.fmFrequency && `FM ${currentStation.fmFrequency}`}
                    {currentStation.localidad && ` - ${currentStation.localidad}`}
                  </p>
                </motion.div>
              </div>
            ) : (
              <iframe
                title={currentStation.name}
                src={currentStation.radioWebURL}
                className="w-full h-full border-0"
                allowFullScreen
              />
            )}

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <PlayCircle className="h-6 w-6" />
                  )}
                </Button>

                <div className="flex items-center gap-2 flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white/80"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.muted = !audioRef.current.muted
                        if (audioRef.current.muted) {
                          setVolume(0)
                        } else {
                          setVolume(audioRef.current.volume * 100)
                        }
                      }
                    }}
                  >
                    {volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => {
                      setVolume(value[0])
                      if (audioRef.current) {
                        audioRef.current.volume = value[0] / 100
                      }
                    }}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Advertising Banner */}
          <AdvertisingBanner />

          {/* Station Guide */}
          <div className="p-4">
            <ChannelList
              channels={getFilteredChannels().slice(0, displayLimit)}
              currentChannel={currentStation}
              onChannelSelect={handleStationChange}
              isPlaying={isPlaying}
              actionText="ESCUCHAR"
            />

            {getFilteredChannels().length > displayLimit && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setDisplayLimit(prev => prev + 20)}
                >
                  Ver más canales
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}