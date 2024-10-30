import type { Metadata } from "next";
import HeroArea from "@/components/HeroArea";
import Features from "@/components/Features";
import About from "@/components/About";
import WorkProcess from "@/components/WorkProcess";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Clients from "@/components/Clients";
import BusinessPartnership from "@/components/BusinessPartnership";
import MaintenancePage from "@/components/MaintenancePage";
import Blog from "@/components/Blog";

export const metadata: Metadata = {
  title: "RatingApp - Somos Todos",
  description: "Rating App es una aplicacion para ganar premios mientras ves TV, radio y Streaming",
};

const MAINTENANCE_MODE = false; // Cambia esto a false cuando quieras desactivar el modo de mantenimiento

export default function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return (
    <>
      <HeroArea />
      <Clients />
      <Features />
      <About />
      <WorkProcess />
      <BusinessPartnership />
      <Blog/>
      <Cta />
      <Faq />
    </>
  );
}
