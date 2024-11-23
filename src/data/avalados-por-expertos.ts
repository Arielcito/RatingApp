export interface AvaladosPorExpertos {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export const avaladosPorExpertos: AvaladosPorExpertos[] = [
  /*{
      id: "1",
      title: "Gran convocatoria para nuevo reality show",
      description: "Más de 1000 participantes se presentaron en el primer día de audiciones para el nuevo programa de talentos.",
      date: "2024-03-15",
      image: "/images/news/casting-1.jpg",
      category: "Convocatorias"
    },*/
  {
    id: "1",
    title: "CEPBA y BBVA. Herramientas para potenciar tus finanzas. Sin costo",
    description:
      "Herramientas para potenciar tus finanzas. Descubri nuevas herramientas para hacer rendir tu capital. Exponen: Manuela Moralejo e Ivan Fernandez",
    date: "2024-11-25 16:00",
    image:
      "https://drive.google.com/uc?id=1gpzL0a4YezL2DMgGdA7ObE07T_vY0We_&export=download",
    category: "Actividad Virtual",
  },
  {
    id: "2",
    title: "Becas para jóvenes talentos",
    description:
      "Se abre nueva convocatoria para becas de formación artística en las principales academias del país.",
    date: "2024-03-10",
    image: "/images/news/casting-2.jpg",
    category: "Becas",
  },
  {
    id: "3",
    title: "Éxito en el programa de mentorías",
    description:
      "Los participantes del programa de mentorías muestran resultados prometedores en sus carreras artísticas.",
    date: "2024-03-05",
    image: "/images/news/casting-3.jpg",
    category: "Mentorías",
  },
];
