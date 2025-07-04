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
import { encryptPassword } from '@/utils/encryption';
import { API_URLS } from '@/utils/api-urls';
import { generateDeviceCode } from '@/utils/device-code';

type SigninFormData = {
  email: string;
  passwd: string;
};

const Signin = () => {
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
      console.log('🔄 Iniciando proceso de login...');
      
      // Validar email
      if (!validateEmail(formData.email)) {
        toast.error('Por favor ingresa un email válido');
        setIsLoading(false);
        return;
      }

      const encryptedPassword = encryptPassword(formData.passwd);
      
      const loginData = {
        email: formData.email || null,
        passwd: encryptedPassword,
        deviceCode: generateDeviceCode()
      };

      console.log('🔄 Enviando datos de login...');
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('📥 Respuesta recibida:', { hasToken: !!data?.token, hasSubscriber: !!data?.subscriber });

      if (data?.token && data?.subscriber) {
        console.log('✅ Login exitoso, guardando datos...');
        
        // Primero guardar el token en localStorage
        localStorage.setItem('token', data.token);
        console.log('✅ Token guardado en localStorage');
        
        // Luego establecer el subscriber (esto también guardará la cookie)
        setSubscriber(data.subscriber);
        console.log('✅ Subscriber establecido en contexto');
        
        // Verificar que se guardaron correctamente
        const tokenCheck = localStorage.getItem('token');
        const cookieCheck = Cookies.get('subscriber');
        
        if (tokenCheck && cookieCheck) {
          console.log('✅ Verificación exitosa: datos guardados correctamente');
          toast.success('Inicio de sesión exitoso');
          
          // Pequeño delay para asegurar que el contexto se actualice
          setTimeout(() => {
            router.push('/servicios/tv');
          }, 100);
        } else {
          console.error('❌ Error: Los datos no se guardaron correctamente');
          toast.error('Error al guardar la sesión');
        }
      } else {
        console.error('❌ Error: Respuesta inválida del servidor', data);
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('🔥 Error en el proceso de login:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          toast.error('Error de conexión. Verifica tu conexión a internet');
        } else {
          toast.error('Error al iniciar sesión. Inténtalo de nuevo');
        }
      } else {
        toast.error('Error inesperado al iniciar sesión');
      }
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
                disabled={isLoading}
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
                disabled={isLoading}
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

          <div className="mt-4 text-center">
            <Link href="/auth/forget-password" className="text-sm text-body hover:text-primary">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

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
