"use client";

import { IptvPlatform } from '@/components/iptv-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";

export default function TvPage() {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    return null;
  }

  return <IptvPlatform />;
} 