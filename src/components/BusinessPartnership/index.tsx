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
        fill="#ffffff"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-3.2 -3.2 38.40 38.40"
        xmlSpace="preserve"
        stroke="#000000"
        stroke-width="0.00032"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="connected--ecosystem">
            {" "}
            <path
              id="connected--ecosystem_1_"
              d="M16,31.36c-1.25,0-2.276-0.978-2.355-2.208c-3.32-0.592-6.336-2.459-8.361-5.173 C4.914,24.22,4.473,24.36,4,24.36c-1.301,0-2.36-1.059-2.36-2.36c0-1.015,0.644-1.882,1.544-2.215 C2.823,18.562,2.64,17.289,2.64,16h0.72c0,1.241,0.179,2.466,0.533,3.643c0.821-0.038,1.584,0.363,2.032,0.992l4.11-2.055 l-2.353-4.411l0.636-0.339l2.361,4.427l15.074-7.537C25.68,10.494,25.64,10.251,25.64,10c0-0.568,0.202-1.09,0.538-1.498 c-1.905-2.58-4.751-4.359-7.887-4.936C18.036,4.595,17.105,5.36,16,5.36c-1.106,0-2.037-0.765-2.291-1.793 c-1.994,0.366-3.884,1.216-5.487,2.469L7.778,5.469c1.712-1.339,3.734-2.242,5.867-2.622C13.724,1.617,14.75,0.64,16,0.64 s2.276,0.977,2.355,2.207c3.318,0.592,6.335,2.459,8.361,5.173c0.37-0.24,0.811-0.38,1.284-0.38c1.302,0,2.36,1.059,2.36,2.36 c0,1.015-0.644,1.882-1.544,2.214c0.36,1.224,0.544,2.496,0.544,3.786h-0.72c0-1.242-0.179-2.466-0.532-3.643 c-0.806,0.054-1.584-0.363-2.032-0.993l-15.058,7.529l4.202,7.879c0.245-0.086,0.507-0.133,0.78-0.133 c1.105,0,2.036,0.765,2.291,1.793c1.992-0.365,3.883-1.214,5.487-2.468l0.443,0.566c-1.714,1.34-3.736,2.242-5.866,2.622 C18.276,30.384,17.25,31.36,16,31.36z M16,27.36c-0.904,0-1.64,0.735-1.64,1.64s0.736,1.64,1.64,1.64c0.904,0,1.64-0.735,1.64-1.64 S16.904,27.36,16,27.36z M5.823,23.497c1.904,2.579,4.75,4.359,7.886,4.936c0.133-0.535,0.448-0.999,0.876-1.32l-4.211-7.896 l-4.126,2.062C6.32,21.506,6.36,21.748,6.36,22C6.36,22.568,6.158,23.09,5.823,23.497z M4,20.36c-0.904,0-1.64,0.735-1.64,1.64 S3.096,23.64,4,23.64S5.64,22.904,5.64,22S4.904,20.36,4,20.36z M28,8.36c-0.904,0-1.64,0.736-1.64,1.64s0.735,1.64,1.64,1.64 s1.64-0.736,1.64-1.64S28.904,8.36,28,8.36z M16,1.36c-0.904,0-1.64,0.736-1.64,1.64S15.096,4.64,16,4.64 c0.904,0,1.64-0.736,1.64-1.64S16.904,1.36,16,1.36z M30,25.36h-4v-0.72h4V25.36z M31.36,24h-0.72v-4h0.721L31.36,24L31.36,24z M25.36,24h-0.72v-4h0.721L25.36,24L25.36,24z M30,19.36h-4v-0.72h4V19.36z M6,13.36H2v-0.72h4V13.36z M7.36,12H6.64V8h0.72 C7.36,8,7.36,12,7.36,12z M1.36,12H0.64V8h0.72V12z M6,7.36H2V6.64h4V7.36z"
            ></path>{" "}
          </g>{" "}
          <rect
            id="_Transparent_Rectangle"
            className="fill-none"
            width="32"
            height="32"
          ></rect>{" "}
        </g>
      </svg>
    ),
    title: "Ecosistema de medios",
    description: "Obtene ventajas de nuestro ecosistema de servicios.",
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
    title: "Panel de control y métricas personalizadas",
    description:
      " Visualiza datos clave, crea informes a medida y toma decisiones informadas para optimizar tu contenido y estrategias de audiencia.",
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
                  Eres un Multimedio audiovisual y quieres ser parte?
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
                  href="/#contact"
                  className="mx-6 hidden rounded-md bg-primary px-[30px] py-[10px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
                >
                  Contáctanos para más información
                </Link>
                <Link
                  href="/enterprise"
                  className="mx-6 hidden rounded-md px-[30px] py-[10px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
                >
                  Mas información
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
