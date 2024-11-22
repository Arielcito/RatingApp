import type { Channel } from '@/types/channel'

export async function getTvChannels(): Promise<Channel[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.tvWebOnline === true)
}

export async function getRadioChannels(): Promise<Channel[]> {
  const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list')
  if (!response.ok) throw new Error('Error al cargar los canales')
  
  const data = await response.json()
  return data.filter((channel: Channel) => channel.radioWebOnline === true)
} 