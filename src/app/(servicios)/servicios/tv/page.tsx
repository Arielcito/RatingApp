"use client";

import { useEffect, useState } from 'react';
import { MediaPlatform } from '@/components/media-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";
import { getTvChannels } from '@/lib/api/channels';
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import { getActiveCampaigns } from '@/lib/api/campaign';

export default function TvPage() {
  const { subscriber } = useSubscriber();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  useEffect(() => {
    const loadChannels = async () => {
      try {
        const tvChannels = await getTvChannels();
        const campaigns = await getActiveCampaigns();
        setChannels(tvChannels);
        setCampaigns(campaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching channels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChannels();
  }, []);

  if (!subscriber) return null;
  if (isLoading) return <div>Cargando canales...</div>;
  if (error) return <div>Error: {error}</div>;

  return <MediaPlatform channels={channels} />;
} 