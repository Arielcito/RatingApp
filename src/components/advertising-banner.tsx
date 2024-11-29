'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Campaign } from '@/types/campaign'
import { getActiveCampaigns, getAdvertisingImageURL } from '@/lib/api/campaign'

interface AdvertisingBannerProps {
  campaigns: Campaign[]
}

export function AdvertisingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  useEffect(() => {
    const loadCampaigns = async () => {
      const campaigns = await getActiveCampaigns()
      setCampaigns(campaigns)
    }
    loadCampaigns()
  }, [])

  useEffect(() => {
    if (!campaigns?.length) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % campaigns.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [campaigns?.length])

  if (!campaigns?.length) return null

  const currentCampaign = campaigns[currentIndex]

  return (
    <div className="w-full bg-gray-900">
      <div className="relative aspect-[16/9] max-w-sm mx-auto">
        <Image
          src={getAdvertisingImageURL(currentCampaign.image_url)}
          alt={currentCampaign.title}
          fill
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  )
} 