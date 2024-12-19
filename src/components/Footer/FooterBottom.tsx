import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

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
                <Link href="#" className="text-base text-white">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-base text-white">
                  Terms and conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;