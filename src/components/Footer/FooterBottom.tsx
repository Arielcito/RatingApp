import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const FooterBottom = () => {
  return (
    <>
      <div className="bg-primary py-7 dark:bg-black">
        <div className="container max-w-[1390px]">
          <div className="-mx-3 flex flex-wrap">
            <div className="order-last w-full px-3 lg:order-first lg:w-1/3">
              <p className="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
                &copy; 2025 RatingApp. All rights reserved
              </p>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
              <div className="flex space-x-4">
                <Link href="https://facebook.com/rating.aplicacion/" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                  <FaFacebookF size={24} />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                  <FaInstagram size={24} />
                </Link>
                <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                  <FaTiktok size={24} />
                </Link>
                <Link href="https://youtube.com/@inteligenciadigital-id" target="_blank" rel="noopener noreferrer" className="text-body hover:text-primary">
                  <FaYoutube size={24} />
                </Link>
              </div>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
              <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
                <Button
                  variant="ghost"
                  className="text-white hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  onClick={() => window.open('/terminos-y-condiciones', '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms and Conditions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;