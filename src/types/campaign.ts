export interface Campaign {
  id: string | number
  title: string
  image_url: string
  uniqueId?: string
  name: string
  description?: string
  from_date?: string
  to_date?: string
  award_description?: string
  created?: string
  winner?: string
  active?: boolean
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