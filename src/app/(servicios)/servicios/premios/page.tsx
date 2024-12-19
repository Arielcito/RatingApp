import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premios | MediaStream',
  description: 'Sección de premios y reconocimientos',
}

export default function PremiosPage() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Próximamente
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Estamos trabajando para traerte contenido increíble
        </p>
      </div>
    </div>
  )
} 

// Componente comentado para futura implementación
// import { ActiveRewardsComponent } from '@/components/active-rewards'
// <ActiveRewardsComponent/> 