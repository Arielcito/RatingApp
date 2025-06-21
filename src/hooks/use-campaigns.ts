import { useQuery } from '@tanstack/react-query'
import { getActiveCampaigns } from '@/lib/api/campaign'
import type { Campaign } from '@/types/campaign'

export function useCampaigns() {
  return useQuery<Campaign[], Error>({
    queryKey: ['campaigns'],
    queryFn: getActiveCampaigns,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
} 