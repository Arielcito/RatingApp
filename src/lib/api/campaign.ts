import type { Campaign } from '@/types/campaign'
import api from '@/lib/axios'

export async function getActiveCampaigns(): Promise<Campaign[]> {
  const response = await api.get('/campaigns/listActive')
  
  if (!response.data) {
    throw new Error('Failed to fetch campaigns')
  }

  return response.data
}

export function getAdvertisingImageURL(resourceName: string): string {
  return `http://ratingapp.net.ar:8000/advertising/${resourceName}`.trim()
} 