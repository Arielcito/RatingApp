"use client";

import React from "react";
import Image from "next/image";
import Graphics from "@/components/About/Graphics";
import { motion } from "framer-motion";

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
                  <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]"></span>
                  <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                    Quienes Somos?
                  </h2>
                  <p className="mb-[30px] text-base leading-relaxed text-body">
                    Somos una consultora tecnologica que se especializa en la
                    medición y análisis de audiencias. Nuestro objetivo es
                    revolucionar la industria de la medición de audiencias,
                    ofreciendo una alternativa transparente, confiable y
                    accesible para todos los actores del espectro televisivo.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <Image
                  src="/images/about/about.jpg"
                  alt="about"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 lg:gap-32.5 mt-10">
          <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
            <Image
              src="/images/about/casting-app.jpg"
              alt="About"
              className="w-full h-full object-cover"
              fill
            />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  Proximamente
                </span>{" "}
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Casting App
                </span>
              </h2>
              <p>24x7x365 PROGRAMAS e incentivos al usuario:</p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Nuevas promesas del espectáculo
                  </h3>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Semillero de estrellas
                  </h3>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    03
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Becas Caza Talentos
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/*Graphics*/}
        <Graphics />
      </section>
    </>
  );
};

export default About;
