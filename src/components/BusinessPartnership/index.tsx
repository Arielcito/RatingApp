import React from "react";
import Link from "next/link";

interface PartnershipFeature {
  title: string;
  description: string;
}

const partnershipFeatures: PartnershipFeature[] = [
  {
    title: "Aumenta tu alcance",
    description: "Llega a una audiencia más amplia y comprometida a través de nuestra plataforma.",
  },
  {
    title: "Interacción en tiempo real",
    description: "Obtén feedback instantáneo y mejora la participación de tu audiencia.",
  },
  {
    title: "Análisis detallados",
    description: "Accede a datos valiosos sobre el comportamiento y preferencias de tu audiencia.",
  },
];

const BusinessPartnership = () => {
  return (
    <section id="enterprise" className="relative z-10 pt-[110px]">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            ¿Eres una empresa y quieres ser parte?
          </h2>
          <p className="text-base text-body">
            Únete a nuestra plataforma y conecta con tu audiencia de una manera innovadora
          </p>
        </div>
      </div>

      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-5 pb-14 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pb-5 lg:pt-20 xl:px-10">
          <div className="-mx-4 flex flex-wrap justify-center">
            {partnershipFeatures.map((feature, index) => (
              <div key={index} className="w-full px-4 md:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    {feature.title}
                  </h3>
                  <p className="text-base text-body">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="wow fadeInUp text-center mt-14" data-wow-delay=".2s">
          <Link href="/contacto-empresas" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300">
            Contáctanos para más información
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessPartnership;
