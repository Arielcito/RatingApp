export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string; // Opcional para mostrar miniaturas
  description?: string;
}

export const allVideos: Video[] = [
  {
    id: "main-video",
    title: "Video Principal",
    url: "https://www.youtube.com/embed/f0y-8bxb_A8",
    description: "Descripción del video principal"
  },
  {
    id: "historia-1",
    title: "Historia 1",
    url: "https://drive.google.com/file/d/1puqzvpNKRFfnyZ9wv3zvjD3ckdgaDErE/preview",
    description: "Primera historia"
  },
  {
    id: "historia-2",
    title: "Historia 2",
    url: "https://www.youtube.com/embed/Ycs7gq_fRcA",
    description: "Segunda historia"
  },
  {
    id: "historia-3",
    title: "Historia 3",
    url: "https://geo.dailymotion.com/player.html?video=x98rgo8",
    description: "Tercera historia"
  },
  {
    id: "historia-4",
    title: "Historia 4",
    url: "https://geo.dailymotion.com/player.html?video=x98rgo8",
    description: "Cuarta historia"
  },
  {
    id: "historia-5",
    title: "Historia 5",
    url: "https://geo.dailymotion.com/player.html?video=x98rgo8",
    description: "Quinta historia"
  }
];

// Mantengo las exportaciones originales para compatibilidad
export const mainVideo: Video = allVideos[0];
export const sideVideos: Video[] = allVideos.slice(1);