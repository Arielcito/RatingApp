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
import { useRouter } from 'next/navigation'

export default function DiariosPage() {
  const { subscriber } = useSubscriber();
  const [newspapers, setNewspapers] = useState<Channel[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [newsChannels, activeCampaigns] = await Promise.all([
          getOnlineNewsChannels(),
          getActiveCampaigns()
        ]);
        console.log('Diarios disponibles:', newsChannels);
        setNewspapers(newsChannels);
        setCampaigns(activeCampaigns);
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
    router.push(`/servicios/diarios/${newspaper.id}`)
  }

  if (!subscriber) return null;
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"/>
    </div>
  );
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Diarios Digitales</h1>
      
      {/* Newspaper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newspapers.map((newspaper, index) => (
          <motion.div
            key={newspaper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleNewspaperClick(newspaper)}
          >
            <div className="block h-full">
              <div className="relative h-48">
                <Image
                  src={newspaper.iconUrl ? getResourceURL(newspaper.iconUrl) : '/newspaper-placeholder.png'}
                  alt={newspaper.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{newspaper.name}</h2>
                <p className="text-gray-600 mb-4">{newspaper.description || 'Diario digital'}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{newspaper.localidad}</span>
                  <span className="mx-2">•</span>
                  <span>{newspaper.provincia}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  Leer ahora
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advertising Banner */}
      <div className="mt-8">
        <AdvertisingBanner campaigns={campaigns} />
      </div>
    </div>
  );
} 