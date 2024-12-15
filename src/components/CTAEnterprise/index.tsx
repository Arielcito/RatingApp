"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CTAEnterprise = () => {
  return (
    <section className="overflow-hidden px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
      <div className="mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-0">
        <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
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
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_left md:w-[60%] lg:w-1/2"
          >
            <h2 className="mb-4 w-11/12 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
              Unite a Rating App
            </h2>
            <p className="mb-6 text-white">
              Descubra cómo Rating App puede ayudar a su empresa a gestionar y mejorar su reputación en línea. Contáctenos hoy para obtener más información sobre nuestros servicios y cómo podemos impulsar el crecimiento de su negocio.
            </p>
            <a
              href="/enterprise#contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Contactar ahora
              
            </a>
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
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_right md:w-[40%] lg:w-1/2"
          >
            <div className="relative h-full w-full">
              <Image
                src="/images/unite.jpg"
                alt="Unite a Rating App"
                layout="responsive"
                width={500}
                height={300}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTAEnterprise;
