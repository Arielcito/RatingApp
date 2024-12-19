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
    type: "video" as "video" | "image",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(castingNews.length / itemsPerPage);

  // Función helper para obtener la URL del video
  const getVideoEmbedUrl = (videoId: string) => {
    return `https://drive.google.com/file/d/${videoId}/preview`;
  };

  // Función helper para obtener la URL de la imagen
  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) {
      return url;
    }
    return url;
  };

  const lightboxSources = castingNews.map((news) => {
    if (news.type === "video" && news.videoUrl) {
      return (
        <div
          key={news.id}
          className="relative h-full max-h-[90vh] w-full max-w-[90vw]"
        >
          <iframe
            src={getVideoEmbedUrl(news.videoUrl)}
            className="h-full w-full"
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
      <div
        key={news.id}
        className="relative h-full max-h-[90vh] w-full max-w-[90vw]"
      >
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

  const openLightbox = (index: number, type: "video" | "image") => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: index,
      type,
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleNews = () => {
    const start = currentSlide * itemsPerPage;
    return castingNews.slice(start, start + itemsPerPage);
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
                    Hola! Bienvenido a RatingApp! Somos I+D Inteligencia
                    Digital, una Consultora Tecnologica que se especializa en
                    servicios, dedicada a realizar mediciones de audiencias en
                    los medios de comunicacion en Argentina y proyectada a otros
                    mercados globales, de television, radio, publicidad
                    exterior, streaming, Periodicos online, TGI (Target Group
                    Index) y Agencias Publicitarias
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
          <div className="mt-10 flex items-center gap-8 lg:gap-32.5">
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
                className="h-full w-full object-cover"
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

        <div className="container mt-20 lg:max-w-[1120px]">
          <h2 className="mb-10 text-center text-3xl font-bold text-black dark:text-white">
            Últimas Noticias
          </h2>
          
          <div className="relative">
            {/* Botón Anterior */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute -left-12 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-white hover:bg-primary/80 disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                title="Anterior"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Contenedor del Carrusel */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                <div className="grid min-w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {getVisibleNews().map((news, index) => (
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
                      className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-blacksection"
                    >
                      <div
                        className="relative h-48 cursor-pointer"
                        onClick={() => openLightbox(index, news.type)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            openLightbox(index, news.type);
                          }
                        }}
                      >
                        {news.type === "video" ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={news.image}
                              alt={news.title}
                              fill
                              className="object-contain"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/80">
                                <svg
                                  className="h-8 w-8 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-label="Play video"
                                  title="Reproducir video"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="group relative h-full w-full">
                            <Image
                              src={news.image}
                              alt={news.title}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                              <svg
                                className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
                        <span className="absolute left-4 top-4 rounded-full bg-meta px-3 py-1 text-sm text-white">
                          {news.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                          {news.title}
                        </h3>
                        <p className="mb-4 text-body">{news.description}</p>
                        <span className="text-sm text-meta">
                          {new Date(news.date).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón Siguiente */}
            <button
              type="button"
              onClick={nextSlide}
              className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-white hover:bg-primary/80 disabled:opacity-50"
              disabled={currentSlide === totalSlides - 1}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                title="Siguiente"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Indicadores de página */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <button
                  type="button"
                  key={`slide-indicator-${slideIndex}`}
                  onClick={() => setCurrentSlide(slideIndex)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentSlide === slideIndex
                      ? "w-6 bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Ir a slide ${slideIndex + 1}`}
                />
              ))}
            </div>
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
