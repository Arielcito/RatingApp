"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Tv, Radio, Laptop, Newspaper } from "lucide-react";

const menuItems = [
  {
    title: "TV",
    icon: Tv,
    href: "/servicios/tv",
  },
  {
    title: "Radio",
    icon: Radio,
    href: "/servicios/radio",
  },
  {
    title: "Streaming",
    icon: Laptop,
    href: "/servicios/streaming",
  },
  {
    title: "Diarios Online",
    icon: Newspaper,
    href: "/servicios/diarios",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-5rem)] w-[200px] flex-col border-r border-stroke bg-blacksection p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === item.href && "bg-gradient-custom text-white hover:bg-gradient-custom hover:text-white"
            )}
            onClick={() => router.push(item.href)}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
} 