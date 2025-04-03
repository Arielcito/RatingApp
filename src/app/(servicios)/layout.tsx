"use client";

import { Sidebar } from "@/components/Servicios/sidebar";
import { Header } from "@/components/Servicios/header";
import { useSubscriber } from "@/app/context/SubscriberContext";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import Script from "next/dist/client/script";
import { useEffect, useState } from "react";

export default function ServiciosRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { subscriber } = useSubscriber();
  const [isLoading, setIsLoading] = useState(true);

  // Add a small delay to ensure context is properly initialized
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Show a loading state instead of returning null
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-blacksection flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  // If no subscriber after loading, redirect to login
  if (!subscriber) {
    // Use window.location for a hard redirect instead of router.push
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  return (
    <div className="">
      <ThemeProvider
        attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <ToasterContext />
          <div className="min-h-screen bg-background dark:bg-blacksection">
            <Header />
            <div className="flex h-[calc(100vh-4rem)]">
              <Sidebar />
              <main className="flex-1 p-8 overflow-y-auto">
                {children}
              </main>
            </div>
        </div>
      </ThemeProvider>
    </div>
  );
} 