"use client";

import { IptvPlatform } from '@/components/iptv-platform';
import { useSubscriber } from "@/app/context/SubscriberContext";

const radioChannels = ['Radio Carve', 'Radio Sarandí', 'Radio Universal', 'Radio Del Sol', 'Radio Rural'];

export default function RadioPage() {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    return null;
  }

  return <IptvPlatform serviceType="radio" channels={radioChannels} />;
} 