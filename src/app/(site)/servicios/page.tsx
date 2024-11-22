import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - Rating App",
  description: "Plataforma de servicios de Rating App",
};

export default function ServiciosPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-white">Bienvenido a Rating App</h1>
      <p className="text-gray-400">
        Selecciona un servicio del menú lateral para comenzar.
      </p>
    </div>
  );
} 