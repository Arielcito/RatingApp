'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical, PlayCircle, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import Hls from 'hls.js'
import { getResourceURL } from '@/lib/utils';
import { AdvertisingBanner } from '@/components/advertising-banner';
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { Tooltip } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { NavigationControls } from '@/components/navigation-controls'
import { ChannelList } from '@/components/channel-list'

interface StreamingPlatformProps {
  channels: Channel[];
}

export function StreamingPlatform({ channels }: StreamingPlatformProps) {
  const searchParams = useSearchParams()
  const [currentChannel, setCurrentChannel] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(20);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [iframeError, setIframeError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const VOLUME_STEP = 5

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
      if (!isVideoReady) return;
      
      const video = videoRef.current;
      if (!video) return;

      const filteredChannels = getFilteredChannels()
      if (filteredChannels.length === 0) return

      const currentChannelData = filteredChannels[currentChannel]
      if (currentChannelData.isIPTV) {
        setIsPlaying(false)
        const hls = new Hls();
        if (Hls.isSupported()) {
          hls.loadSource(currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || '');
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.volume = volume / 100;
            if (isPlaying) {
              video.play().catch(error => {
                console.error('Error al reproducir:', error);
                setIsPlaying(false);
              });
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || currentChannelData?.siteUrl || '';
          video.volume = volume / 100;
          if (isPlaying) {
            video.play().catch(error => {
              console.error('Error al reproducir:', error);
              setIsPlaying(false);
            });
          }
        }

        return () => {
          video.pause();
          hls.destroy();
        };
      }
    }, [currentChannel, channels, searchParams, isVideoReady, isPlaying, volume]);

  const handleChannelChange = (index: number) => {
    setIsPlaying(false);
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
    const filteredChannels = getFilteredChannels()
    setCurrentChannel((prev) => 
      prev === filteredChannels.length - 1 ? 0 : prev + 1
    )
  }

  const handleIframeError = () => {
    setIframeError(true);
    const channelUrl = getFilteredChannels()[currentChannel]?.tvWebURL;
    if (channelUrl) {
      window.open(channelUrl, '_blank');
    }
  };

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
                src={getFilteredChannels()[currentChannel]?.streamingUrl}
                className="w-full h-full border-0"
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