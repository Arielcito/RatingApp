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
    date: "2024-11-25 16:00",
    image:
      "https://drive.google.com/uc?id=1XPRhaF6L2yuJ_GbHRlU2ofTN2yuhzG6e&export=download",
    category: "Actividad Virtual",
    type: "image",
  },
  {
    id: "2",
    title: "Becas para jóvenes talentos",
    description:
      "Se abre nueva convocatoria para becas de formación artística en las principales academias del país.",
    date: "2024-03-10",
    category: "Becas",
    image:
      "https://drive.google.com/uc?id=1KxeXkygW8chTPjN0bamhJyes2J1WRDBk&export=download",
    type: "image",
  },
  {
    id: "3",
    title: "Éxito en el programa de mentorías",
    description:
      "Los participantes del programa de mentorías muestran resultados prometedores en sus carreras artísticas.",
    date: "2024-03-05",
    image:
      "https://drive.google.com/uc?id=19t8chupuQhwhg7bcFcj_BbkqvHkNrGnA&export=download",
    category: "Mentorías",
    type: "image",
  },
];
