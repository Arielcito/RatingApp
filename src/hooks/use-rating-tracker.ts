import { useCallback, useRef } from 'react';
import { DetailRecordService } from '@/services/detail-record.service';
import type { Channel } from '@/types/channel';

export interface UseRatingTrackerOptions {
  enabled?: boolean;
  debounceMs?: number;
}

export function useRatingTracker(options: UseRatingTrackerOptions = {}) {
  const { enabled = true, debounceMs = 1000 } = options;
  const currentChannelRef = useRef<Channel | null>(null);
  const recordIdRef = useRef<number | undefined>(undefined);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const trackPlay = useCallback(async (channel: Channel) => {
    if (!enabled) return;

    console.log('Tracking play action for rating measurement', { channelId: channel.id, channelName: channel.name });

    // Clear any pending debounced calls
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // If switching channels, stop the previous one first
    if (currentChannelRef.current && currentChannelRef.current.id !== channel.id) {
      await DetailRecordService.trackChannelAction(
        currentChannelRef.current.id,
        'stop',
        recordIdRef.current
      );
    }

    // Track the new play action
    currentChannelRef.current = channel;
    await DetailRecordService.trackChannelAction(channel.id, 'play', recordIdRef.current);
  }, [enabled]);

  const trackStop = useCallback(async (channel: Channel) => {
    if (!enabled) return;

    console.log('Tracking stop action for rating measurement', { channelId: channel.id, channelName: channel.name });

    // Debounce stop actions to avoid too many calls
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      await DetailRecordService.trackChannelAction(channel.id, 'stop', recordIdRef.current);
      currentChannelRef.current = null;
    }, debounceMs);
  }, [enabled, debounceMs]);

  const trackChannelChange = useCallback(async (oldChannel: Channel | null, newChannel: Channel) => {
    if (!enabled) return;

    console.log('Tracking channel change for rating measurement', { 
      oldChannelId: oldChannel?.id, 
      newChannelId: newChannel.id,
      newChannelName: newChannel.name 
    });

    // Stop tracking the old channel
    if (oldChannel) {
      await DetailRecordService.trackChannelAction(oldChannel.id, 'stop', recordIdRef.current);
    }

    // Start tracking the new channel
    currentChannelRef.current = newChannel;
    await DetailRecordService.trackChannelAction(newChannel.id, 'play', recordIdRef.current);
  }, [enabled]);

  const cleanup = useCallback(async () => {
    console.log('Cleaning up rating tracker');
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (currentChannelRef.current) {
      await DetailRecordService.trackChannelAction(
        currentChannelRef.current.id,
        'stop',
        recordIdRef.current
      );
    }

    currentChannelRef.current = null;
  }, []);

  return {
    trackPlay,
    trackStop,
    trackChannelChange,
    cleanup,
    currentChannel: currentChannelRef.current,
  };
} 