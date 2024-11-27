"use client";

import "../../css/animate.css";
import "../../css/style.css";
import type React from "react";
import { useEffect, useState } from "react";
import PreLoader from "@/components/PreLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "../context/AuthContext";
import ToasterContext from "../context/ToastContext";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import MaintenancePage from "@/components/MaintenancePage";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const MAINTENANCE_MODE = false; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const pathUrl = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Verificar si estamos en una ruta de estudio
  const isStudioRoute = pathUrl?.startsWith('/(studio)');

  if (isStudioRoute) {
    // Si es una ruta de estudio, solo renderizar los children sin el layout completo
    return <>{children}</>;
  }

  // Para otras rutas, mantener el layout existente
  return (
    <html lang="es">
      <head>
        <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="afterInteractive" />
        <Script src="https://files.bpcontent.cloud/2024/11/14/05/20241114055043-G6VW4DG1.js" strategy="afterInteractive" />
      </head>
      <body suppressHydrationWarning={true}>
        <Analytics />
        <SpeedInsights />
        <NextTopLoader
          color="#006BFF"
          crawlSpeed={300}
          showSpinner={false}
          shadow="none"
        />

        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="dark"
        >
          <AuthProvider>
            {loading ? (
              <PreLoader />
            ) : MAINTENANCE_MODE ? (
              <MaintenancePage />
            ) : (
              <>
                <Header />
                <ToasterContext />
                <main>{children}</main>
                <Footer />
                <ScrollToTop />
              </>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
