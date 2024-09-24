import Clients from '@/components/Clients'
import FeaturesEnterprise from '@/components/FeaturesEnterprise'
import HeroEnterprise from '@/components/HeroEnterprise'
import React from 'react'

export default function page() {
  return (
    <main>
      <HeroEnterprise />
      <Clients />
      <FeaturesEnterprise />
    </main>
  )
}
