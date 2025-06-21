"use client";

import { useEffect, useState } from 'react';
import { MediaPlatform } from '@/components/media-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import { ServiceSkeleton } from '@/components/Servicios/service-skeleton';
import { useChannels } from '@/hooks/use-channels';
import { useCampaigns } from '@/hooks/use-campaigns';

export default function TvPage() {
  const { subscriber, isLoading: isSubscriberLoading } = useSubscriber();
  const { data, isLoading, error } = useChannels();
  const { data: campaigns } = useCampaigns();

  // Show skeleton while subscriber is loading or data is loading
  if (isSubscriberLoading || isLoading) {
    return <ServiceSkeleton />;
  }

  // Handle errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="text-red-500 text-xl font-semibold">Error</div>
        <div className="text-gray-400">{error.message}</div>
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

  return <MediaPlatform channels={data?.tvChannels || []} />;
} 