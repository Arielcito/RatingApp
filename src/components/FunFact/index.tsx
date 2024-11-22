"use client";
import React from "react";
import { motion } from "framer-motion";
import { avaladosPorExpertos } from "@/data/avalados-por-expertos";
import Image from "next/image";
const FunFact = () => {
  return (
    <>
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
        <div className="relative z-1 mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-27.5">
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
              Métricas Confiables Avaladas por Expertos
            </h2>
            <p className="mx-auto lg:w-11/12">
              Nuestros números respaldan nuestro compromiso con la excelencia y la calidad en la industria del entretenimiento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {avaladosPorExpertos.map((metrica) => (
              <motion.div
                key={metrica.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-blacksection rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={metrica.image}
                    alt={metrica.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-meta text-white px-3 py-1 rounded-full text-sm">
                    {metrica.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                    {metrica.title}
                  </h3>
                  <p className="text-body mb-4">
                    {metrica.description}
                  </p>
                  <span className="text-sm text-meta">
                    {new Date(metrica.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FunFact;
