"use client";

import React from 'react';
import { Sidebar } from "@/components/Servicios/sidebar";
import { Header } from "@/components/Servicios/header";
import { useSubscriber } from "@/app/context/SubscriberContext";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import { useChannels } from '@/hooks/use-channels';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Channel } from '@/types/channel';

interface SidebarProps {
  channels: Channel[];
}

export default function ServiciosRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  })
  
  const { subscriber, isLoading } = useSubscriber();

  console.log('🔍 Estado del layout de servicios:', { subscriber: !!subscriber, isLoading });

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-blacksection flex items-center justify-center">
        <div className="animate-pulse text-white">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="mt-4 text-center">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // If no subscriber after loading, redirect to login
  if (!subscriber) {
    console.log('❌ No hay subscriber después de cargar, redirigiendo a login');
    // Use window.location for a hard redirect instead of router.push
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  console.log('✅ Subscriber encontrado, renderizando layout de servicios');

  return (
    <div className="">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
      >
        <QueryClientProvider client={queryClient}>
          <ToasterContext />
          <div className="min-h-screen bg-background dark:bg-blacksection flex flex-col">
            <div className="sticky top-0 z-10 bg-background dark:bg-blacksection">
              <Header />
            </div>
            <div className="flex flex-1 h-[calc(100vh-4rem)]">
              <ChannelsProvider>
                <Sidebar channels={[]} />
              </ChannelsProvider>
              <main className="flex-1 p-8">
                {children}
              </main>
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

// Channels Provider Component
function ChannelsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useChannels();
  const channels = data?.allChannels || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-blacksection flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background dark:bg-blacksection flex items-center justify-center">
        <div className="text-red-500">Error al cargar los canales</div>
      </div>
    );
  }

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement<SidebarProps>(child)) {
          return React.cloneElement(child, { channels });
        }
        return child;
      })}
    </>
  );
} 