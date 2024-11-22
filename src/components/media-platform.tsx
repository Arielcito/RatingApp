'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical } from 'lucide-react'
import { Sidebar } from './Servicios/sidebar'
import { Header } from './Servicios/header'

const programs = [
  {
    id: 1,
    channel: 'CSI: Miami',
    title: 'El testigo de un crimen',
    time: '01:11 p.m. - 02:42 p.m.',
    description: 'Un corredor de diamantes es asesinado a tiros en un estacionamiento, un hombre con...',
    image: '/placeholder.svg?height=120&width=200'
  },
  {
    id: 2,
    channel: 'CINE ESTELAR',
    title: 'Triste San Valentín',
    time: '01:32 p.m. - 03:38 p.m.',
    description: 'Una historia de amor y desamor en el día de San Valentín',
    image: '/placeholder.svg?height=120&width=200'
  },
  {
    id: 3,
    channel: 'THE NIGHT',
    title: 'Un pedacito de cielo',
    time: '02:42 p.m. - 03:34 p.m.',
    description: 'Una conmovedora historia sobre la vida y el destino',
    image: '/placeholder.svg?height=120&width=200'
  }
]

export function MediaPlatform() {
  const [selectedCategory, setSelectedCategory] = useState('destacado')
  const [selectedTab, setSelectedTab] = useState('tv')
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className=" bg-black text-white">
      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content */}
        <main className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-gray-900 relative">
            <video className="w-full h-full">
              <source src="" type="video/mp4" />
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
              <div className="text-gray-400">Ahora: 01:11 p.m.</div>
              <div className="flex items-center gap-2">
                <span>A continuación</span>
                <Button variant="ghost" size="sm" className="text-white">
                  Después <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {programs.map((program) => (
                <div key={program.id} className="flex gap-4 bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-48 h-28 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{program.channel}</h3>
                        <h4 className="text-sm text-gray-400">{program.title}</h4>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{program.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-400">{program.time}</span>
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