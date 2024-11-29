"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, usePathname } from "next/navigation";
import { Tv, Radio, Laptop, Newspaper, ChevronLeft, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocations } from "@/hooks/use-locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: 'destacado', name: 'Destacado', icon: Tv, path: '/servicios/tv' },
  { id: 'tv', name: 'Televisión', icon: Tv, path: '/servicios/tv' },
  { id: 'peliculas', name: 'Películas', icon: Laptop, path: '/servicios/streaming' },
  { id: 'series', name: 'Series', icon: Laptop, path: '/servicios/streaming' },
  { id: 'radio', name: 'Radio', icon: Radio, path: '/servicios/radio' },
  { id: 'noticias', name: 'Noticias', icon: Newspaper, path: '/servicios/diarios' }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('destacado');
  const { locations, isLoading: locationsLoading } = useLocations();
  const [selectedProvincia, setSelectedProvincia] = useState<string | null>(null);
  const [selectedLocalidad, setSelectedLocalidad] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const provincias = [...new Set(locations.map(loc => loc.provincia))].sort();
  const localidades = locations
    .filter(loc => !selectedProvincia || loc.provincia === selectedProvincia)
    .map(loc => loc.localidad)
    .sort();

  const handleProvinciaChange = (value: string | null) => {
    setSelectedProvincia(value);
    setSelectedLocalidad(null);
    
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('provincia', value);
    } else {
      params.delete('provincia');
    }
    params.delete('localidad');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLocalidadChange = (value: string | null) => {
    setSelectedLocalidad(value);
    
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('localidad', value);
    } else {
      params.delete('localidad');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const onCategoryChange = (category: typeof categories[0]) => {
    setSelectedCategory(category.id);
    router.push(category.path);
  };

  return (
    <aside className={cn(
      "w-64 border-r border-gray-800 transition-all duration-200",
      !isOpen && "w-20"
    )}>
      <ScrollArea className="h-full">
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full justify-end p-2 mb-4 text-white"
            aria-label={isOpen ? "Colapsar menú" : "Expandir menú"}
          >
            <ChevronLeft className={cn(
              "h-6 w-6 transition-transform duration-200",
              !isOpen && "rotate-180"
            )} />
          </Button>
{/* Filtros de ubicación */}
{isOpen && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <MapPin className="h-5 w-5" />
                <span>Filtrar por ubicación</span>
              </div>

              <Select
                value={selectedProvincia || undefined}
                onValueChange={handleProvinciaChange}
              >
                <SelectTrigger className="w-full bg-gray-800 text-white">
                  <SelectValue placeholder="Provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las provincias</SelectItem>
                  {provincias.map((provincia) => (
                    <SelectItem key={provincia} value={provincia}>
                      {provincia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocalidad || undefined}
                onValueChange={handleLocalidadChange}
                disabled={!selectedProvincia}
              >
                <SelectTrigger className="w-full bg-gray-800 text-white">
                  <SelectValue placeholder="Localidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las localidades</SelectItem>
                  {localidades.map((localidad) => (
                    <SelectItem key={localidad} value={localidad}>
                      {localidad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <h2 className="text-white text-lg font-bold mb-2">Categorías</h2>
          {/* Categorías */}
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`w-full justify-start mb-1 ${
                selectedCategory === category.id ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'text-white'
              }`}
              onClick={() => onCategoryChange(category)}
              title={category.name}
            >
              <category.icon className={cn(
                "h-5 w-5",
                isOpen && "mr-2"
              )} />
              {isOpen && category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
} 