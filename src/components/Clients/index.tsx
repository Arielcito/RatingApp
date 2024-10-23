import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Client } from "@/types/client";

const clientsData: Client[] = [
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 92,
    height: 28,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 120,
    height: 24,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 89,
    height: 32,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 108,
    height: 32,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 106,
    height: 32,
  },
];

const Clients = () => {
  return (
    <>
      <section className="relative z-10 bg-[#F8FAFB] pb-[50px] pt-[70px] dark:bg-[#15182B]">
        <div className="container mb-10 flex flex-col items-center justify-between">
          <h2 className="mb-4 text-lg font-bold text-black dark:text-white sm:text-2xl md:text-xl md:leading-tight flex justify-center">
          Estas importantes empresas e instituciones acompañan al ecosistema RatingApp
          </h2>
        </div>
        <div
          className="wow fadeInUp container overflow-hidden lg:max-w-[1200px]"
          data-wow-delay=".2s"
        >
          <div className="-mx-4 flex flex-wrap items-center justify-center">
            {clientsData.map((item, index) => (
              <div
                key={index}
                className="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6"
              >
                <div className="mb-5 text-center">
                  <Link href={item.link} className="block">
                    <Image
                      width={item.width}
                      height={item.height}
                      priority
                      src={item.logo}
                      alt="client"
                      className="mx-auto max-w-full opacity-[65%] hover:opacity-100"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Clients;
