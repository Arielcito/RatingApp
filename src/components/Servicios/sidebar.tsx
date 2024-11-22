"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Tv, Radio, Laptop, Newspaper, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState('destacado');
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

  const onCategoryChange = (category: typeof categories[0]) => {
    setSelectedCategory(category.id);
    router.push(category.path);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    onCategoryChange(category);
  };

  return (
    <>
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

            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={`w-full justify-start mb-1 ${
                  selectedCategory === category.id ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'text-white'
                }`}
                onClick={() => handleCategoryClick(category)}
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
    </>
  );
} 