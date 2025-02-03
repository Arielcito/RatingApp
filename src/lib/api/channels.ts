import type { Channel } from '@/types/channel'
import api from '../axios'

export async function getTvChannels(): Promise<Channel[]> {
  const { data } = await api.get('/ratingSignals/list')
  return data.filter((channel: Channel) => channel.tvWebOnline === true || channel.tvWebURL !== null)
}

export async function getRadioChannels(): Promise<Channel[]> {
  const { data } = await api.get('/ratingSignals/list')
  return data.filter((channel: Channel) => channel.radioWebOnline === true || channel.radioWebURL !== null)
} 

export async function getStreamingChannels(): Promise<Channel[]> {
  const { data } = await api.get('/ratingSignals/list')
  return data.filter((channel: Channel) => channel.streaming === true || channel.streamingUrl !== null)
}

export const getOnlineNewsChannels = async (): Promise<Channel[]> => {
  const { data } = await api.get('/ratingSignals/list')
  return data.filter((channel: Channel) => channel.onlineNews === true || channel.onlineNewsUrl !== null)
}
