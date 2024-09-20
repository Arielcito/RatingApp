import type { Metadata } from "next";
import HeroArea from "@/components/HeroArea";
import Features from "@/components/Features";
import About from "@/components/About";
import WorkProcess from "@/components/WorkProcess";
import Pricing from "@/components/Pricing";
import Screens from "@/components/Screens";
import Cta from "@/components/Cta";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

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
      <Screens />
      <Cta />
      <Faq />
      <Contact />
    </>
  );
}
