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
    title: "CEPBA y BBVA. Herramientas para potenciar tus finanzas. Sin costo",
    description:
      "Herramientas para potenciar tus finanzas. Descubri nuevas herramientas para hacer rendir tu capital. Exponen: Manuela Moralejo e Ivan Fernandez",
    date: "2024-11-25 16:00",
    image:
      "https://drive.google.com/uc?id=1gpzL0a4YezL2DMgGdA7ObE07T_vY0We_&export=download",
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
    type: "video",
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
    videoUrl: "1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a",
    type: "video",
  },
];
