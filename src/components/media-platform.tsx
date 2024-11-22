'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel';
interface MediaPlatformProps {
  channels: Channel[];
}

export function MediaPlatform({ channels }: MediaPlatformProps) {
  return (
    <div className=" bg-black text-white">
      <div className="flex ">
        {/* Main Content */}
        <main className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-gray-900 relative">
            <video className="w-full h-full">
              <source src={channels[0].tvWebURL} type="video/mp4" />
              <track 
                kind="captions"
                src="/captions.vtt"
                srcLang="es"
                label="Spanish"
              />
              Tu navegador no soporta el elemento de video.
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
              {channels.map((channel) => (
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
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
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