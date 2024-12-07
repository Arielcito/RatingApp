import type { Metadata } from 'next'

import { ActiveRewardsComponent } from '@/components/active-rewards'

export const metadata: Metadata = {
  title: 'Premios | MediaStream',
  description: 'Sección de premios y reconocimientos',
}

export default function PremiosPage() {
  return (
    <div className="container mx-auto p-6">
      <ActiveRewardsComponent/>
    </div>
  )
} 