import React from "react";
import Link from "next/link";

interface PartnershipFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const partnershipFeatures: PartnershipFeature[] = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5ZM26.5502 25.7838L24.4169 27.9171C22.3671 29.9669 19.0829 29.9669 17.0331 27.9171L12.0662 22.9502C10.0164 20.9004 10.0164 17.6162 12.0662 15.5664L14.1995 13.4331C14.6802 12.9524 15.4698 12.9524 15.9505 13.4331L20.9174 18.4C21.3981 18.8807 21.3981 19.6702 20.9174 20.1509L18.784 22.2843C18.3033 22.765 18.3033 23.5545 18.784 24.0352L21.9655 27.2167C22.4462 27.6974 23.2357 27.6974 23.7164 27.2167L25.8498 25.0833C26.3305 24.6026 27.1201 24.6026 27.6007 25.0833C28.0814 25.564 28.0814 26.3536 27.6007 26.8343L26.5502 25.7838ZM27.6007 26.8343L25.8498 25.0833L27.6007 26.8343Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Aumenta tu alcance",
    description:
      "Llega a una audiencia más amplia y comprometida a través de nuestra plataforma.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 6.66663H10C8.15905 6.66663 6.66667 8.15901 6.66667 9.99996V30C6.66667 31.8409 8.15905 33.3333 10 33.3333H30C31.841 33.3333 33.3333 31.8409 33.3333 30V9.99996C33.3333 8.15901 31.841 6.66663 30 6.66663ZM13.3333 28.3333H11.6667V18.3333H13.3333V28.3333ZM18.3333 28.3333H16.6667V15H18.3333V28.3333ZM23.3333 28.3333H21.6667V21.6666H23.3333V28.3333ZM28.3333 28.3333H26.6667V11.6666H28.3333V28.3333Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Interacción en tiempo real",
    description:
      "Obtén feedback instantáneo y mejora la participación de tu audiencia.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.6667 5H8.33333C6.49238 5 5 6.49238 5 8.33333V31.6667C5 33.5076 6.49238 35 8.33333 35H31.6667C33.5076 35 35 33.5076 35 31.6667V8.33333C35 6.49238 33.5076 5 31.6667 5ZM15 28.3333H11.6667V18.3333H15V28.3333ZM21.6667 28.3333H18.3333V11.6667H21.6667V28.3333ZM28.3333 28.3333H25V21.6667H28.3333V28.3333Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Análisis detallados",
    description:
      "Accede a datos valiosos sobre el comportamiento y preferencias de tu audiencia.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.6667 5H8.33333C6.49238 5 5 6.49238 5 8.33333V31.6667C5 33.5076 6.49238 35 8.33333 35H31.6667C33.5076 35 35 33.5076 35 31.6667V8.33333C35 6.49238 33.5076 5 31.6667 5ZM15 28.3333H11.6667V18.3333H15V28.3333ZM21.6667 28.3333H18.3333V11.6667H21.6667V28.3333ZM28.3333 28.3333H25V21.6667H28.3333V28.3333Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Análisis detallados",
    description:
      "Accede a datos valiosos sobre el comportamiento y preferencias de tu audiencia.",
  },
];

const BusinessPartnership = () => {
  return (
    <section id="enterprise" className="relative z-10 pt-[110px]">
      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-5 pb-14 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pb-5 lg:pt-20 xl:px-10">
          {/* Contenedor de dos columnas */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Columna izquierda: Título y descripción */}
            <div className="flex flex-col items-start gap-8 md:w-1/2">
              <div className="flex flex-col gap-4">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                  ¿Eres una empresa y quieres ser parte?
                </h2>
                <p className="text-base text-body">
                  Únete a nuestra plataforma y conecta con tu audiencia de una
                  manera innovadora. Descubre cómo podemos ayudarte a crecer y
                  mejorar tu interacción con los clientes.
                </p>
              </div>
              <div
                className="wow fadeInUp mt-14 text-center "
                data-wow-delay=".2s"
              >
                <Link
                  href="/enterprise"
                  className="mx-6 hidden rounded-md bg-primary px-[30px] py-[10px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
                >
                  Contáctanos para más información
                </Link>
              </div>
            </div>
            {/* Columna derecha: Características */}
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {partnershipFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="wow fadeInUp group"
                    data-wow-delay={`${0.2 + index * 0.1}s`}
                  >
                    <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-center text-base text-body">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPartnership;
