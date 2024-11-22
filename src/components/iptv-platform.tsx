'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radio, Tv, Laptop, Newspaper } from 'lucide-react'

const services = {
  tv: ['Canal 1', 'Canal 2', 'Canal 3'],
  radio: ['Radio 1', 'Radio 2', 'Radio 3'],
  streaming: ['Netflix', 'Amazon Prime', 'Disney+'],
  diarios: ['El País', 'El Mundo', 'ABC']
}

export function IptvPlatform() {
  const [selectedService, setSelectedService] = useState('tv')
  const [selectedChannel, setSelectedChannel] = useState('')

  useEffect(() => {
    // Seleccionar el primer canal del servicio actual cuando cambia el servicio
    setSelectedChannel(services[selectedService][0])
  }, [selectedService])

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="tv" className="mb-6" onValueChange={(value) => setSelectedService(value)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger 
            value="tv" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
          >
            <Tv className="mr-2" aria-hidden="true" />TV
          </TabsTrigger>
          <TabsTrigger 
            value="radio"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
          >
            <Radio className="mr-2" aria-hidden="true" />Radio
          </TabsTrigger>
          <TabsTrigger 
            value="streaming"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
          >
            <Laptop className="mr-2" aria-hidden="true" />Streaming
          </TabsTrigger>
          <TabsTrigger 
            value="diarios"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
          >
            <Newspaper className="mr-2" aria-hidden="true" />Diarios
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Canales de {selectedService}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {services[selectedService].map((channel) => (
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
              <CardDescription>Servicio: {selectedService}</CardDescription>
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