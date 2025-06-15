"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, usePathname } from "next/navigation";
import { Tv, Radio, Laptop, Newspaper, ChevronLeft, MapPin, Trophy } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLocations } from "@/hooks/use-locations";
import type { Channel } from "@/types/channel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import api from '@/lib/axios';

interface SidebarProps {
  channels: Channel[];
}

interface Campaign {
  id: number;
  title: string;
  description: string;
  from_date: string;
  to_date: string;
  award_description: string;
  image_url: string;
  created: string;
  winner: string;
  active: boolean;
}

function getAdvertisingImageURL(resourceName: string) {
  return `http://ratingapp.net.ar:8000/advertising/${resourceName}`.trim();
}

const getCategories = (channels: Channel[]) => {
  const uniqueCategories = [...new Set(channels.map(channel => channel.category))].filter(Boolean);
  
  return uniqueCategories.map(category => {
    const iconMap: Record<string, any> = {
      'tv': Tv,
      'radio': Radio,
      'streaming': Laptop,
      'noticias': Newspaper,
      'deportes': Tv,
      'cultura': Tv,
      'podcasts': Tv
    };

    return {
      id: category.toLowerCase(),
      name: category,
      icon: iconMap[category.toLowerCase()] || Tv,
      path: `/servicios/${category.toLowerCase()}`
    };
  });
};

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference <= 0) {
        return 'Finalizado';
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days}d ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="absolute top-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white">
      {timeLeft}
    </div>
  );
}

export function Sidebar({ channels }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('destacado');
  const { locations, isLoading: locationsLoading } = useLocations();
  const [selectedProvincia, setSelectedProvincia] = useState<string | null>(null);
  const [selectedLocalidad, setSelectedLocalidad] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const categories = getCategories(channels);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/campaigns/listActive');
        if (!response.data) throw new Error('Error al cargar las campañas');
        setCampaigns(response.data.slice(0, 3)); // Only show first 3 campaigns
      } catch (err) {
        console.error('Error loading campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

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

  const handleClearFilters = () => {
    setSelectedCategory('destacado');
    setSelectedProvincia(null);
    setSelectedLocalidad(null);
    
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`);
    
    router.push('/servicios/tv');
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Add auto-scroll functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <aside className={cn(
      "w-64 border-r border-gray-800 transition-all duration-200",
      !isOpen && "w-16"
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

          {/* Filtros de ubicación - Solo visible cuando está expandido */}
          {isOpen && (
            <div className="space-y-4">
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

          {/* Categorías */}
          <div className={cn("space-y-1", isOpen && "mt-6")}>
            {isOpen && (
              <h2 className="text-white text-lg font-bold mb-2">Categorías</h2>
            )}
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1",
                  selectedCategory === category.id 
                    ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                    : 'text-white',
                  !isOpen && "justify-center p-2"
                )}
                onClick={() => onCategoryChange(category)}
                title={category.name}
              >
                <category.icon className="h-5 w-5" />
                {isOpen && <span className="ml-2">{category.name}</span>}
              </Button>
            ))}
          </div>

          {/* Botón de limpiar filtros - Solo visible cuando está expandido */}
          {isOpen && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full text-muted-foreground hover:text-primary"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}

          {/* Awards Carousel - Only visible when expanded */}
          {isOpen && campaigns.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-white mb-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Premios Activos</span>
              </div>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {campaigns.map((campaign) => (
                    <div 
                      key={campaign.id} 
                      className="flex-[0_0_100%] min-w-0 p-1 cursor-pointer"
                      onClick={() => router.push('/servicios/premios')}
                    >
                      <Card 
                        className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
                      >
                        <CardContent className="p-2">
                          <div className="relative h-24 mb-1.5 rounded-md overflow-hidden">
                            <Image
                              src={getAdvertisingImageURL(campaign.image_url)}
                              alt={campaign.title}
                              fill
                              className="object-cover"
                            />
                            <CountdownTimer endDate={campaign.to_date} />
                          </div>
                          <h3 className="text-xs font-medium text-white mb-0.5 line-clamp-1">
                            {campaign.title}
                          </h3>
                          <p className="text-[10px] text-gray-400 line-clamp-2">
                            {campaign.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      selectedIndex === index ? "bg-yellow-500" : "bg-gray-600"
                    )}
                    onClick={() => emblaApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="w-full mt-6">
                <p className="text font-bold mb-4 text-black dark:text-white">Descarga, Divertite y Gana</p>
                <Image
                  src="/images/qr-ratingapp.jpeg"
                  alt="Código QR para descargar RatingApp"
                  width={100}
                  height={100}
                  className="mr-auto mx-auto"
                />
              </div>
        </div>
      </ScrollArea>
    </aside>
  );
} 