import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FooterBottom from "@/components/Footer/FooterBottom";
import { FooterMenu } from "@/types/footerMenu";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { onScroll } from "@/utils/scrollActive";

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
      {
        label: "Términos y Condiciones",
        route: "/terminos-y-condiciones",
      },
    ],
  },
];

const Footer = () => {
  useEffect(() => {
    // Add scroll event listener for anchor links
    window.addEventListener("scroll", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <footer className="relative">
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
                      className="block max-w-full"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                  <p className="text-base text-body mb-8">
                    RatingApp es una aplicación para ganar premios mientras ves TV, radio y Streaming
                  </p>
                  <div className="flex space-x-4">
                    <Link href="https://www.facebook.com/rating.aplicacion/" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaFacebookF size={24} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaInstagram size={24} />
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaTiktok size={24} />
                    </Link>
                    <Link href="https://www.youtube.com/@inteligenciadigital-id" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                      <FaYoutube size={24} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-4/12 xl:w-4/12">
                {footerNavData.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="mb-8 text-[22px] font-medium text-black dark:text-white">
                      {group.title}
                    </h3>
                    <nav>
                      <ul className="space-y-3">
                        {group.navItems?.map((item, index) => (
                          <li key={index} className="menu-item  text-center">
                            <Link
                              href={item.route}
                              className={`inline-block text-base font-medium text-body hover:text-primary dark:text-white dark:hover:text-primary ${
                                item.route.startsWith('/#') ? 'ud-menu-scroll' : ''
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                ))}
              </div>

              <div className="w-full px-4 lg:w-4/12 xl:w-4/12">
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Descarga nuestra app y comenza a ganar</h3>
                <Image
                  src="/images/qr-ratingapp.jpeg"
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
