import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@/types/menu";
import { onScroll } from "@/utils/scrollActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSubscriber } from '@/app/context/SubscriberContext';
import { useRouter } from 'next/navigation';

const communityMenuData: Menu[] = [
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
  }
];

const enterpriseMenuData: Menu[] = [
  {
    label: "Servicios",
    route: "/enterprise#services",
  },
  
  {
    label: "Contacto",
    route: "/enterprise#contact",
  },
];

const Header = () => {
  const { subscriber, setSubscriber } = useSubscriber();
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const { data: session } = useSession();

  const pathUrl = usePathname();
  const isEnterprisePage = pathUrl?.startsWith("/enterprise");
  const menuData = isEnterprisePage ? enterpriseMenuData : communityMenuData;

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const handleLogout = () => {
    setSubscriber(null);
    router.push('/');
  };

  return (
    <>
      <header
        className={`navbar fixed left-0 z-50 w-full border-stroke bg-white dark:border-stroke-dark dark:bg-black ${
          sticky
            ? "border-b bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 shadow-sm"
            : "bg-opacity-100"
        } transition-all duration-300`}
        style={{ top: sticky ? "32px" : "32px" }}
      >
        <div className="container relative max-w-[1400px]">
          <div className="flex items-center justify-between">
            <div className="block py-2 lg:py-0 justify-center">
              {/* Reducido el padding vertical */}
              <Link href="/" className="mb-8 inline-block mt-4">
                <Image
                  width={150}
                  height={32}
                  src={"/images/logo/logo.png"}
                  alt="Logo"
                  priority
                  className="block max-w-full "
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </div>

            <button
              onClick={navbarToggleHandler}
              className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
              aria-label="navbarOpen"
              name="navbarOpen"
            >
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            </button>

            <div
              className={`${navbarOpen ? "" : "hidden"} menu-wrapper relative justify-between lg:flex`}
            >
              <button
                onClick={() => setNavbarOpen(false)}
                className="navbarClose fixed right-10 top-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
                name="navbarClose"
                aria-label="navbarClose"
              >
                <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
                <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
              </button>

              <nav className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:bg-opacity-100 lg:backdrop-blur-0 lg:backdrop-blur-none lg:dark:bg-transparent dark:lg:bg-opacity-100">
                <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                  {menuData.map((item, index) =>
                    item.children ? (
                      <li
                        key={`menu-${item.label}`}
                        className="submenu-item menu-item group relative w-full text-center lg:w-auto"
                      >
                        <Link
                          onClick={() => handleSubmenu(index)}
                          href={item.route}
                          className={`${sticky ? "lg:py-[21px]" : "lg:py-7"} submenu-taggler inline-flex items-center text-base font-medium text-black hover:text-primary group-hover:text-primary dark:text-white dark:hover:text-primary `}
                        >
                          {item.label}
                          <span className="pl-3">
                            <svg
                              width="14"
                              height="8"
                              viewBox="0 0 14 8"
                              className={`fill-current ${openIndex === index ? "rotate-180 lg:rotate-0" : ""}`}
                            >
                              <path d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z" />
                            </svg>
                          </span>
                        </Link>

                        <ul
                          className={`${openIndex === index ? "" : "hidden"} submenu space-y-5 pt-5 duration-300 lg:invisible lg:absolute lg:top-[120%] lg:block lg:w-[250px] lg:rounded-lg lg:bg-white lg:px-8 lg:pb-5 lg:text-left lg:opacity-0 lg:shadow-card lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 dark:lg:border-transparent dark:lg:bg-[#15182A] lg:dark:shadow-card-dark`}
                        >
                          {item.children.map((childItem, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                href={childItem.route}
                                onClick={closeMenu}
                                className="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary"
                              >
                                {childItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={`menu-${item.label}`} className="menu-item w-full text-center lg:w-auto">
                        <Link
                          href={item.route}
                          onClick={closeMenu}
                          className={`${
                            sticky ? "lg:py-[21px]" : "lg:py-7"
                          } ud-menu-scroll inline-flex w-full items-center justify-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:w-auto`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ),
                  )}
                  {!isEnterprisePage && (
                    <li>
                      <Link
                        href={"/enterprise"}
                        onClick={closeMenu}
                        className={`${sticky ? "lg:py-[21px]" : "lg:py-7"} ud-menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:hidden md:hidden`}
                      >
                        Para empresas
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="mr-[60px] flex items-center justify-end lg:mr-0">
              {isEnterprisePage ? (
                <Link
                  href={"/"}
                  onClick={closeMenu}
                  className={`${sticky ? "lg:py-[21px]" : "lg:py-7"} ud-menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary`}
                >
                  Comunidad
                </Link>
              ) : (
                <Link
                  href={"/enterprise"}
                  onClick={closeMenu}
                  className={`${sticky ? "lg:py-[21px]" : "lg:py-7"} ud-menu-scroll hidden sm:inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary`}
                >
                  Para empresas
                </Link>
              )}
              {session ? (
                <div className="hidden items-center sm:flex">
                  <p className="mx-3 text-black dark:text-white">
                    {session?.user?.name}
                  </p>
                  <button
                    aria-label="SignOut"
                    onClick={() => signOut()}
                    className="rounded-md bg-primary px-[30px] py-[10px] text-base font-medium text-white hover:bg-opacity-90"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href={isEnterprisePage ? "/enterprise/auth/signin" : "/auth/signin"}
                    className="mx-6 hidden rounded-md bg-primary px-[30px] py-[10px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
                  >
                    {isEnterprisePage ? "Iniciar Sesión Empresa" : "Iniciar Sesión"}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-[88px]" />
    </>
  );
};

export default Header;
