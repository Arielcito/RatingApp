export interface Channel {
    id: number;
    name: string;
    tvWebURL: string;
    fmFrequency: string | null;
    tvAirChannel: string | null;
    radioWebURL: string | null;
    iconUrl: string | null;
    description: string | null;
    pais: string;
    provincia: string;
    localidad: string;
    tvWebOnline: boolean;
    radioWebOnline: boolean | null;
    streamingUrl: string | null;
    onlineNewsUrl: string | null;
    streaming: string | null;
    onlineNews: string | null;
    siteUrl: string | null;
  }
