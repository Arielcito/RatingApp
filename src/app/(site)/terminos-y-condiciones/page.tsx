import React from 'react';
import Link from 'next/link';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones - RatingApp",
  description: "Términos y condiciones de uso de RatingApp",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        Términos y Condiciones de RatingApp
      </h1>
      
      <div className="max-w-3xl mx-auxto  dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">1. Aceptación de los términos</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Al descargar, instalar o utilizar RatingApp, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con estos términos, no debe usar la aplicación.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">2. Uso de la aplicación</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          RatingApp es una plataforma que permite a los usuarios ver contenido de TV, escuchar radio y disfrutar de streaming mientras ganan puntos y recompensas. Usted se compromete a utilizar la aplicación solo para fines legales y de acuerdo con estos términos.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">3. Cuenta de usuario</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Para utilizar ciertas funciones de la aplicación, deberá crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">4. Privacidad</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad para entender cómo recopilamos, usamos y compartimos su información.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">5. Propiedad intelectual</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Todo el contenido y la propiedad intelectual en la aplicación son propiedad de RatingApp o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">6. Modificaciones</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la aplicación.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">7. Contacto</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de la sección de soporte en la aplicación.
        </p>
        
        <div className="flex justify-center mt-8">
          <Link href="/" className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
