'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical, PlayCircle, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import Hls from 'hls.js'
import Image from 'next/image';
import { getResourceURL } from '@/lib/utils';
import { AdvertisingBanner } from '@/components/advertising-banner';
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { Tooltip } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { NavigationControls } from '@/components/navigation-controls'
import { ChannelList } from '@/components/channel-list'

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
    setCurrentChannel(index);
  };

  const handleNextChannel = () => {
    const filteredChannels = getFilteredChannels()
    setCurrentChannel((prev) => 
      prev === filteredChannels.length - 1 ? 0 : prev + 1
    )
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
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

          <div className="aspect-video bg-gray-900 relative">
            {getFilteredChannels()[currentChannel]?.isIPTV ? (
              <video 
                ref={videoRef}
                className="w-full h-full"
                controls={false}
                onLoadedMetadata={() => setIsVideoReady(true)}
              >
                <track kind="captions" />
              </video>
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