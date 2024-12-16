import type { Client } from "@/types/client";

export const clientesComunidad: Client[] = [
  {
    logo: "https://drive.google.com/uc?id=1pw-CkkBEeLqEk_To_-sph-wB00msqHem&export=download",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1MWnX3qmnGrLEHQzuBy_i90vVOvDdfhov&export=download",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1qLBJQi10lX_dw5GHAvJK9OnTtau2Z-RY&export=download",
    link: "#",
    width: 89,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1gTI0zTHbAkAfe6Mw6VFxyHpIeFnfGABb&export=download",
    link: "#",
    width: 120,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1vb9vlfDQTcWKRp2kqeKUpM5VrSL89Sy6&export=download",
    link: "#",
    width: 108,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1l5KmcpWB-jTNbetKY0LoEIyEgOP7Mj11&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1vrB9yWas--394C3OXBjAdBHHmXno1inS&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1cO1XsliWry5gOeDD9kZ1sCSnKXkMCzOY&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1XSxSZEIbwPJuYv3S7yq0nPzxLlMY7y9k&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1C_IjXUmJ-M13jEFBF6eLNsUIJMQRvnJF&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1a-zJWrzlFKQwhBZiB0QsIAM3w6HdN2Cd&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 106,
    height: 32,
  },
];

export const clientesEmpresas: Client[] = [
  {
    logo: "https://drive.google.com/uc?id=1pw-CkkBEeLqEk_To_-sph-wB00msqHem&export=download",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1qLBJQi10lX_dw5GHAvJK9OnTtau2Z-RY&export=download",
    link: "#",
    width: 89,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1gTI0zTHbAkAfe6Mw6VFxyHpIeFnfGABb&export=download",
    link: "#",
    width: 120,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1vb9vlfDQTcWKRp2kqeKUpM5VrSL89Sy6&export=download",
    link: "#",
    width: 108,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1l5KmcpWB-jTNbetKY0LoEIyEgOP7Mj11&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1vrB9yWas--394C3OXBjAdBHHmXno1inS&export=download",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "/images/logo/logo.png",
    link: "#",
    width: 106,
    height: 32,
  },
];

// Función helper para obtener el array correcto según la ruta
export const getClientsByPath = (path: string): Client[] => {
  return path.startsWith("/enterprise") ? clientesEmpresas : clientesComunidad;
};
