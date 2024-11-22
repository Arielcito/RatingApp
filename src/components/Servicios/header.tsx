"use client";

import { useSubscriber } from "@/app/context/SubscriberContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";

export function Header() {
  const { subscriber, setSubscriber } = useSubscriber();
  const router = useRouter();

  const handleLogout = () => {
    setSubscriber(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke bg-blacksection px-4 py-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="mr-4"
          />
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <UserCircle className="h-6 w-6 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>{subscriber?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 