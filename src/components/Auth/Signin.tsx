"use client";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import validateEmail from "@/app/libs/validate";
import { useRouter } from 'next/navigation';
import { useSubscriber } from '@/app/context/SubscriberContext';
import Cookies from 'js-cookie';

const Signin = () => {
  const router = useRouter();
  const { setSubscriber } = useSubscriber();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    passwd: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('🚀 Iniciando proceso de login...');

    try {
      console.log('📤 Enviando request al servidor:', formData);
      const response = await fetch('https://ratingapp.net.ar:18000/subscriptors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('📥 Respuesta del servidor:', data);

      if (data) {
        console.log('✅ Login exitoso, estableciendo subscriber...');
        setSubscriber(data);
        toast.success('Inicio de sesión exitoso');
        console.log('🔄 Redirigiendo a /servicios...');
        router.push('/servicios');
      } else {
        console.log('❌ Error: No se recibieron datos del servidor');
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('🔥 Error en el proceso de login:', error);
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pb-[110px] pt-[150px] lg:pt-[150px]">
      <div className="container">
        <div className="mx-auto max-w-[500px] rounded-lg bg-blacksection p-6 shadow-card-dark flex flex-col items-center justify-center flex-grow">
          <Image src="/images/logo/logo.png" alt="Logo" width={200} height={200} className="mb-8" />
          <h2 className="mb-8 text-2xl font-bold text-white">
            Iniciar Sesión
          </h2>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-dark px-5 py-3 text-white focus:border-primary"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block text-sm text-white">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={formData.passwd}
                onChange={(e) => setFormData({ ...formData, passwd: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-dark px-5 py-3 text-white focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-custom px-5 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-body">
            ¿No tienes una cuenta?{' '}
            <Link href="/auth/signup" className="text-primary hover:text-primary-hover">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signin;
