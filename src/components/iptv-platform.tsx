'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IptvPlatformProps {
  serviceType: 'tv' | 'radio' | 'streaming' | 'diarios'
  channels: string[]
}

export function IptvPlatform({ serviceType, channels }: IptvPlatformProps) {
  const [selectedChannel, setSelectedChannel] = useState('')

  useEffect(() => {
    // Select first channel by default
    setSelectedChannel(channels[0])
  }, [channels])

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Canales de {serviceType}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {channels.map((channel) => (
                <li key={channel}>
                  <Button 
                    variant={selectedChannel === channel ? "default" : "outline"} 
                    className="w-full justify-start text-black"
                    onClick={() => setSelectedChannel(channel)}
                    aria-pressed={selectedChannel === channel}
                  >
                    {channel}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Reproduciendo: {selectedChannel}</CardTitle>
              <CardDescription>Servicio: {serviceType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <p className="text-xl">Contenido de {selectedChannel}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}