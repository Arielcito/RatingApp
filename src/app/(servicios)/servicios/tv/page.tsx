"use client";

import { useEffect, useState } from 'react';
import { MediaPlatform } from '@/components/media-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";
import type { Channel } from '@/types/channel';

export default function TvPage() {
  const { subscriber } = useSubscriber();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch('https://ratingapp.net.ar:18000/ratingSignals/list');
        if (!response.ok) throw new Error('Error al cargar los canales');
        
        const data = await response.json();
        const tvChannels = data.filter((channel: Channel) => channel.tvWebURL !== null);
        setChannels(tvChannels);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching channels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (!subscriber) return null;
  if (isLoading) return <div>Cargando canales...</div>;
  if (error) return <div>Error: {error}</div>;

  return <MediaPlatform channels={channels} />;
} 