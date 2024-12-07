"use client";

import React, { useState } from "react";
import Image from "next/image";
import Graphics from "@/components/About/Graphics";
import { motion } from "framer-motion";
import { castingNews } from "@/data/news";
import FsLightbox from "fslightbox-react";

const About = () => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
    type: 'video' as 'video' | 'image'
  });

  // Función helper para obtener la URL del video
  const getVideoEmbedUrl = (videoId: string) => {
    return `https://drive.google.com/file/d/${videoId}/preview`;
  };

  // Función helper para obtener la URL de la imagen
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return url;
  };

  const lightboxSources = castingNews.map(news => {
    if (news.type === 'video' && news.videoUrl) {
      return (
        <div key={news.id} className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
          <iframe
            is="x-frame-bypass"
            src={getVideoEmbedUrl(news.videoUrl)}
            className="w-full h-full"
            allow="autoplay"
            title={news.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          />
        </div>
      );
    }
    return (
      <div key={news.id} className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
        <Image
          src={getImageUrl(news.image)}
          alt={news.title}
          fill
          className="object-contain"
          sizes="90vw"
          priority={false}
        />
      </div>
    );
  });

  const openLightbox = (index: number, type: 'video' | 'image') => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: index,
      type
    });
  };

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
                  <span className="mb-4 block text-lg font-medium text-primary md:text-[22px]" />
                  <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                    Quienes Somos?
                  </h2>
                  <p className="mb-[30px] text-base leading-relaxed text-body">
                    Hola! Bienvenido a RatingApp!
                    Somos I+D Inteligencia Digital, una Consultora Tecnologica que se especializa en servicios, dedicada a realizar mediciones de audiencias en los medios
                    de comunicacion en Argentina y proyectada a otros mercados globales, de television, radio, publicidad exterior, streaming, Periodicos online, TGI (Target Group Index) y Agencias Publicitarias

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

        <div className="container lg:max-w-[1120px] mt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-10">
            Últimas Noticias de CastingApp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {castingNews.map((news, index) => (
              <motion.div
                key={news.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-blacksection rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div 
                  className="relative h-48 cursor-pointer"
                  onClick={() => openLightbox(index, news.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openLightbox(index, news.type);
                    }
                  }}
                >
                  {news.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-label="Play video"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative w-full h-full">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-label="Expand image"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-meta text-white px-3 py-1 rounded-full text-sm">
                    {news.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                    {news.title}
                  </h3>
                  <p className="text-body mb-4">
                    {news.description}
                  </p>
                  <span className="text-sm text-meta">
                    {new Date(news.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FsLightbox
          toggler={lightboxController.toggler}
          sources={lightboxSources}
          sourceIndex={lightboxController.sourceIndex}
          type={lightboxController.type}
        />

        <Graphics />
      </section>
    </>
  );
};

export default About;
