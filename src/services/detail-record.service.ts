import { DetailRecordRequest, RatingRecord, GeolocationPosition } from '@/types/rating';
import api from '@/lib/axios'

export class DetailRecordService {
  private static getAuthToken(): string | null {
    // Get token from localStorage or session storage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
    return null;
  }

  static async sendDetailRecord(request: DetailRecordRequest): Promise<void> {
    console.log('Sending detail record for rating tracking', request);
    
    const token = this.getAuthToken();
    if (!token) {
      console.warn('No auth token found, cannot send rating data');
      return;
    }

    try {
      const response = await api.post('/detailRecord/add', {
        request,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Rating data sent successfully', response.data);
    } catch (error) {
      console.error('Error sending rating data:', error);
      // Don't throw the error to avoid breaking the user experience
    }
  }

  static async getCurrentLocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation obtained for rating tracking');
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Error getting geolocation:', error.message);
          resolve(null);
        },
        {
          timeout: 5000,
          maximumAge: 300000, // 5 minutes
          enableHighAccuracy: false,
        }
      );
    });
  }

  static async trackChannelAction(
    channelId: number,
    action: 'play' | 'stop',
    recordId?: number
  ): Promise<void> {
    console.log(`Tracking channel action: ${action} for channel ${channelId}`);
    
    const location = await this.getCurrentLocation();
    
    const request: DetailRecordRequest = {
      ratingSignalId: channelId,
      action: action === 'play' ? 1 : 0,
      id: recordId,
      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    };

    await this.sendDetailRecord(request);
  }
}
