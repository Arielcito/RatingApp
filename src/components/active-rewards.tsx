'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Campaign {
  id: number
  title: string
  description: string
  from_date: string
  to_date: string
  award_description: string
  image_url: string
  created: string
  winner: string
  active: boolean
}

function getAdvertisingImageURL(resourceName: string) {
  return `http://ratingapp.net.ar:8000/advertising/${resourceName}`.trim()
}

function formatTimeLeft(endDate: string): string {
  const now = new Date()
  const end = new Date(endDate)
  const timeLeft = end.getTime() - now.getTime()
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  return `${days}d ${hours}h restantes`
}

interface RewardCardProps {
  campaign: Campaign
  isMain?: boolean
}

function RewardCard({ campaign, isMain = false }: RewardCardProps) {
  const isCaducado = campaign.id < 0

  return (
    <Card className={`
      relative overflow-hidden
      bg-white dark:bg-blacksection
      border border-stroke dark:border-strokedark
      hover:shadow-solid-3 transition-shadow
      ${isMain ? 'col-span-full' : ''}
      ${isCaducado ? 'opacity-75' : ''}
    `}>
      <div className="relative h-48 md:h-64">
        <Image
          src={getAdvertisingImageURL(campaign.image_url)}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-3" />
        {isCaducado && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg">
              Caducado
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-itemtitle2 font-semibold text-black dark:text-white mb-2">
              {campaign.title}
            </CardTitle>
            <CardDescription className="text-metatitle3 text-body dark:text-white/70">
              {campaign.description}
            </CardDescription>
          </div>
          <Gift className="h-8 w-8 text-primary" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-meta" />
          <span className="text-sm text-meta font-medium">
            {formatTimeLeft(campaign.to_date)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-meta/10 text-meta">
            {campaign.award_description}
          </Badge>
          <Button 
            className={`
              bg-gradient-custom text-white 
              ${isCaducado ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            `}
            disabled={isCaducado}
          >
            {isCaducado ? 'Finalizado' : 'Participar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActiveRewardsComponent() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://ratingapp.net.ar:18000/campaigns/listActive')
        if (!response.ok) throw new Error('Error al cargar las campañas')
        const data: Campaign[] = await response.json()
        setCampaigns(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  if (loading) return <div>Cargando sorteos...</div>
  if (error) return <div>Error: {error}</div>
  if (!campaigns || campaigns.length === 0) return <div>No hay sorteos activos</div>

  const [mainCampaign, ...otherCampaigns] = campaigns

  return (
    <div className="space-y-8">
      <h2 className="text-sectiontitle2 font-bold text-black dark:text-white">
        Sorteos y Beneficios
      </h2>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainCampaign && <RewardCard campaign={mainCampaign} isMain={true} />}
          {otherCampaigns.map((campaign) => (
            <RewardCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}