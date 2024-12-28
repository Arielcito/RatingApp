import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Premio no encontrado</h2>
      <p className="mb-4">El premio que buscas no existe o ha sido eliminado.</p>
      <Link 
        href="/servicios/premios"
        className="text-primary hover:underline"
      >
        Volver a sorteos
      </Link>
    </div>
  )
} 