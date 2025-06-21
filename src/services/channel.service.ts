import api from '@/lib/axios'
import type { Channel } from '@/types/channel'

export class ChannelService {
  static async fetchAllChannels(): Promise<Channel[]> {
    const { data } = await api.get('/ratingSignals/list')
    return data
  }

  static async getTvChannels(): Promise<Channel[]> {
    const data = await this.fetchAllChannels()
    return data.filter((channel: Channel) => channel.tvWebOnline === true || channel.tvWebURL !== null)
  }

  static async getRadioChannels(): Promise<Channel[]> {
    const data = await this.fetchAllChannels()
    return data.filter((channel: Channel) => channel.radioWebOnline === true || channel.radioWebURL !== null)
  }

  static async getStreamingChannels(): Promise<Channel[]> {
    const data = await this.fetchAllChannels()
    return data.filter((channel: Channel) => channel.streaming === true || channel.streamingUrl !== null)
  }

  static async getOnlineNewsChannels(): Promise<Channel[]> {
    const data = await this.fetchAllChannels()
    return data.filter((channel: Channel) => channel.onlineNews === true || channel.onlineNewsUrl !== null)
  }

  static async getAllChannels(): Promise<{
    allChannels: Channel[],
    tvChannels: Channel[],
    radioChannels: Channel[],
    streamingChannels: Channel[],
    onlineNewsChannels: Channel[]
  }> {
    const allChannels = await this.fetchAllChannels()
    
    return {
      allChannels,
      tvChannels: allChannels.filter(channel => channel.tvWebOnline === true || channel.tvWebURL !== null),
      radioChannels: allChannels.filter(channel => channel.radioWebOnline === true || channel.radioWebURL !== null),
      streamingChannels: allChannels.filter(channel => channel.streaming === true || channel.streamingUrl !== null),
      onlineNewsChannels: allChannels.filter(channel => channel.onlineNews === true || channel.onlineNewsUrl !== null)
    }
  }
} 