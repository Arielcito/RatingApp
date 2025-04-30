import type { Channel } from '@/types/channel'
import api from '../axios'
import { useQuery } from '@tanstack/react-query'

const fetchAllChannels = async (): Promise<Channel[]> => {
  const { data } = await api.get('/ratingSignals/list')
  return data
}

export async function getTvChannels(): Promise<Channel[]> {
  const data = await fetchAllChannels()
  return data.filter((channel: Channel) => channel.tvWebOnline === true || channel.tvWebURL !== null)
}

export async function getRadioChannels(): Promise<Channel[]> {
  const data = await fetchAllChannels()
  return data.filter((channel: Channel) => channel.radioWebOnline === true || channel.radioWebURL !== null)
} 

export async function getStreamingChannels(): Promise<Channel[]> {
  const data = await fetchAllChannels()
  return data.filter((channel: Channel) => channel.streaming === true || channel.streamingUrl !== null)
}

export const getOnlineNewsChannels = async (): Promise<Channel[]> => {
  const data = await fetchAllChannels()
  return data.filter((channel: Channel) => channel.onlineNews === true || channel.onlineNewsUrl !== null)
}

// React Query hooks
export const useChannels = () => {
  const { data: allChannels, isLoading, error } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchAllChannels,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const tvChannels = allChannels?.filter((channel: Channel) => channel.tvWebOnline === true || channel.tvWebURL !== null)
  const radioChannels = allChannels?.filter((channel: Channel) => channel.radioWebOnline === true || channel.radioWebURL !== null)
  const streamingChannels = allChannels?.filter((channel: Channel) => channel.streaming === true || channel.streamingUrl !== null)
  const onlineNewsChannels = allChannels?.filter((channel: Channel) => channel.onlineNews === true || channel.onlineNewsUrl !== null)

  return {
    allChannels,
    tvChannels,
    radioChannels,
    streamingChannels,
    onlineNewsChannels,
    isLoading,
    error
  }
}
