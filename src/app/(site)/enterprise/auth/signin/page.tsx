"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useSubscriber } from '@/app/context/SubscriberContext';
import { API_URLS } from '@/utils/api-urls';
import { encryptPassword } from '@/utils/encryption';
import { generateDeviceCode } from '@/utils/device-code';

type SigninFormData = {
  email: string;
  passwd: string;
};

const EnterpriseSignin = () => {
  const router = useRouter();
  const { setSubscriber } = useSubscriber();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SigninFormData>({
    email: '',
    passwd: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const encryptedPassword = encryptPassword(formData.passwd);
      
      const loginData = {
        email: formData.email || null,
        passwd: encryptedPassword
      };

      const response = await fetch(API_URLS.loginEnterprise, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data?.token && data?.user) {
        // Guardar el token
        localStorage.setItem('token', data.token);
        // Guardar los datos del subscriber
        setSubscriber(data.user);
        toast.success('Inicio de sesión exitoso');
        router.push('/enterprise/dashboard');
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
          <Image src="/images/logo/logo.png" alt="Logo" width={200} height={200} className="mb-8" priority/>
          <h2 className="mb-8 text-2xl font-bold text-white">
            Portal Empresarial - Iniciar Sesión
          </h2>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm text-white">
                Email Corporativo
              </label>
              <input
                id="email"
                type="text"
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
            ¿Necesita ayuda?{' '}
            <Link href="/enterprise#contact" className="text-primary hover:text-primary-hover">
              Contáctenos
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSignin; 