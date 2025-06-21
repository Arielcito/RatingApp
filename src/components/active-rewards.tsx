'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Clock, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import api from '@/lib/axios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RewardCampaign {
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
  
  if (end <= now) return 'Finalizado'
  
  const diff = end.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) return `${days} días restantes`
  if (hours > 0) return `${hours} horas restantes`
  return 'Finaliza pronto'
}

interface RewardCardProps {
  campaign: RewardCampaign
  isMain?: boolean
  onClick: () => void
}

function RewardCard({ campaign, isMain = false, onClick }: RewardCardProps) {
  const isCaducado = campaign.id < 0

  return (
    <Card 
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white dark:bg-blacksection
        border border-stroke dark:border-strokedark
        hover:shadow-solid-3 transition-shadow
        ${isMain ? 'col-span-full' : ''}
        ${isCaducado ? 'opacity-75' : ''}
        cursor-pointer
      `}
    >
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

function CampaignModal({ campaign, isOpen, onClose }: { 
  campaign: RewardCampaign | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!campaign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="
        sm:max-w-[800px]
        bg-white dark:bg-blacksection
        border border-stroke dark:border-strokedark
      ">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-black dark:text-white">
              {campaign.title}
            </DialogTitle>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-body dark:text-white/70 hover:text-black dark:hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={getAdvertisingImageURL(campaign.image_url)}
              alt={campaign.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-meta" />
              <span className="text-lg text-meta font-medium">
                {formatTimeLeft(campaign.to_date)}
              </span>
            </div>

            <p className="text-lg text-body dark:text-white/70">
              {campaign.description}
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg bg-meta/10 text-meta">
                {campaign.award_description}
              </Badge>
              <Button 
                className="bg-gradient-custom text-white hover:opacity-90"
              >
                Participar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ActiveRewardsComponent() {
  const [campaigns, setCampaigns] = useState<RewardCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<RewardCampaign | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/campaigns/listActive')
        if (!response.data) throw new Error('Error al cargar las campañas')
        setCampaigns(response.data)
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
          {otherCampaigns.map((campaign) => (
            <RewardCard 
              key={campaign.id} 
              campaign={campaign}
              onClick={() => setSelectedCampaign(campaign)}
            />
          ))}
        </div>
      </ScrollArea>

      <CampaignModal
        campaign={selectedCampaign}
        isOpen={selectedCampaign !== null}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  )
}