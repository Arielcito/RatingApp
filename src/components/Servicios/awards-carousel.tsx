"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const awards = [
  {
    id: 1,
    title: "Mejor Canal de TV",
    description: "Reconocimiento a la excelencia en programación",
    year: "2024",
    image: "/images/awards/tv-award.png"
  },
  {
    id: 2,
    title: "Mejor Radio",
    description: "Premio a la innovación en radio",
    year: "2024",
    image: "/images/awards/radio-award.png"
  },
  {
    id: 3,
    title: "Mejor Streaming",
    description: "Excelencia en contenido digital",
    year: "2024",
    image: "/images/awards/streaming-award.png"
  }
];

export function AwardsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const router = useRouter();

  useEffect(() => {
    if (emblaApi) {
      // Auto-play functionality
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <div className="w-full bg-gray-900/50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Premios y Reconocimientos</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {awards.map((award) => (
            <div key={award.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="aspect-video relative mb-4 bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{award.title}</h3>
                  <p className="text-gray-400 mb-4">{award.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-medium">{award.year}</span>
                    <Button
                      variant="outline"
                      className="text-white border-yellow-500 hover:bg-yellow-500 hover:text-black"
                      onClick={() => router.push('/servicios/premios')}
                    >
                      Ver más
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 