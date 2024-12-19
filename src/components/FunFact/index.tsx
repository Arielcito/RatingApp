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
              Prensa
            </h2>
            <p className="mx-auto text-white dark:text-white">
              Más noticias Rating App pre lanzamiento 2025
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-blacksection"
              >
                <div className="relative h-48">
                  <Image
                    src={metrica.image}
                    alt={metrica.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-meta px-3 py-1 text-sm text-white">
                    {metrica.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                    {metrica.title}
                  </h3>
                  <p className="mb-4 text-body">{metrica.description}</p>
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
