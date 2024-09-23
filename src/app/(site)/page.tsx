import type { Metadata } from "next";
import HeroArea from "@/components/HeroArea";
import Features from "@/components/Features";
import About from "@/components/About";
import WorkProcess from "@/components/WorkProcess";
import Screens from "@/components/Screens";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import BusinessPartnership from "@/components/BusinessPartnership";
import Blog from "@/components/Blog";

export const metadata: Metadata = {
  title: "RatingApp - Somos Todos",
  description: "Rating App es una aplicacion para ganar premios mientras ves TV, radio y Streaming",
};

export default function Home() {
  return (
    <>
      <HeroArea />
      <Clients />
      <Features />
      <About />
      <WorkProcess />
      <BusinessPartnership />
      <Cta />
      <Faq />
      <Blog />
      <Contact />
    </>
  );
}
