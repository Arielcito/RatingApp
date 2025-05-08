import type { Client } from "@/types/client";

export const clientesComunidad: Client[] = [
  {
    logo: "https://drive.google.com/uc?id=1pw-CkkBEeLqEk_To_-sph-wB00msqHem",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1MWnX3qmnGrLEHQzuBy_i90vVOvDdfhov",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1qLBJQi10lX_dw5GHAvJK9OnTtau2Z-RY",
    link: "#",
    width: 89,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1gTI0zTHbAkAfe6Mw6VFxyHpIeFnfGABb",
    link: "#",
    width: 120,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1vb9vlfDQTcWKRp2kqeKUpM5VrSL89Sy6",
    link: "#",
    width: 108,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1l5KmcpWB-jTNbetKY0LoEIyEgOP7Mj11",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1vrB9yWas--394C3OXBjAdBHHmXno1inS",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1cO1XsliWry5gOeDD9kZ1sCSnKXkMCzOY",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1XSxSZEIbwPJuYv3S7yq0nPzxLlMY7y9k",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1C_IjXUmJ-M13jEFBF6eLNsUIJMQRvnJF",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1a-zJWrzlFKQwhBZiB0QsIAM3w6HdN2Cd",
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
    logo: "https://drive.google.com/uc?id=1pw-CkkBEeLqEk_To_-sph-wB00msqHem",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1MWnX3qmnGrLEHQzuBy_i90vVOvDdfhov",
    link: "#",
    width: 99,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1qLBJQi10lX_dw5GHAvJK9OnTtau2Z-RY",
    link: "#",
    width: 89,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1gTI0zTHbAkAfe6Mw6VFxyHpIeFnfGABb",
    link: "#",
    width: 120,
    height: 24,
  },
  {
    logo: "https://drive.google.com/uc?id=1vb9vlfDQTcWKRp2kqeKUpM5VrSL89Sy6",
    link: "#",
    width: 108,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1l5KmcpWB-jTNbetKY0LoEIyEgOP7Mj11",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1vrB9yWas--394C3OXBjAdBHHmXno1inS",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1cO1XsliWry5gOeDD9kZ1sCSnKXkMCzOY",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1XSxSZEIbwPJuYv3S7yq0nPzxLlMY7y9k",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1C_IjXUmJ-M13jEFBF6eLNsUIJMQRvnJF",
    link: "#",
    width: 106,
    height: 32,
  },
  {
    logo: "https://drive.google.com/uc?id=1a-zJWrzlFKQwhBZiB0QsIAM3w6HdN2Cd",
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
