"use client";

import { Sidebar } from "@/components/Servicios/sidebar";
import { Header } from "@/components/Servicios/header";
import { useSubscriber } from "@/app/context/SubscriberContext";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import Script from "next/dist/client/script";

export default function ServiciosRootLayout({
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
    <div className="overflow-hidden">
      <ThemeProvider
        attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <ToasterContext />
          <div className="min-h-screen bg-background dark:bg-blacksection overflow-hidden">
            <Header />
            <div className="flex h-[calc(100vh-4rem)]">
              <Sidebar />
              <main className="flex-1 p-8 ">
                {children}
              </main>
            </div>
        </div>
      </ThemeProvider>
    </div>
  );
} 