'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Campaign } from '@/types/campaign'
import { getActiveCampaigns, getAdvertisingImageURL } from '@/lib/api/campaign'

interface CampaignWithId extends Campaign {
  uniqueId: string
}

export function AdvertisingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [campaigns, setCampaigns] = useState<CampaignWithId[]>([])

  useEffect(() => {
    const loadCampaigns = async () => {
      const fetchedCampaigns = await getActiveCampaigns()
      if (fetchedCampaigns.length < 3) {
        const repeatedCampaigns: CampaignWithId[] = []
        let counter = 0
        while (repeatedCampaigns.length < 3) {
          repeatedCampaigns.push({
            ...fetchedCampaigns[counter % fetchedCampaigns.length],
            uniqueId: `${fetchedCampaigns[counter % fetchedCampaigns.length].id}-${counter}`
          })
          counter++
        }
        setCampaigns(repeatedCampaigns)
      } else {
        setCampaigns(fetchedCampaigns.map((campaign, index) => ({
          ...campaign,
          uniqueId: `${campaign.id}-${index}`
        })))
      }
    }
    loadCampaigns()
  }, [])

  useEffect(() => {
    if (!campaigns?.length) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % campaigns.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [campaigns?.length])

  if (!campaigns?.length) return null

  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 p-4">
        {[0, 1, 2].map((offset) => {
          const index = (currentIndex + offset) % campaigns.length
          const campaign = campaigns[index]
          return (
            <div key={campaign.uniqueId} className="relative aspect-[16/9]">
              <Image
                src={getAdvertisingImageURL(campaign.image_url)}
                alt={campaign.title}
                fill
                className="object-contain"
                priority={offset === 0}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
} 