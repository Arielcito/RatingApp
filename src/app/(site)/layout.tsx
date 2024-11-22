"use client";

import type React from "react";
import { useEffect, useState } from "react";
import PreLoader from "@/components/PreLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { usePathname } from "next/navigation";
import ToasterContext from "../context/ToastContext";
import { ThemeProvider } from "next-themes";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const pathUrl = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Verificar si estamos en una ruta de estudio
  const isStudioRoute = pathUrl?.startsWith('/(studio)');

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
          >
            <ToasterContext />
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
          <ScrollToTop />
        </>
      )}
    </>
  );
}
