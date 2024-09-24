"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FsLightbox from "fslightbox-react";

const HeroArea = () => {
  const [toggler, setToggler] = useState(false);
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
        <div className="container ">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full  lg:w-7/12">
              <div
                className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]"
                data-wow-delay=".3s"
              >
                <span className="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                  El mejor servicio IPTV de Argentina
                </span>
                <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                  Disfruta de los mejores canales de
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
                </h1>
                <p className="mb-10 max-w-[475px] text-base leading-relaxed text-body">
                Mira TV, escucha radio y disfruta de streaming. Todo en un solo lugar y con recompensas.
                </p>

                <div className="flex flex-wrap items-center">
                  <Link
                    href="#"
                    className="mb-6 mr-6 inline-flex h-[60px] items-center rounded-lg bg-black px-[30px] py-[14px] text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                  >
                    <span className="mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed dark:border-[#BDBDBD]">
                      Descargar la app
                    </span>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3_3641)">
                          <path
                            d="M11.624 7.2221C10.748 7.2221 9.392 6.2261 7.964 6.2621C6.08 6.2861 4.352 7.3541 3.38 9.0461C1.424 12.4421 2.876 17.4581 4.784 20.2181C5.72 21.5621 6.824 23.0741 8.288 23.0261C9.692 22.9661 10.22 22.1141 11.924 22.1141C13.616 22.1141 14.096 23.0261 15.584 22.9901C17.096 22.9661 18.056 21.6221 18.98 20.2661C20.048 18.7061 20.492 17.1941 20.516 17.1101C20.48 17.0981 17.576 15.9821 17.54 12.6221C17.516 9.8141 19.832 8.4701 19.94 8.4101C18.62 6.4781 16.592 6.2621 15.884 6.2141C14.036 6.0701 12.488 7.2221 11.624 7.2221ZM14.744 4.3901C15.524 3.4541 16.04 2.1461 15.896 0.850098C14.78 0.898098 13.436 1.5941 12.632 2.5301C11.912 3.3581 11.288 4.6901 11.456 5.9621C12.692 6.0581 13.964 5.3261 14.744 4.3901Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3_3641">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </Link>

                  <Link
                    href="#"
                    onClick={() => setToggler(!toggler)}
                    className="glightbox mb-6 inline-flex items-center py-4 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    <span className="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-current">
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 7.06367C14.1667 7.44857 14.1667 8.41082 13.5 8.79572L1.5 15.7239C0.833334 16.1088 -3.3649e-08 15.6277 0 14.8579L6.05683e-07 1.00149C6.39332e-07 0.231693 0.833334 -0.249434 1.5 0.135466L13.5 7.06367Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="text-base font-medium">
                      <span className="block text-sm"> Watch Demo </span>
                      See how it works
                    </span>
                  </Link>

                  <FsLightbox
                    toggler={toggler}
                    sources={[
                      "https://www.youtube.com/watch?v=HXHphpDJ9T0&pp=ygULaW50cm8gdmlkZW8%3D",
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-5/12">
              <div
                className="wow fadeInUp relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0 flex"
                data-wow-delay=".3s"
              >
                <Image
                  width={361}
                  height={546}
                  src={"/images/hero/hero-light.png"}
                  alt="hero image"
                  className="mx-auto max-w-full"
                />
                <div className="w-full h-full">
                  <Image
                  width={361}
                  height={546}
                  src={"/images/hero/hero-enterprise.png"}
                  alt="hero image"
                  className="mx-auto max-w-full"
                />
                <h2 >
                  Obtene las mejores metricas del mercado
                </h2>
                <div className="flex flex-wrap items-center">
                  <Link
                    href="#"
                    className="mb-6 mr-6 inline-flex h-[60px] items-center rounded-lg bg-black px-[30px] py-[14px] text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                  >
                      Para empresas
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroArea;
