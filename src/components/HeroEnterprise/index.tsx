"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroEnterprise = () => {
  const [email, setEmail] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const words = [" Streaming", " TV", " Radio"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <section id="home" className="pt-[165px]">
        <div className="container lg:max-w-[1305px] lg:px-10">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-7/12">
              <div
                className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]"
                data-wow-delay=".3s"
              >
                <span className="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                  El mejor servicio IPTV de Argentina
                </span>
                <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                Revoluciona la medición de audiencias  
                  <div className="inline-block h-[60px] overflow-hidden align-bottom">
                    {words.map((word, index) => (
                      <div
                        key={word}
                        className={`transition-all duration-500 ${
                          index === currentWord ? "block" : "hidden"
                        }`}
                      >
                        <span className="inline-block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                          {word}
                        </span>
                      </div>
                    ))}
                  </div>
                  con Rating App
                </h1>
                <p className="mb-10 max-w-[475px] text-base leading-relaxed text-body">
                Mira TV, escucha radio y disfruta de streaming. Todo en un solo lugar y con recompensas.
                </p>

                <div className="flex flex-wrap items-center">
                  
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-5/12">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/heroEnterprise/hero-light.svg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/heroEnterprise/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroEnterprise;
