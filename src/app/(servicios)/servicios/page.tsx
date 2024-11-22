"use client";

import { useSubscriber } from "@/app/context/SubscriberContext";

export default function ServiciosPage() {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-white">Bienvenido a Rating App</h1>
      <p className="text-gray-400">
        Bienvenido {subscriber.name}
      </p>
    </div>
  );
} 