import React from "react";
import Link from "next/link";
import Image from "next/image";
import FooterBottom from "@/components/Footer/FooterBottom";
import { FooterMenu } from "@/types/footerMenu";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const footerNavData: FooterMenu[] = [
  {
    title: "Inicio",
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
              <div className="w-full px-4 lg:w-4/12 xl:w-4/12">
                <div className="mb-11 max-w-[320px]">
                  <Link href="/" className="mb-8 inline-block">
                    <Image
                      width={160}
                      height={32}
                      src={"/images/logo/logo.png"}
                      alt="Logo"
                      priority
                      className="block max-w-full "
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                  <p className="text-base text-body mb-8">
                    RatingApp es una aplicación para ganar premios mientras ves TV, radio y Streaming
                  </p>
                  <div className="flex space-x-4">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaFacebookF size={24} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaInstagram size={24} />
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaTiktok size={24} />
                    </Link>
                    <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaYoutube size={24} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-4/12 xl:w-4/12">
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

              <div className="w-full px-4 lg:w-4/12 xl:w-4/12">
                <h3 className="text-xl font-bold mb-4">Descarga nuestra app y comenza a ganar</h3>
                <Image
                  src="/images/qr-ratingapp.png"
                  alt="Código QR para descargar RatingApp"
                  width={100}
                  height={100}
                  className="mr-auto"
                  />
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
