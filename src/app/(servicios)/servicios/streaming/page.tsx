"use client";

import { useEffect, useState } from 'react';
import { useSubscriber } from "@/app/context/SubscriberContext";
import { getRadioChannels, getStreamingChannels } from '@/lib/api/channels';
import { getActiveCampaigns } from '@/lib/api/campaign';
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import { StreamingPlatform } from '@/components/streaming-platform';
import { ServiceSkeleton } from '@/components/Servicios/service-skeleton';

export default function StreamingPage() {
  const { subscriber, isLoading: isSubscriberLoading } = useSubscriber();
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

  // Show skeleton while subscriber is loading or data is loading
  if (isSubscriberLoading || isLoading) {
    return <ServiceSkeleton />;
  }

  // Handle errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="text-red-500 text-xl font-semibold">Error</div>
        <div className="text-gray-400">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // If no subscriber, the layout will handle the redirect
  if (!subscriber) return null;

  return <StreamingPlatform channels={channels} />;
} 