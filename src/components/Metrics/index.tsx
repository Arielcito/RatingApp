
'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { metricsData } from "@/data/metrics";

const Metrics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === metricsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const metric = metricsData[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container">
        <div className="flex justify-center">
          <div
            key={metric.id}
            className="wow fadeInUp group relative overflow-hidden rounded-lg bg-white dark:bg-dark-2 p-8 shadow-one hover:shadow-xl transition-shadow duration-300 max-w-sm"
          >
            <div className="relative h-[100px] w-full mb-6">
              <Image
                src={metric.image}
                alt={metric.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white text-center">
              {metric.title}
            </h3>
            <p className="text-body text-center text-sm">
              {metric.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics; 