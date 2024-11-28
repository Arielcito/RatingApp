import type { Channel } from '@/types/channel'

export async function getTvChannels(): Promise<Channel[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.tvWebOnline === true || channel.tvWebURL !== null)
}

export async function getRadioChannels(): Promise<Channel[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.radioWebOnline === true || channel.radioWebURL !== null)
} 

export async function getStreamingChannels(): Promise<Channel[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.streaming === true || channel.streamingUrl !== null)
}
export const getOnlineNewsChannels = async (): Promise<Channel[]> => {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.onlineNews === true || channel.onlineNewsUrl !== null)
}
