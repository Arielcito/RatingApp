"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import { heroImages } from "@/data/hero-images";

const HeroArea = () => {
  const [toggler, setToggler] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const words = [" Streaming", " TV", " Radio", "Diario online"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => {
      clearInterval(wordInterval);
      clearInterval(imageInterval);
    };
  }, [words.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <>
      <section id="home" className="pt-[100px]">
        <div className="container ">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full  lg:w-6/12">
              <div
                className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px]"
                data-wow-delay=".3s"
              >
                <Image src="/images/logo/logo-lanzamiento.png" alt="Logo" width={100} height={100} />
                <span className="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                  Bienvenidos a la RE evolución digital
                </span>
                <h1 className="mb-3 text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                  Disfruta{" "}
                  <span className="inline-block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                    Gratis
                  </span>{" "}
                  de los mejores canales de{" "}
                  <div className="block h-[60px] overflow-hidden align-bottom">
                    {words.map((word, index) => (
                      <div
                        key={word}
                        className={`transition-all duration-500 ${
                          index === currentWord ? "block" : "hidden"
                        }`}
                      >
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                          {word}
                        </span>
                      </div>
                    ))}
                  </div>
                </h1>
                <p className="mb-5 max-w-[475px] text-base leading-relaxed text-body">
                  Mira TV, escucha radio, lee diarios online y disfruta de streaming. Todo en un
                  solo lugar y con recompensas.
                </p>

                <div className="flex flex-wrap items-center">
                  <div className="flex flex-row items-center w-full">
                    <Link
                      href="#"
                      className="mb-6 mr-6 inline-flex h-full items-center rounded-lg bg-black px-[20px] py-[10px] text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                    >
                      <span className="mr-[8px] border-r text-center border-stroke border-opacity-40 pr-[12px] text-sm leading-relaxed dark:border-[#BDBDBD] bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                        DESCARGA, DIVERTITE Y GANA!!
                      </span>
                      <span>
                        <svg
                          fill="#000000"
                          height="25px"
                          width="25px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 512.01 512.01"
                          xmlSpace="preserve"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g>
                              {" "}
                              <g>
                                {" "}
                                <path d="M347.371,207.307l-25.6-25.6c-3.337-3.337-8.73-3.337-12.066,0l-87.834,87.834l-28.1-28.1 c-3.337-3.337-8.73-3.337-12.066,0l-25.6,25.6c-3.337,3.336-3.337,8.73,0,12.066l59.733,59.733c1.664,1.673,3.849,2.5,6.033,2.5 c2.185,0,4.369-0.836,6.033-2.5l119.467-119.467C350.708,216.037,350.708,210.644,347.371,207.307z M221.871,320.741 l-47.667-47.667l13.534-13.534l28.1,28.1c3.337,3.337,8.73,3.337,12.066,0l87.834-87.834l13.534,13.534L221.871,320.741z"></path>{" "}
                              </g>{" "}
                            </g>{" "}
                            <g>
                              {" "}
                              <g>
                                {" "}
                                <path d="M510.025,301.746l-38.11-45.739l38.11-45.739c2.125-2.543,2.577-6.084,1.178-9.079c-1.408-2.995-4.42-4.915-7.731-4.915 H391.403l-7.484-52.403c-0.597-4.207-4.198-7.33-8.448-7.33h-65.178c-10.052-8.38-48.828-40.687-48.828-40.687 c-3.166-2.645-7.757-2.645-10.923,0l-48.828,40.687h-65.178c-4.25,0-7.842,3.123-8.448,7.322l-7.484,52.412H8.538 c-3.311,0-6.323,1.92-7.731,4.915c-1.408,3.004-0.947,6.545,1.178,9.079l38.11,45.739l-38.11,45.739 c-2.125,2.543-2.577,6.084-1.178,9.079c1.408,3.004,4.42,4.915,7.731,4.915h112.068c2.278,15.915,7.492,52.412,7.492,52.412 c0.597,4.207,4.198,7.322,8.439,7.322h65.178l48.828,40.687c1.587,1.323,3.524,1.98,5.461,1.98s3.883-0.657,5.461-1.98 l48.819-40.687c13.261,0,65.203,0.034,65.186,0c4.25,0,7.842-3.123,8.448-7.322c0,0,5.214-36.497,7.492-52.412h112.06 c3.311,0,6.323-1.92,7.731-4.915C512.611,307.821,512.15,304.28,510.025,301.746z M26.757,298.674l31.002-37.205 c2.637-3.166,2.637-7.765,0-10.923L26.757,213.34h83.029l-31.002,37.205c-2.637,3.166-2.637,7.765,0,10.923l31.002,37.205H26.757z M377.46,301.737c-0.418,0.503-0.785,1.058-1.075,1.647c-0.597,1.195-0.623,1.246-8.303,55.023 c-62.882,0-62.942,0.034-64.691,0.905c-0.589,0.299-1.143,0.657-1.647,1.075l-45.739,38.11l-45.739-38.11 c-1.527-1.28-3.465-1.98-5.461-1.98h-60.868c-7.68-53.777-7.706-53.828-8.303-55.023c-0.299-0.589-0.657-1.143-1.075-1.647 l-38.11-45.73l38.11-45.739c1.016-1.22,1.673-2.688,1.894-4.258l7.484-52.403h60.868c1.997,0,3.925-0.7,5.461-1.98l45.739-38.11 c46.49,38.741,46.524,38.758,47.386,39.194c1.186,0.589,2.492,0.896,3.814,0.896h60.868l7.484,52.412 c0.222,1.57,0.879,3.038,1.894,4.258l38.11,45.73L377.46,301.737z M402.223,298.674l31.002-37.205 c2.637-3.166,2.637-7.765,0-10.923l-31.002-37.205h83.029l-31.002,37.205c-2.637,3.166-2.637,7.765,0,10.923l31.002,37.205 H402.223z"></path>{" "}
                              </g>{" "}
                            </g>{" "}
                            <g>
                              {" "}
                              <g>
                                {" "}
                                <path d="M510.025,301.746l-38.11-45.739l38.11-45.739c2.125-2.543,2.577-6.084,1.178-9.079c-1.408-2.995-4.42-4.915-7.731-4.915 H391.403l-7.484-52.403c-0.597-4.207-4.198-7.33-8.448-7.33h-65.178c-10.052-8.38-48.828-40.687-48.828-40.687 c-3.166-2.645-7.757-2.645-10.923,0l-48.828,40.687h-65.178c-4.25,0-7.842,3.123-8.448,7.322l-7.484,52.412H8.538 c-3.311,0-6.323,1.92-7.731,4.915c-1.408,3.004-0.947,6.545,1.178,9.079l38.11,45.739l-38.11,45.739 c-2.125,2.543-2.577,6.084-1.178,9.079c1.408,3.004,4.42,4.915,7.731,4.915h112.068c2.278,15.915,7.492,52.412,7.492,52.412 c0.597,4.207,4.198,7.322,8.439,7.322h65.178l48.828,40.687c1.587,1.323,3.524,1.98,5.461,1.98s3.883-0.657,5.461-1.98 l48.819-40.687c13.261,0,65.203,0.034,65.186,0c4.25,0,7.842-3.123,8.448-7.322c0,0,5.214-36.497,7.492-52.412h112.06 c3.311,0,6.323-1.92,7.731-4.915C512.611,307.821,512.15,304.28,510.025,301.746z M26.757,298.674l31.002-37.205 c2.637-3.166,2.637-7.765,0-10.923L26.757,213.34h83.029l-31.002,37.205c-2.637,3.166-2.637,7.765,0,10.923l31.002,37.205H26.757z M377.46,301.737c-0.418,0.503-0.785,1.058-1.075,1.647c-0.597,1.195-0.623,1.246-8.303,55.023 c-62.882,0-62.942,0.034-64.691,0.905c-0.589,0.299-1.143,0.657-1.647,1.075l-45.739,38.11l-45.739-38.11 c-1.527-1.28-3.465-1.98-5.461-1.98h-60.868c-7.68-53.777-7.706-53.828-8.303-55.023c-0.299-0.589-0.657-1.143-1.075-1.647 l-38.11-45.73l38.11-45.739c1.016-1.22,1.673-2.688,1.894-4.258l7.484-52.403h60.868c1.997,0,3.925-0.7,5.461-1.98l45.739-38.11 c46.49,38.741,46.524,38.758,47.386,39.194c1.186,0.589,2.492,0.896,3.814,0.896h60.868l7.484,52.412 c0.222,1.57,0.879,3.038,1.894,4.258l38.11,45.73L377.46,301.737z M402.223,298.674l31.002-37.205 c2.637-3.166,2.637-7.765,0-10.923l-31.002-37.205h83.029l-31.002,37.205c-2.637,3.166-2.637,7.765,0,10.923l31.002,37.205 H402.223z"></path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </span>
                    </Link>

                    <Link
                      href="#"
                      onClick={() => setToggler(!toggler)}
                      className="mb-6 inline-flex items-center py-4 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      <span className="mr-[22px] flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-current">
                        <svg
                          width="14"
                          height="14"
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
                        Que es RatingApp
                      </span>
                    </Link>
                  </div>

                  <FsLightbox
                    toggler={toggler}
                    sources={[
                      <iframe 
                      is="x-frame-bypass"
                        key="demo-video" 
                        src="https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview" 
                        className="w-full h-full min-w-[320px] min-h-[180px] max-w-[95vw] max-h-[95vh] md:min-w-[640px] md:min-h-[360px] lg:min-w-[1280px] lg:min-h-[720px]"
                        style={{
                          aspectRatio: '16/9',
                          width: '100%',
                          height: '100%'
                        }}
                        allow="autoplay"
                        title="Demo Video"
                      />
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-6/12">
              <div
                className="wow fadeInUp relative z-10 mx-auto flex w-full h-full lg:mr-0"
                data-wow-delay=".3s"
              >
                <button 
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                  aria-label="Imagen anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <div className="relative w-full h-[500px] flex items-center justify-center">
                  {heroImages.map((image, index) => (
                    <Image
                      key={image.id}
                      width={1000}
                      height={1000}
                      src={image.src}
                      alt={image.alt}
                      className={`mx-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-full absolute transition-opacity duration-500 ${
                        index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                      priority={index === 0}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                  aria-label="Siguiente imagen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroArea;
