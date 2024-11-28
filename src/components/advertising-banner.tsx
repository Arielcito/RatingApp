'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Campaign } from '@/types/campaign'
import { getAdvertisingImageURL } from '@/lib/api/campaign'

interface AdvertisingBannerProps {
  campaigns: Campaign[]
}

export function AdvertisingBanner({ campaigns }: AdvertisingBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

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
    <div className="w-full bg-gray-900 p-4">
      <div className="relative aspect-[21/9] max-w-4xl mx-auto">
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