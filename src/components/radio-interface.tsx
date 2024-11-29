import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, Pause, SkipForward, SkipBack, Volume2, MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { getResourceURL } from '@/lib/utils'
import { AdvertisingBanner } from '@/components/advertising-banner'
import type { Campaign } from '@/types/campaign'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

interface RadioInterfaceProps {
  channels: Channel[]
}

export function RadioInterfaceComponent({ channels }: RadioInterfaceProps) {
  const searchParams = useSearchParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(channels[0])
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen text-white">
      <div className="flex h-[calc(100vh-73px)]">
        <main className="flex-1 overflow-auto">
          <audio
            ref={audioRef}
            src={currentStation.streamingUrl || currentStation.radioWebURL || ''}
            preload="none"
          >
            <track kind="captions" />
          </audio>
          <motion.div 
            className="h-[400px] bg-gray-900 relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-center flex flex-col items-center"
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
              <motion.div 
                className="flex items-center justify-center gap-4 mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePreviousStation}
                  disabled={getFilteredChannels().length <= 1}
                >
                  <SkipBack className="h-6 w-6" />
                  <span className="sr-only">Anterior</span>
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  className="h-16 w-16" 
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
                  <span className="sr-only">{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleNextStation}
                  disabled={getFilteredChannels().length <= 1}
                >
                  <SkipForward className="h-6 w-6" />
                  <span className="sr-only">Siguiente</span>
                </Button>
              </motion.div>
              <div className="flex items-center justify-center gap-4 mt-2 w-64 mx-auto">
                <Volume2 className="h-5 w-5" />
                <Slider
                  value={[volume]}
                  onValueChange={(newVolume) => setVolume(newVolume[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Advertising Banner */}
          <AdvertisingBanner />

          {/* Station Guide */}
          <div className="p-4">
            <div className="grid gap-4">
              <AnimatePresence>
                {getFilteredChannels().map((station, index) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="bg-gray-900">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <Image
                            src={station.iconUrl ? getResourceURL(station.iconUrl) : ''}
                            alt={station.name}
                            width={100}
                            height={100}
                            className="object-cover rounded-lg"
                            priority={false}
                            quality={75}
                          />
                          <div className="flex-1">
                            <CardTitle>{station.name}</CardTitle>
                            <CardDescription>
                              {station.fmFrequency ? `FM ${station.fmFrequency}` : 'Radio Online'}
                            </CardDescription>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className='mr-4'>
                              <p className="font-semibold">{station.localidad}</p>
                              {station.description && (
                                <p className="text-sm text-gray-400">{station.description}</p>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-purple-600 hover:bg-purple-700" 
                              onClick={() => handleStationChange(station)}
                              disabled={!station.streamingUrl && !station.radioWebURL}
                            >
                              {currentStation.id === station.id && isPlaying ? 'REPRODUCIENDO' : 'ESCUCHAR'}
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}