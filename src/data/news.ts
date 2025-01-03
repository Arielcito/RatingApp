export interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  videoUrl?: string;
  type: "image" | "video";
}

export const castingNews: News[] = [
  {
    id: "1",
    title: "Pre lanzamiento Rating App 2025",
    description:
      "El 17/12/2024 se realizó en el Show Room del Grupo Anacleto, 44 entre 15 y 16, La Plata, Bs As, la firma del convenio marco de cooperación mutua con CEPBA, Confederación Económica de la Provincia de Buenos Aires. Estuvieron presentes importantes autoridades entre ellos el Presidente de la Universidad Nacional de La Plata, Dr Martín Lopez Armengol, el Presidente de CEPBA Dr Guillermo Ciro, el Vicepresidente el Lic. Christian Wertmuller, siendo anfitrión del evento el empresario Cdor Carlos Anacleto. Se abordaron temas de incorporación de nuevas tecnologías en la gestión de eficiencia y eficacia empresarial.",
    date: "2024-12-17 19:00",
    image:
      "https://drive.google.com/uc?id=1XPRhaF6L2yuJ_GbHRlU2ofTN2yuhzG6e&export=download",
    category: "",
    type: "image",
  },
  {
    id: "2",
    title: "Acompañaron a Rating App importantes autoridades",
    description:
      "Con la prestigiosa presencia del Presidente de la Universidad Nacional de La Plate, Dr Martín Lopez Armengol, y el Dr Mauricio Federico Erben, Investigador Principal del CONICET, entre otras autoridades, empresarios e instituciones presentes, disfrutamos de una grata velada en el brindis anual de la Confederación Económica de la Provincia de Buenos Aires, en el Show Room inteligente del Grupo Anacleto de la ciudad de La Plata",
    date: "2024-12-17 19:00",
    category: "",
    image:
      "https://drive.google.com/uc?id=1tXLvvp2T68BRxO4RNg2_KaP7ny21eQd-&export=download",
    type: "image",
  },
  {
    id: "3",
    title: "Agradecemos a los medios de comunicación presentes",
    description:
      "En el desarrollo de la actividad contamos con la presencia de importantes medios de comunicación, TV, radios, Streaming y diarios online de la región, que acompañaron positivamente el pre lanzamiento del ecosistema tecnológico presentado por Rating App.",
    date: "2024-12-17 19:00",
    image:
      "https://drive.google.com/uc?id=1oF5VbLBP6LsWBJXqx96DL8XBhh4wsz12&export=download",
    category: "Pre lanzamiento Rating App 2025",
    type: "image",
  },
  {
    id: "4",
    title: "Agradecemos a los medios de comunicación presentes",
    description:
      "En el desarrollo de la actividad contamos con la presencia de importantes medios de comunicación, TV, radios, Streaming y diarios online, que acompañaron positivamente el pre lanzamiento del ecosistema tecnológico presentado por Rating App.",
    date: "2024-12-17 19:00",
    image:
      "https://drive.google.com/uc?id=1oF5VbLBP6LsWBJXqx96DL8XBhh4wsz12&export=download",
    category: "Pre lanzamiento Rating App 2025",
    type: "image",
  },
];
