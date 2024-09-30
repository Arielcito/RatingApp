import React from "react";
import Image from "next/image";
import Graphics from "@/components/About/Graphics";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section id="about" className="relative pt-[150px]">
        <div className="container lg:max-w-[1120px]">
          <div>
            <div className="-mx-4 flex flex-wrap items-center justify-between">
              <div className="w-full px-4 lg:w-1/2">
                <div
                  className="wow fadeInUp lg:ml-auto lg:max-w-[510px]"
                  data-wow-delay=".3s"
                >
                  <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                    
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                  Quienes Somos?
                  </h2>
                  <p className="mb-[30px] text-base leading-relaxed text-body">
                    Somos una consultora tecnologica que se especializa en la medición y análisis de audiencias.
                    Nuestro objetivo es revolucionar la industria de la medición de audiencias, ofreciendo una alternativa 
                    transparente, confiable y accesible para todos los actores del espectro televisivo.
                  </p>

                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <Image src="/images/about/about.jpg" alt="about" width={500} height={500} />
              </div>
            </div>
          </div>


        </div>

        {/*Graphics*/}
        <Graphics />
      </section>
    </>
  );
};

export default About;
