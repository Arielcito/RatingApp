"use client";

import { useEffect, useState } from 'react';
import { useSubscriber } from "@/app/context/SubscriberContext";
import { getOnlineNewsChannels } from '@/lib/api/channels';
import { getActiveCampaigns } from '@/lib/api/campaign';
import type { Channel } from '@/types/channel';
import type { Campaign } from '@/types/campaign';
import { motion } from "framer-motion";
import Image from 'next/image';
import { getResourceURL } from '@/lib/utils';
import { AdvertisingBanner } from '@/components/advertising-banner';
import { useRouter } from 'next/navigation';
import { ServiceSkeleton } from '@/components/Servicios/service-skeleton';

export default function DiariosPage() {
  const { subscriber, isLoading: isSubscriberLoading } = useSubscriber();
  const [newspapers, setNewspapers] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const newsChannels = await getOnlineNewsChannels();
        console.log('Diarios disponibles:', newsChannels);
        setNewspapers(newsChannels);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error cargando datos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNewspaperClick = (newspaper: Channel) => {
    router.push(`/servicios/diarios/${newspaper.id}`);
  };

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

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Diarios Online</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newspapers.map((newspaper) => (
          <motion.div
            key={newspaper.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNewspaperClick(newspaper)}
          >
            <div className="relative h-48 w-full">
              {newspaper.iconUrl ? (
                <Image
                  src={getResourceURL(newspaper.iconUrl)}
                  alt={newspaper.name}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <span className="text-gray-400">{newspaper.name}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{newspaper.name}</h2>
              {newspaper.description && (
                <p className="text-gray-400 mt-2 line-clamp-2">{newspaper.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 