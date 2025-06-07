"use client";

import { useSubscriber } from "@/app/context/SubscriberContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, Tv, Radio, PlaySquare, Newspaper, UserCircle2, Trophy } from "lucide-react";
import { Input } from "../ui/input";
import type { Channel } from "@/types/channel";
import api from '@/lib/axios';
import { Badge } from "@/components/ui/badge";
import { getResourceURL } from "@/lib/utils";

interface SearchResult {
  id: number;
  name: string;
  type: 'tv' | 'radio' | 'streaming' | 'diarios';
  logo?: string;
}

// Add function to determine channel type based on Channel properties
const determineChannelType = (channel: Channel): 'tv' | 'radio' | 'streaming' | 'diarios' | null => {
  // Check for diarios first
  if (channel.onlineNews === true || channel.onlineNewsUrl) {
    return 'diarios';
  }
  // Check for TV
  if (channel.tvWebOnline === true || channel.tvWebURL) {
    return 'tv';
  }
  // Check for radio
  if (channel.radioWebOnline === true || channel.radioWebURL) {
    return 'radio';
  }
  // Check for streaming
  if (channel.streaming === true || channel.streamingUrl) {
    return 'streaming';
  }
  return null;
};

export function Header() {
  const { subscriber, setSubscriber } = useSubscriber();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeRewardsCount, setActiveRewardsCount] = useState(0);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Add error boundary to prevent component from crashing
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error in Header component:', event.error);
      setIsError(true);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    const fetchActiveRewards = async () => {
      try {
        const response = await api.get('/campaigns/listActive');
        if (response.data) {
          setActiveRewardsCount(response.data.length);
        }
      } catch (error) {
        console.error('Error fetching active rewards:', error);
      }
    };

    fetchActiveRewards();
  }, []);

  const handleSearch = useCallback(async (term: string) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get('/ratingSignals/list');
      if (!response.data) throw new Error('Failed to fetch data');
      
      // Filter and transform the data based on search term
      const filtered = response.data
        .filter((item: Channel) => 
          item.name.toLowerCase().includes(term.toLowerCase())
        )
        .map((channel: Channel) => {
          const type = determineChannelType(channel);
          if (!type) return null;
          
          return {
            id: channel.id,
            name: channel.name,
            type,
            logo: channel.iconUrl
          } as SearchResult;
        })
        .filter(Boolean); // Remove null values

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching channels:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los resultados de búsqueda",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [toast]);

  // Effect to handle debounced search
  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleSearchItemClick = (result: SearchResult) => {
    if (result.type === 'diarios') {
      // For diarios, use the existing dynamic route
      router.push(`/servicios/${result.type}/${result.id}`);
    } else {
      // For tv, radio, and streaming, use channelId parameter
      router.push(`/servicios/${result.type}?channelId=${result.id}`);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleLogout = () => {
    try {
      setSubscriber(null);
      router.push("/");
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback to window.location if router fails
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };

  const handleTabChange = (tab: string) => {
    try {
      router.push(`/servicios/${tab}`);
    } catch (error) {
      console.error('Error changing tab:', error);
      // Fallback to window.location if router fails
      if (typeof window !== 'undefined') {
        window.location.href = `/servicios/${tab}`;
      }
    }
  };

  // Función para determinar si una ruta está activa
  const isActiveRoute = (route: string) => {
    return pathname === `/servicios/${route}`;
  };

  // If there's an error, show a simplified header
  if (isError) {
    return (
      <header className="border-b border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Image 
            src="/images/logo/logo.png" 
            alt="MediaStream" 
            width={200} 
            height={200} 
            className="ml-4 cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/servicios/tv';
              }
            }}
          />
          <div className="ml-auto">
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
            >
              <UserCircle2 className="h-4 w-4" />
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-gray-800">
      <div className="flex items-center gap-4 p-4">
        <Image 
          src="/images/logo/logo.png" 
          alt="MediaStream" 
          width={200} 
          height={200} 
          className="ml-4 cursor-pointer"
          onClick={() => router.push('/servicios/tv')}
        />
        
        <div className="flex gap-4 mx-auto">
          <Button 
            variant={isActiveRoute('tv') ? "default" : "ghost"}
            className={`text-white ${isActiveRoute('tv') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('tv')}
          >
            <Tv className="mr-2 h-4 w-4" />
            TV en vivo
          </Button>
          <Button 
            variant={isActiveRoute('radio') ? "default" : "ghost"}
            className={`text-white ${isActiveRoute('radio') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('radio')}
          >
            <Radio className="mr-2 h-4 w-4" />
            Radio
          </Button>
          <Button 
            variant={isActiveRoute('streaming') ? "default" : "ghost"}
            className={`text-white ${isActiveRoute('streaming') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('streaming')}
          >
            <PlaySquare className="mr-2 h-4 w-4" />
            Streaming
          </Button>
          <Button 
            variant={isActiveRoute('diarios') ? "default" : "ghost"}
            className={`text-white ${isActiveRoute('diarios') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('diarios')}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            Diario Online
          </Button>
          <Button 
            variant={isActiveRoute('premios') ? "default" : "ghost"}
            className={`text-white relative ${isActiveRoute('premios') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('premios')}
          >
            {activeRewardsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center px-1
                  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                  animate-[pulse_3s_ease-in-out_infinite]
                  shadow-[0_0_10px_rgba(255,0,255,0.5)]
                  hover:shadow-[0_0_15px_rgba(255,0,255,0.7)]
                  transition-all duration-300"
              >
                {activeRewardsCount}
              </Badge>
            )}
            <Trophy className="mr-2 h-4 w-4" />
            Premios
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar"
              className="pl-8 bg-gray-900 border-gray-800 text-white w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && searchTerm && (
              <div className="absolute top-full left-0 w-full mt-1 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-800 flex items-center gap-2"
                    onClick={() => handleSearchItemClick(result)}
                  >
                    {result.logo && (
                      <Image
                        src={getResourceURL(result.logo)}
                        alt={result.name}
                        width={20}
                        height={20}
                        className="rounded-sm object-contain"
                      />
                    )}
                    <span>{result.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="absolute top-full left-0 w-full mt-1 bg-gray-900 border border-gray-800 rounded-md p-2 text-center text-sm text-gray-400">
                Buscando...
              </div>
            )}
          </div>
          {subscriber ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-white">
                  <UserCircle2 className="h-4 w-4" />
                  {subscriber.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
            >
              <UserCircle2 className="h-4 w-4" />
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
} 