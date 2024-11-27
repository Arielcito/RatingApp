'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, Pause, SkipForward, SkipBack, Volume2, MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel'
import toast from 'react-hot-toast'
interface RadioInterfaceProps {
  channels: Channel[]
}
import Image from 'next/image'
import { getResourceURL } from '@/lib/utils'

export function RadioInterfaceComponent({ channels }: RadioInterfaceProps) {
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

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleStationChange = async (station: Channel) => {
    setIsLoading(true)
    setError(null)
    setIsPlaying(false)
    setCurrentStation(station)
    
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

  return (
    <div className="min-h-screen bg-black text-white">
      <audio
        ref={audioRef}
        src={currentStation.streamingUrl || currentStation.radioWebURL || ''}
        preload="none"
        onError={(e) => {
          const errorMessage = 'Error al cargar el audio. Por favor, verifique su conexión.'
          console.error(errorMessage, e)
          setIsPlaying(false)
          setError(errorMessage)
          toast.error(errorMessage)
        }}
      />

      <Button     
        variant="default" 
        size="icon" 
        className="h-16 w-16" 
        onClick={togglePlay}
        disabled={isLoading || !!error}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
        ) : isPlaying ? (
          <Pause className="h-8 w-8" />
        ) : (
          <PlayCircle className="h-8 w-8" />
        )}
        <span className="sr-only">
          {isLoading ? 'Cargando' : isPlaying ? 'Pausar' : 'Reproducir'}
        </span>
      </Button>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      <div className="flex h-[calc(100vh-73px)]">
        <main className="flex-1 overflow-auto">
          {/* Radio Player */}
          <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
            <div className="text-center">
              <Image
                src={currentStation.iconUrl ? getResourceURL(currentStation.iconUrl) : ''}
                alt={currentStation.name}
                width={100}
                height={100}
                className="object-cover rounded-lg"
                priority={false}
                quality={75}
              />
              <h2 className="text-3xl font-bold mb-2">{currentStation.name}</h2>
              <p className="text-xl text-gray-400 mb-1">
                {currentStation.fmFrequency && `FM ${currentStation.fmFrequency}`}
                {currentStation.localidad && ` - ${currentStation.localidad}`}
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="ghost" size="icon" onClick={() => {}}>
                  <SkipBack className="h-6 w-6" />
                  <span className="sr-only">Anterior</span>
                </Button>
                <Button variant="default" size="icon" className="h-16 w-16" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
                  <span className="sr-only">{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => {}}>
                  <SkipForward className="h-6 w-6" />
                  <span className="sr-only">Siguiente</span>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 w-64 mx-auto">
                <Volume2 className="h-5 w-5" />
                <Slider
                  value={[volume]}
                  onValueChange={(newVolume) => setVolume(newVolume[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Station Guide */}
          <div className="p-4">
            <div className="grid gap-4">
              {channels.map((station) => (
                <Card key={station.id} className="bg-gray-900">
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
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}