"use client";

import { useState } from 'react';
import { useSubscriber } from "@/app/context/SubscriberContext";
import type { Channel } from '@/types/channel';
import { motion } from "framer-motion";
import { getResourceURL } from '@/lib/utils';
import { AdvertisingBanner } from '@/components/advertising-banner';
import { useRouter } from 'next/navigation';
import { ServiceSkeleton } from '@/components/Servicios/service-skeleton';
import { useOnlineNewsChannels } from '@/hooks/use-channels';
import { RemoteImage } from '@/components/ui/remote-image';

export default function DiariosPage() {
  const { subscriber, isLoading: isSubscriberLoading } = useSubscriber();
  const [displayLimit, setDisplayLimit] = useState(6);
  const router = useRouter();
  const { data: newspapers = [], isLoading, error } = useOnlineNewsChannels();

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

  const handleNewspaperClick = (newspaper: Channel) => {
    router.push(`/servicios/diarios/${newspaper.id}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Diarios Online</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newspapers.slice(0, displayLimit).map((newspaper) => (
          <motion.div
            key={newspaper.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNewspaperClick(newspaper)}
          >
            <div className="relative h-48 w-full">
              {newspaper.iconUrl ? (
                <RemoteImage
                  src={getResourceURL(newspaper.iconUrl)}
                  alt={newspaper.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fallbackText={newspaper.name}
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

      {newspapers.length > displayLimit && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setDisplayLimit(prev => prev + 6)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Ver más diarios
          </button>
        </div>
      )}
    </div>
  );
} 