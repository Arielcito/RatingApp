"use client";

import "../../css/animate.css";
import "../../css/style.css";
import React, { useEffect, useState } from "react";
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
import { SubscriberProvider } from "../context/SubscriberContext";

const MAINTENANCE_MODE = false; // Cambia esto a false cuando quieras desactivar el modo de mantenimiento

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
    <html lang="es" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <AuthProvider>
            <SubscriberProvider>
              <ToasterContext />
              <NextTopLoader />
              <Header />
              <main>{children}</main>
              <Footer />
              <ScrollToTop />
            </SubscriberProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
