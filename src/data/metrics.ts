export interface Metric {
  id: string;
  title: string;
  image: string;
  description: string;
}

export const metricsData: Metric[] = [
  {
    id: "nielsen",
    title: "Certificado Nielsen",
    image: "/images/metrics/nielsen.png",
    description: "Medición de audiencia certificada por Nielsen"
  },
  {
    id: "kantar",
    title: "Kantar Media",
    image: "/images/metrics/kantar.png",
    description: "Métricas validadas por Kantar Media"
  },
  {
    id: "comscore",
    title: "ComScore Rating",
    image: "/images/metrics/comscore.png",
    description: "Análisis de audiencia verificado por ComScore"
  },
  {
    id: "gfk",
    title: "GfK Metrics",
    image: "/images/metrics/gfk.png",
    description: "Certificación de medición por GfK"
  }
]; 