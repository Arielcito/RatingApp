"use client";

import { Sidebar } from "@/components/Servicios/sidebar";
import { Header } from "@/components/Servicios/header";
import { useSubscriber } from "@/app/context/SubscriberContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { subscriber } = useSubscriber();

  if (!subscriber) {
    console.log('⏳ ServiciosLayout - Renderizando null mientras se verifica subscriber');
    return null;
  }

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-background dark:bg-blacksection">
          <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
        </div>
        </div>
      </body>
    </html>
  );
} 