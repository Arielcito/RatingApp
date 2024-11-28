import type { Campaign } from '@/types/campaign'

export async function getActiveCampaigns(): Promise<Campaign[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/campaigns/listActive', {
    next: { revalidate: 300 } // Cache for 5 minutes
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns')
  }

  return response.json()
}

export function getAdvertisingImageURL(resourceName: string): string {
  return `http://ratingapp.net.ar:8000/advertising/${resourceName}`.trim()
} 