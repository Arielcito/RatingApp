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
import { encryptPassword } from '@/utils/encryption';
import { API_URLS } from '@/utils/api-urls';
import { generateDeviceCode } from '@/utils/device-code';
import { useSubscriber } from '@/app/context/SubscriberContext';

type SignupFormData = {
  name: string;
  birthDate: string;
  gender: string;
  created: string;
  email: string;
  document: string;
  passwd: string;
  telefono: string;
  deviceCode: string;
  acceptTerms: boolean;
};

const Signup = () => {
  const router = useRouter();
  const { setSubscriber } = useSubscriber();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    birthDate: '',
    gender: '',
    created: new Date().toISOString(),
    email: '',
    document: '',
    passwd: '',
    telefono: '',
    deviceCode: '',
    acceptTerms: false
  });

  const handleLogin = async (email: string, password: string) => {
    setLoadingMessage('Iniciando sesión...');
    try {
      const encryptedPassword = encryptPassword(password);
      const loginData = {
        email: email,
        passwd: encryptedPassword,
        deviceCode: generateDeviceCode()
      };

      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data?.token && data?.subscriber) {
        localStorage.setItem('token', data.token);
        setSubscriber(data.subscriber);
        toast.success('¡Bienvenido a RatingApp!');
        router.push('/servicios/tv');
      } else {
        throw new Error('Error al iniciar sesión automáticamente');
      }
    } catch (error) {
      console.error('Error en el login automático:', error);
      toast.error('Registro exitoso, pero hubo un error al iniciar sesión');
      router.push('/auth/signin');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Registrando usuario...');

    try {
      const encryptedPassword = encryptPassword(formData.passwd);
      const formattedData: Subscriber = {
        id: null,
        name: formData.name || null,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
        gender: formData.gender || null,
        created: new Date().toISOString(),
        email: formData.email || null,
        document: formData.document || null,
        passwd: encryptedPassword,
        telefono: formData.telefono || null,
        deviceCode: generateDeviceCode(),
        captcha: null
      };

      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (data) {
        toast.success('Registro exitoso');
        // Iniciar sesión automáticamente
        await handleLogin(formData.email, formData.passwd);
      } else {
        toast.error('Error al registrar usuario');
      }
    } catch (error) {
      toast.error('Error en el registro');
      console.error('Error:', error);
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
          
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-800">{loadingMessage}</p>
              </div>
            </div>
          )}

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

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 border border-stroke rounded bg-transparent focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-white">
                  Acepto los{' '}
                  <Link href="/terminos-y-condiciones" className="text-primary hover:text-primary-hover underline" target="_blank">
                    términos y condiciones
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.acceptTerms}
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
