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

interface MediaPlatformProps {
  channels: Channel[];
  campaigns: Campaign[];
}

export function MediaPlatform({ channels, campaigns }: MediaPlatformProps) {
  const [currentChannel, setCurrentChannel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(channels[currentChannel]?.tvWebURL || channels[currentChannel]?.streamingUrl || '');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => {
          console.error('Error al reproducir:', error);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = channels[currentChannel]?.tvWebURL || channels[currentChannel]?.streamingUrl || '';
    }

    return () => {
      hls.destroy();
    };
  }, [currentChannel, channels]);

  const handleChannelChange = (index: number) => {
    setCurrentChannel(index);
  };


  return (
    <div className="bg-black text-white">
      <div className="flex">
        <main className="flex-1">
          <div className="aspect-video bg-gray-900 relative">
            <video 
              ref={videoRef}
              className="w-full h-full"
              controls
            >
              <track 
                kind="captions" 
                srcLang="en" 
                src="/path/to/captions.vtt" 
                label="English captions"
                default
              />
            </video>
          </div>

          {/* Advertising Banner */}
          <div className="mt-4">
            <AdvertisingBanner campaigns={campaigns} />
          </div>

          {/* Program Guide */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400">Ahora: {channels[0]?.pais}</div>
              <div className="flex items-center gap-2">
                <span>A continuación</span>
                <Button variant="ghost" size="sm" className="text-white">
                  Después <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {channels.map((channel, index) => (
                <div key={channel.id} className="flex gap-4 bg-gray-900 rounded-lg overflow-hidden">
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
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleChannelChange(index)}
                      >
                        VER AHORA
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}