import AboutEnteprise from '@/components/AboutEnteprise';
import Blog from '@/components/Blog';
import Clients from '@/components/Clients'
import Contact from '@/components/Contact';
import CTA from '@/components/CTAEnterprise';
import FAQ from '@/components/FaqEnteprise';
import FeaturesEnterprise from '@/components/FeaturesEnterprise'
import FeaturesTab from '@/components/FeaturesTab';
import FunFact from '@/components/FunFact';
import HeroEnterprise from '@/components/HeroEnterprise'
import Integration from '@/components/Integration';
import Testimonial from '@/components/TestimonialEnterprise';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "RatingApp - Enterprise",
  description: "Rating App es una aplicacion para ganar premios mientras ves TV, radio y Streaming",
};

export default function page() {
  
  return (
    <main>
      <HeroEnterprise />
      <Clients />
      <FeaturesEnterprise />
      <AboutEnteprise />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Contact />
      <Blog />
    </main>
  )
}
