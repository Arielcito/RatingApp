import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro - Rating App",
  description: "Crea una cuenta en Rating App",
};

export default function SignupPage() {
  return <Signup />;
}
