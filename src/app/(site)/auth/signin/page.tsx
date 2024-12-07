import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - Rating App",
  description: "Inicia sesión en Rating App",
};

export default function SigninPage() {
  return <Signin />;
}
