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
  const router = useRouter();

  useEffect(() => {
    if (!subscriber) {
      router.push("/auth/signin");
    }
  }, [subscriber, router]);

  if (!subscriber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-blacksection">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 