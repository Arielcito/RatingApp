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
      "El 17/12/2024 se realizó en el Show Room de Anacleto 44 entre 15 y 16, La Plata, Bs As, la firma del convenio marco de cooperacióm mutua con CEPBA, Confederación económica de la provincia de Buenos Aires. Estuvieron presentes importantes autoridades entre ellos el presidente de la Universidad NAcional de La Plata, Martín Lopez Armengol, el presidente de CEPBA Dr. Guillermo Ciro, el vice presidente el Lic. Christian Wertmuller, siendo anfitrion del evento el empresario Sr. Carlos ANacleto. Se abordaron temas de incorporación de nuevas tecnologías en la gestión de eficiencia y eficacia empresarial.",
    date: "2024-12-17 19:00",
    image:
      "https://drive.google.com/uc?id=1XPRhaF6L2yuJ_GbHRlU2ofTN2yuhzG6e&export=download",
    category: "Pre lanzamiento Rating App 2025",
    type: "image",
  },
  {
    id: "2",
    title: "Acompañaron a Rating App importantes autoridades",
    description:
      "Con la prestigiosa presencia del Presidente de la Universidad Nacional de La Plate, Dr Martín Lopez Armengol, y el Dr Mauricio Federico Erben, Investigador Principal del CONICET, entre otras autoridades, empresarios e instituciones presentes, disfrutamos de una grata velada en el brindis anual de la Confederación Económica .de la provincia de Buenos Aires, en el Show Room inteligente del Grupo Anacleto de la ciudad de La Plata",
    date: "2024-12-17",
    category: "Pre lanzamiento Rating App 2025",
    image:
      "https://drive.google.com/uc?id=1tXLvvp2T68BRxO4RNg2_KaP7ny21eQd-&export=download",
    type: "image",
  },
  {
    id: "3",
    title: "Agradecemos a los medios de comunicación presentes",
    description:
      "En el desarrollo de la actividad contamos con la presencia de importantes medios de comunicación, TV, radios, Streaming y diarios online, que acompañaron positivamente el pre lanzamiento del ecosistema tecnológico presentado por Rating App.",
    date: "2024-12-17",
    image:
      "https://drive.google.com/uc?id=1oF5VbLBP6LsWBJXqx96DL8XBhh4wsz12&export=download",
    category: "Pre lanzamiento Rating App 2025",
    type: "image",
  },
];
