"use client";

import { useSubscriber } from "@/app/context/SubscriberContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, Tv, PlayCircle, UserCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

export function Header() {
  const { subscriber, setSubscriber } = useSubscriber();
  const [selectedTab, setSelectedTab] = useState('tv');
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setSubscriber(null);
    router.push("/");
  };

  const handleTabChange = (tab: string) => {
    router.push(`/servicios/${tab}`);
  };

  return (
    <header className="border-b border-gray-800">
      <div className="flex items-center gap-4 p-4">
        <Image 
          src="/images/logo/logo.png" 
          alt="MediaStream" 
          width={200} 
          height={200} 
          className="ml-4 cursor-pointer"
          onClick={() => router.push('/servicios')}
        />
        
        <div className="flex gap-4 mx-auto">
          <Button 
            variant={selectedTab === 'tv' ? "default" : "ghost"}
            className={`text-white ${selectedTab === 'tv' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('tv')}
          >
            <Tv className="mr-2 h-4 w-4" />
            TV en vivo
          </Button>
          <Button 
            variant={selectedTab === 'ondemand' ? "default" : "ghost"}
            className={`text-white ${selectedTab === 'ondemand' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            onClick={() => handleTabChange('ondemand')}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            On Demand
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar"
              className="pl-8 bg-gray-900 border-gray-800 text-white w-[200px]"
            />
          </div>
          {subscriber ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-white" >
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
            <Button variant="secondary" className="gap-2">
              <UserCircle2 className="h-4 w-4" />
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
} 