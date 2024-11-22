"use client";

import { IptvPlatform } from '@/components/iptv-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";

const streamingServices = ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Star+'];

export default function StreamingPage() {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    return null;
  }

  return <IptvPlatform serviceType="streaming" channels={streamingServices} />;
} 