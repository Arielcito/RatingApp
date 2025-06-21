import { useQuery } from '@tanstack/react-query'
import { ChannelService } from '@/services/channel.service'
import type { Channel } from '@/types/channel'

export const QUERY_KEYS = {
  channels: {
    all: ['channels'] as const,
  },
}

export function useChannels() {
  return useQuery<{
    allChannels: Channel[],
    tvChannels: Channel[],
    radioChannels: Channel[],
    streamingChannels: Channel[],
    onlineNewsChannels: Channel[]
  }, Error>({
    queryKey: QUERY_KEYS.channels.all,
    queryFn: () => ChannelService.getAllChannels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Hooks específicos que utilizan el resultado de useChannels
export function useTvChannels() {
  const { data, isLoading, error } = useChannels()
  return {
    data: data?.tvChannels || [],
    isLoading,
    error
  }
}

export function useRadioChannels() {
  const { data, isLoading, error } = useChannels()
  return {
    data: data?.radioChannels || [],
    isLoading,
    error
  }
}

export function useStreamingChannels() {
  const { data, isLoading, error } = useChannels()
  return {
    data: data?.streamingChannels || [],
    isLoading,
    error
  }
}

export function useOnlineNewsChannels() {
  const { data, isLoading, error } = useChannels()
  return {
    data: data?.onlineNewsChannels || [],
    isLoading,
    error
  }
} 