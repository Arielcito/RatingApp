"use client";

import { useEffect, useState } from 'react';
import { useSubscriber } from "@/app/context/SubscriberContext";
import { getRadioChannels, getStreamingChannels } from '@/lib/api/channels';
import { getActiveCampaigns } from '@/lib/api/campaign';
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import { StreamingPlatform } from '@/components/streaming-platform';

export default function StreamingPage() {
  const { subscriber } = useSubscriber();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [streamingChannels, activeCampaigns] = await Promise.all([
          getStreamingChannels(),
          getActiveCampaigns()
        ]);
        setChannels(streamingChannels);
        setCampaigns(activeCampaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error loading streaming data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (!subscriber) return null;
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"/>
    </div>
  );
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return <StreamingPlatform channels={channels} />;
} 