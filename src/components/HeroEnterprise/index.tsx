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
      <section id="home" className="pt-[100px]">
        <div className="container lg:max-w-[1305px] lg:px-10">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-6/12">
              <div
                className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]"
                data-wow-delay=".3s"
              >
                <Image src="/images/logo/logo-lanzamiento.png" alt="Logo" width={100} height={100} />
                <span className="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                Bienvenidos a la RE evolución digital
                </span>
                <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                Optimiza tus decisiones con datos reales y en tiempo real
                </h1>
                <p className="mb-10 max-w-[475px] text-base leading-relaxed text-body">
                Descubre el Futuro de la Medición de Audiencias.
Conoce nuestro Panel de Control Avanzado y revoluciona cómo gestionas tus métricas.
Solicita una demo ahora y lleva tu medio al siguiente nivel.</p>

                <div className="flex flex-wrap items-center">
                  <a
                    href="/enterprise#contact"
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-red-500 via-red-400 to-orange-500 py-4 px-9 text-base font-semibold text-white transition duration-300 ease-in-out hover:shadow-lg hover:opacity-80"
                  >
                    Revoluciona tu medición de audiencia
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </a>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Descubre cómo Rating App puede transformar tus datos en decisiones estratégicas
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-6/12">
              <div
                className="wow fadeInUp relative z-10 mx-auto flex w-full lg:mr-0"
                data-wow-delay=".3s"
              >
                <Image
                  width={800}
                  height={800}
                  src={"/images/heroEnterprise/hero.png"}
                  alt="hero image"
                  className="mx-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroEnterprise;
