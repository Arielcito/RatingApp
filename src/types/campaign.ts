export interface Campaign {
  id: string
  title: string
  image_url: string
  uniqueId?: string
  name: string
}

export interface CampaignVideo {
  id?: number
  title?: string
  description?: string
  from_date?: string
  to_date?: string
  award_description?: string
  video_url?: string
  created?: string
  active?: boolean
} 