'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, PlayCircle, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'
import type { Channel } from '@/types/channel';
import Hls from 'hls.js'
import { AdvertisingBanner } from '@/components/advertising-banner';
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { Slider } from "@/components/ui/slider"
import { NavigationControls } from '@/components/navigation-controls'
import { ChannelList } from '@/components/channel-list'
import { useRatingTracker } from '@/hooks/use-rating-tracker'

interface MediaPlatformProps {
  channels: Channel[];
}

export function MediaPlatform({ channels }: MediaPlatformProps) {
  const searchParams = useSearchParams()
  const [currentChannel, setCurrentChannel] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(20);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const VOLUME_STEP = 5
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  
  // Rating tracker for measuring viewership
  const { trackPlay, trackStop, trackChannelChange, cleanup } = useRatingTracker()

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const filteredChannels = getFilteredChannels()
    console.log('filteredChannels', filteredChannels)
    
    // Check if there's a channelId parameter to select a specific channel
    const channelId = searchParams.get('channelId')
    if (channelId && filteredChannels.length > 0) {
      const channelIndex = filteredChannels.findIndex(channel => channel.id === Number(channelId))
      if (channelIndex !== -1) {
        setCurrentChannel(channelIndex)
        return
      }
    }
    
    // Default to first channel if no specific channel requested
    if (filteredChannels.length > 0) {
      setCurrentChannel(0)
    }
  }, [searchParams])
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      console.log('currentChannel', currentChannel)
    const video = videoRef.current;
    console.log('videoRef', videoRef)
    if (!video) return;
    console.log('video', video)
    const filteredChannels = getFilteredChannels()
    if (filteredChannels.length === 0) return

    const currentChannelData = filteredChannels[currentChannel]
    console.log('currentChannelData', currentChannelData)
    if (currentChannelData.isIPTV || (currentChannelData.tvWebURL && currentChannelData.tvWebURL.includes('.m3u8'))) {
      console.log('canPlayType', currentChannelData?.tvWebURL, currentChannelData?.streamingUrl, currentChannelData?.siteUrl)
      const hls = new Hls({
        debug: true,
        enableWorker: true,
        lowLatencyMode: true
      });
      
      if (Hls.isSupported()) {
        try {
          hls.loadSource(currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || '');
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('Manifest parsed, attempting to play');
            video.play().catch(error => {
              console.error('Error al reproducir:', error);
            });
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS Error:', data);
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.error('Network error, trying to recover');
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.error('Media error, trying to recover');
                  hls.recoverMediaError();
                  break;
                default:
                  console.error('Fatal error, cannot recover');
                  hls.destroy();
                  break;
              }
            }
          });
        } catch (error) {
          console.error('Error setting up HLS:', error);
        }
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('Using native HLS support');
        video.src = currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || currentChannelData?.siteUrl || '';
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => {
            console.error('Error al reproducir:', error);
          });
        });
      }

      return () => {
        hls.destroy();
      };
    }
  }, [currentChannel, channels, searchParams]);

  const handleChannelChange = (index: number) => {
    console.log('handleChannelChange called with index:', index)
    const filteredChannels = getFilteredChannels()
    console.log('Current channel:', currentChannel)
    console.log('Old channel:', filteredChannels[currentChannel])
    console.log('New channel:', filteredChannels[index])
    
    const oldChannel = filteredChannels[currentChannel]
    const newChannel = filteredChannels[index]
    
    // Track play for new channel
    if (newChannel) {
      console.log('Tracking play for new channel:', newChannel.name)
      trackPlay(newChannel)
    }
    
    setCurrentChannel(index);
    
    const videoContainer = document.querySelector('.aspect-video');
    if (videoContainer) {
      videoContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNextChannel = () => {
    console.log('handleNextChannel called')
    const filteredChannels = getFilteredChannels()
    const currentIndex = currentChannel
    const nextIndex = currentChannel === filteredChannels.length - 1 ? 0 : currentChannel + 1
    
    console.log('Current channel index:', currentIndex)
    console.log('Next channel index:', nextIndex)
    console.log('Current channel:', filteredChannels[currentIndex])
    console.log('Next channel:', filteredChannels[nextIndex])
    
    const newChannel = filteredChannels[nextIndex]
    
    // Track play for new channel
    if (newChannel) {
      console.log('Tracking play for new channel:', newChannel.name)
      trackPlay(newChannel)
    }
    
    setCurrentChannel(nextIndex)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    const filteredChannels = getFilteredChannels()
    const currentChannelData = filteredChannels[currentChannel]

    if (isPlaying) {
      video.pause()
      // Track stop action for rating measurement
      if (currentChannelData) {
        trackStop(currentChannelData)
      }
    } else {
      video.play()
      // Track play action for rating measurement
      if (currentChannelData) {
        trackPlay(currentChannelData)
      }
    }
    setIsPlaying(!isPlaying)
  }

  // Agregar hotkeys
  useHotkeys('space', (e) => {
    if (!getFilteredChannels()[currentChannel]?.isIPTV) return
    e.preventDefault()
    togglePlay()
  }, [togglePlay])

  useHotkeys('arrowup', (e) => {
    if (!getFilteredChannels()[currentChannel]?.isIPTV) return
    e.preventDefault()
    const video = videoRef.current
    if (!video) return
    const newVolume = Math.min(video.volume + VOLUME_STEP/100, 1)
    video.volume = newVolume
    setVolume(newVolume * 100)
  }, [])

  useHotkeys('arrowdown', (e) => {
    if (!getFilteredChannels()[currentChannel]?.isIPTV) return
    e.preventDefault()
    const video = videoRef.current
    if (!video) return
    const newVolume = Math.max(video.volume - VOLUME_STEP/100, 0)
    video.volume = newVolume
    setVolume(newVolume * 100)
  }, [])

  useHotkeys('arrowleft', (e) => {
    e.preventDefault()
    const filteredChannels = getFilteredChannels()
    setCurrentChannel(prev => 
      prev === 0 ? filteredChannels.length - 1 : prev - 1
    )
  }, [])

  useHotkeys('arrowright', (e) => {
    e.preventDefault()
    handleNextChannel()
  }, [handleNextChannel])

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return
    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(value[0])
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (video.muted) {
      setVolume(0)
    } else {
      setVolume(video.volume * 100)
    }
  }

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen()
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

  // Cleanup rating tracker when component unmounts
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  return (
    <div className="bg-black text-white">
      <div className="flex">
        <main className="flex-1">
          <NavigationControls
            onPrevious={() => {
              const filteredChannels = getFilteredChannels()
              setCurrentChannel(prev => 
                prev === 0 ? filteredChannels.length - 1 : prev - 1
              )
            }}
            onNext={handleNextChannel}
            currentChannel={getFilteredChannels()[currentChannel]}
          />

          <div ref={videoContainerRef} className="aspect-video bg-gray-900 relative">
            {getFilteredChannels()[currentChannel]?.isIPTV ? (
              <>
                <video 
                  ref={videoRef}
                  className="w-full h-full"
                  controls={false}
                  onLoadedMetadata={() => setIsVideoReady(true)}
                >
                  <track kind="captions" />
                </video>
                
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
                        onClick={toggleMute}
                      >
                        {volume === 0 ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
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
              </>
            ) : (
              <iframe
                title={`Canal ${getFilteredChannels()[currentChannel]?.name}`}
                src={getFilteredChannels()[currentChannel]?.tvWebURL}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Advertising Banner */}
          <div className="mt-4">
            <AdvertisingBanner />
          </div>

          {/* Program Guide */}
          <motion.div 
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400">
                Ahora: {getFilteredChannels()[currentChannel]?.name}
              </div>
              <div className="flex items-center gap-2">
                <span>A continuación</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white"
                  onClick={handleNextChannel}
                >
                  Siguiente <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ChannelList
              channels={getFilteredChannels().slice(0, displayLimit)}
              currentChannel={getFilteredChannels()[currentChannel]}
              onChannelSelect={(channel) => {
                const index = getFilteredChannels().findIndex(c => c.id === channel.id)
                handleChannelChange(index)
              }}
              isPlaying={isPlaying}
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
          </motion.div>
        </main>
      </div>
    </div>
  )
}