"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import validateEmail from "@/app/libs/validate";
import { useRouter } from 'next/navigation';
import type { Subscriber } from '@/types/subscriber';
import Image from "next/image";
const Signup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Subscriber, 'id' | 'captcha'>>({
    name: '',
    birthDate: '',
    gender: '',
    created: new Date().toISOString(),
    email: '',
    document: '',
    passwd: '',
    telefono: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedData = {
        ...formData,
        birthDate: `${formData.birthDate}T00:00:00Z`,
        id: null,
        captcha: null,
      };

      const response = await fetch('https://ratingapp.net.ar:18000/subscriptors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (data) {
        toast.success('Registro exitoso');
        router.push('/auth/signin');
      } else {
        toast.error('Error al registrar usuario');
      }
    } catch (error) {
      toast.error('Error en el registro');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pb-[110px] pt-[150px] lg:pt-[150px]">
      <div className="container">
        <div className="mx-auto max-w-[600px] rounded-lg bg-blacksection p-6 shadow-card-dark flex flex-col items-center justify-center flex-grow">
          <Image src="/images/logo/logo.png" alt="Logo" width={200} height={200} className="mb-8" />
          <h2 className="mb-8 text-2xl font-bold text-white">
            Crear Cuenta
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-white">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-dark px-5 py-3 text-white focus:border-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="mb-2 block text-sm text-dark dark:text-white">
                Fecha de nacimiento
              </label>
              <input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="mb-2 block text-sm text-dark dark:text-white">
                Género
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white [&>option]:text-black"
                required
              >
                <option value="">Seleccionar género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-dark dark:text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="document" className="mb-2 block text-sm text-dark dark:text-white">
                Documento
              </label>
              <input
                id="document"
                type="text"
                value={formData.document}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="mb-2 block text-sm text-dark dark:text-white">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="passwd" className="mb-2 block text-sm text-dark dark:text-white">
                Contraseña
              </label>
              <input
                id="passwd"
                type="password"
                value={formData.passwd}
                onChange={(e) => setFormData({ ...formData, passwd: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-custom px-5 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-body">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/signin" className="text-primary hover:text-primary-hover">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
