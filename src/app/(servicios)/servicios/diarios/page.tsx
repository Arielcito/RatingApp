"use client";

import { IptvPlatform } from '@/components/iptv-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";

const diarios = ['El País', 'El Observador', 'La Diaria', 'Búsqueda', 'Brecha'];

export default function DiariosPage() {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    return null;
  }

  return <IptvPlatform serviceType="diarios" channels={diarios} />;
} 