"use client";

import "../css/animate.css";
import "../css/style.css";
import type React from "react";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./context/AuthContext";
import ToasterContext from "./context/ToastContext";
import { SubscriberProvider } from "./context/SubscriberContext";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <AuthProvider>
            <SubscriberProvider>
              <ToasterContext />
              <NextTopLoader />
              {children}
            </SubscriberProvider>
          </AuthProvider>
  );
} 