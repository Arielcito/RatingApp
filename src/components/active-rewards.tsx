'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Reward {
  id: number
  title: string
  description: string
  endDate: Date
  image: string
  participants: number
  status: 'active' | 'completed'
}

const rewards: Reward[] = [
  {
    id: 1,
    title: "Suscripción Premium Gratis",
    description: "Participa y gana 3 meses de suscripción premium a nuestra plataforma",
    endDate: new Date('2024-04-30'),
    image: "/images/rewards/premium-subscription.jpg",
    participants: 156,
    status: 'active'
  },
  {
    id: 2,
    title: "Smart TV 55'",
    description: "Sorteamos una Smart TV Samsung 55' entre nuestros suscriptores",
    endDate: new Date('2024-05-15'),
    image: "/images/rewards/smart-tv.jpg",
    participants: 342,
    status: 'active'
  },
  {
    id: 3,
    title: "Entradas VIP Concierto",
    description: "Gana entradas VIP para el próximo concierto exclusivo",
    endDate: new Date('2024-04-20'),
    image: "/images/rewards/concert-tickets.jpg",
    participants: 89,
    status: 'active'
  }
]

interface RewardCardProps {
  reward: Reward
  isMain?: boolean
}

function formatTimeLeft(endDate: Date): string {
  const now = new Date()
  const timeLeft = endDate.getTime() - now.getTime()
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  return `${days}d ${hours}h restantes`
}

function RewardCard({ reward, isMain = false }: RewardCardProps) {
  return (
    <Card className={`
      relative overflow-hidden
      bg-white dark:bg-blacksection
      border border-stroke dark:border-strokedark
      hover:shadow-solid-3 transition-shadow
      ${isMain ? 'col-span-full' : ''}
    `}>
      <div className="relative h-48 md:h-64">
        <Image
          src={reward.image}
          alt={reward.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-3" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-itemtitle2 font-semibold text-black dark:text-white mb-2">
              {reward.title}
            </CardTitle>
            <CardDescription className="text-metatitle3 text-body dark:text-white/70">
              {reward.description}
            </CardDescription>
          </div>
          <Gift className="h-8 w-8 text-primary" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-meta" />
          <span className="text-sm text-meta font-medium">
            {formatTimeLeft(reward.endDate)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-meta/10 text-meta">
            {reward.participants} participantes
          </Badge>
          <Button className="bg-gradient-custom text-white hover:opacity-90">
            Participar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActiveRewardsComponent() {
  const [mainReward, ...otherRewards] = rewards

  return (
    <div className="space-y-8">
      <h2 className="text-sectiontitle2 font-bold text-black dark:text-white">
        Sorteos y Beneficios
      </h2>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RewardCard reward={mainReward} isMain={true} />
          {otherRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}