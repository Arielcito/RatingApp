export interface Channel {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    tvWebURL: string;
    streamingUrl: string;
    provincia: string;
    localidad: string;
    pais: string;
    isIPTV: boolean;
    siteUrl: string;
    onlineNews: boolean;
    onlineNewsUrl: string;
    tvWebOnline: boolean;
    radioWebOnline: boolean;
    streaming: boolean;
    radioWebURL: string;
    fmFrequency: string;
}
