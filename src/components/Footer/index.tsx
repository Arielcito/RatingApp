import React from "react";
import Link from "next/link";
import Image from "next/image";
import FooterBottom from "@/components/Footer/FooterBottom";
import { FooterMenu } from "@/types/footerMenu";

const footerNavData: FooterMenu[] = [
  {
    title: "Home",
    navItems: [
      {
        label: "Que ofrecemos?",
        route: "/#features",
      },
      {
        label: "Sobre Nosotros",
        route: "/#about",
      },
      {
        label: "Como Funciona?",
        route: "/#work-process",
      },
      {
        label: "Contacto",
        route: "/#contact",
      },
      {
        label: "Blog",
        route: "/blog",
      },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bg-[#F8FAFB] pb-[46px] pt-[95px] dark:bg-[#15182A]">
          <div className="container max-w-[1390px]">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-4/12 xl:w-5/12">
                <div className="mb-11 max-w-[320px]">
                  <Link href="/" className="mb-8 inline-block">
                    <Image
                      width={160}
                      height={32}
                      src={"/images/logo/logo.svg"}
                      alt="Logo"
                      priority
                      className="block max-w-full dark:hidden"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <Image
                      width={160}
                      height={32}
                      src={"/images/logo/logo-white.svg"}
                      alt="Logo"
                      priority
                      className="hidden max-w-full dark:block"
                      style={{ width: "200px", height: "100px" }}
                    />
                  </Link>
                  <p className="text-base text-body">
                    RatingApp es una aplicación para ganar premios mientras ves TV, radio y Streaming
                  </p>
                </div>
              </div>

              <div className="w-full px-4 lg:w-8/12 xl:w-7/12">
                <div className="-mx-4 flex flex-wrap">
                  {footerNavData.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="w-full px-4"
                    >
                      <div className="mb-11">
                        <h3 className="mb-8 text-[22px] font-medium text-black dark:text-white">
                          {group.title}
                        </h3>

                        <ul className="flex flex-col flex-wrap ">
                          {group.navItems &&
                            group.navItems.map((item, index) => (
                              <li key={index} className="flex flex-col space-y-2">
                                <Link
                                  href={item.route}
                                  className="inline-block text-base text-body hover:text-primary"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterBottom />
      </footer>
    </>
  );
};

export default Footer;
