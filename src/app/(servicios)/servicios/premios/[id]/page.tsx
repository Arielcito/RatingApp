import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import api from '@/lib/axios'

async function getCampaign(id: string) {
  try {
    const response = await api.get(`/campaigns/${id}`)
    if (!response.data) throw new Error('Error al cargar la campaña')
    return response.data
  } catch (error) {
    return null
  }
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

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id)
  
  if (!campaign) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/servicios/premios" 
        className="flex items-center gap-2 text-meta hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a sorteos
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={getAdvertisingImageURL(campaign.image_url)}
            alt={campaign.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            {campaign.title}
          </h1>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-meta" />
            <span className="text-lg text-meta font-medium">
              {formatTimeLeft(campaign.to_date)}
            </span>
          </div>

          <p className="text-lg text-body dark:text-white/70">
            {campaign.description}
          </p>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg bg-meta/10 text-meta">
              {campaign.award_description}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
} 