'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import Hls from 'hls.js'
import Image from 'next/image';
import { getResourceURL } from '@/lib/utils';
import { AdvertisingBanner } from '@/components/advertising-banner';
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

interface StreamingPlatformProps {
  channels: Channel[];
}

export function StreamingPlatform({ channels }: StreamingPlatformProps) {
  const searchParams = useSearchParams()
  const [currentChannel, setCurrentChannel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [iframeError, setIframeError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

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
      console.log('isVideoReady', isVideoReady)
      if (!isVideoReady) return;
      
      const video = videoRef.current;
      if (!video) return;
      console.log('video', video)
      const filteredChannels = getFilteredChannels()
      if (filteredChannels.length === 0) return

      const currentChannelData = filteredChannels[currentChannel]
      console.log('currentChannelData', currentChannelData)
      if (currentChannelData.isIPTV) {

        console.log('canPlayType', currentChannelData?.tvWebURL, currentChannelData?.streamingUrl, currentChannelData?.siteUrl)
        const hls = new Hls();
        if (Hls.isSupported()) {
          hls.loadSource(currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || '');
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(error => {
              console.error('Error al reproducir:', error);
            });
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('canPlayType', currentChannelData?.tvWebURL, currentChannelData?.streamingUrl, currentChannelData?.siteUrl)
          video.src = currentChannelData?.tvWebURL || currentChannelData?.streamingUrl || currentChannelData?.siteUrl || '';
        }

        return () => {
          hls.destroy();
        };
      }
    }, [currentChannel, channels, searchParams, isVideoReady]);

  const handleChannelChange = (index: number) => {
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

  return (
    <div className="bg-black text-white">
      <div className="flex">
        <main className="flex-1">
          <div className="aspect-video bg-gray-900 relative">
            {getFilteredChannels()[currentChannel]?.isIPTV ? (
              <video 
                ref={videoRef}
                className="w-full h-full"
                controls
                onLoadedMetadata={() => setIsVideoReady(true)}
              >
                <track 
                  kind="captions" 
                  srcLang="en" 
                  src="/path/to/captions.vtt" 
                  label="English captions"
                  default
                />
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

            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {getFilteredChannels().map((channel, index) => (
                  <motion.div
                    key={channel.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex gap-4 bg-gray-900 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative w-48 h-28">
                      <Image
                        src={channel.iconUrl ? getResourceURL(channel.iconUrl) : ''}
                        alt={channel.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        quality={75}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{channel.name}</h3>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{channel.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400">{channel.pais}</span>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
                          onClick={() => handleChannelChange(index)}
                        >
                          VER AHORA
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}