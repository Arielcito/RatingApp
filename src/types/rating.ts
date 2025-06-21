export interface DetailRecordRequest {
  ratingSignalId?: number;
  latitude?: number;
  longitude?: number;
  action?: number; // 0: stop, 1: play
  id?: number;
}

export interface RatingRecord {
  id?: number;
  channelId: number;
  channelName: string;
  action: 'play' | 'stop';
  timestamp: string;
  latitude?: number;
  longitude?: number;
}

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
} 