"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getClientsByPath } from "@/data/clients";
import { usePathname } from "next/navigation";

const Clients = () => {
  const pathname = usePathname();
  const clientsData = getClientsByPath(pathname || '');
  const sliderRef = useRef<HTMLDivElement>(null);
  const shouldAnimate = clientsData.length > 6;

  useEffect(() => {
    if (!shouldAnimate || !sliderRef.current) return;

    const slider = sliderRef.current;
    const items = Array.from(slider.children);
    
    for (let i = 0; i < 2; i++) {
      for (const item of items) {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
      }
    }

    const slideWidth = items.reduce((width, item) => width + item.clientWidth, 0);

    const animation = slider.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${slideWidth}px)` }
      ],
      {
        duration: 60000,
        iterations: Number.POSITIVE_INFINITY,
        easing: 'linear'
      }
    );

    animation.onfinish = () => {
      slider.style.transform = 'translateX(0)';
      animation.play();
    };

    return () => {
      animation.cancel();
    };
  }, [shouldAnimate]);

  return (
    <section className="relative z-10 bg-[#F8FAFB] pb-[20px] pt-[20px] dark:bg-[#15182B]">
      <div className="container mb-5 flex flex-col items-center justify-between">
        <h2 className="mb-2 text-lg font-bold text-black dark:text-white sm:text-2xl md:text-xl md:leading-tight flex justify-center">
          Estas importantes empresas e instituciones acompañan al ecosistema RatingApp
        </h2>
      </div>
      <div className="wow fadeInUp container overflow-hidden lg:max-w-[1200px]" data-wow-delay=".2s">
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex items-center"
          >
            {clientsData.map((client) => (
              <div
                key={client.logo}
                className="flex-shrink-0 px-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
              >
                <div className="mb-5 text-center">
                  <Link href={client.link} className="block">
                    <Image
                      width={client.width}
                      height={client.height}
                      src={client.logo}
                      alt="Clientes"
                      className="mx-auto max-w-full opacity-[65%] transition-opacity duration-300 hover:opacity-100"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
