import api from '@/lib/axios'
import type { CampaignVideo } from '@/types/campaign'

export const campaignService = {
  async listVideos(): Promise<CampaignVideo[]> {
    console.log("Logging API call to fetch all campaign videos from /campaigns/listVideos");
    const response = await api.get('/campaigns/listVideos')
    console.log("Logging campaign videos response data", response.data);
    return response.data
  },

  async listActiveVideos(): Promise<CampaignVideo[]> {
    console.log("Logging API call to fetch active campaign videos from /campaigns/listActiveVideos");
    const response = await api.get('/campaigns/listActiveVideos')
    console.log("Logging active campaign videos response data", response.data);
    return response.data
  }
} 