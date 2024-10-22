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

const MAINTENANCE_MODE = true; // Cambia esto a false cuando quieras desactivar el modo de mantenimiento

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
      <body suppressHydrationWarning={true}>
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
