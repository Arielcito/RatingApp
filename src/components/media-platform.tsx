'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel';
import Hls from 'hls.js'

interface MediaPlatformProps {
  channels: Channel[];
}

export function MediaPlatform({ channels }: MediaPlatformProps) {
  const [currentChannel, setCurrentChannel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(channels[currentChannel].tvWebURL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => {
          console.error('Error al reproducir:', error);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = channels[currentChannel].tvWebURL;
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

          {/* Program Guide */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400">Ahora: {channels[0].pais}</div>
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
                  <img
                    src={channel.iconUrl ?? ''}
                    alt={channel.name}
                    className="w-48 h-28 object-cover"
                  />
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