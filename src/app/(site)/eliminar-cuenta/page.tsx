'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const DeleteAccountPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Aquí iría la lógica para eliminar la cuenta
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación de proceso
    setIsLoading(false);
    setIsDeleted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        Eliminar tu cuenta de RatingApp
      </h1>
      
      <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-md">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Lamentamos que quieras eliminar tu cuenta. Antes de proceder, por favor ten en cuenta lo siguiente:
        </p>
        
        <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li>Todos tus datos y historial serán eliminados permanentemente.</li>
          <li>No podrás recuperar tu cuenta una vez eliminada.</li>
          <li>Perderás acceso a todos los premios y recompensas acumulados.</li>
          <li>Si tienes una suscripción activa, asegúrate de cancelarla antes de eliminar tu cuenta.</li>
        </ul>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Si aún deseas eliminar tu cuenta, sigue estos pasos:
        </p>
        
        <ol className="list-decimal list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li>Ingresa tu correo electrónico asociado a la cuenta.</li>
          <li>Haz clic en el botón &quot;Eliminar cuenta&quot;.</li>
          <li>Espera la confirmación de que tu cuenta ha sido eliminada.</li>
        </ol>
        
        {!isDeleted ? (
          <form onSubmit={handleDelete} className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
              className="w-full p-2 mb-4 border rounded text-black dark:text-white dark:bg-gray-700"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Eliminando...' : 'Eliminar cuenta'}
            </button>
          </form>
        ) : (
          <p className="mb-6 text-green-500 font-bold text-center">
            Cuenta eliminada satisfactoriamente
          </p>
        )}
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Si tienes problemas para eliminar tu cuenta o necesitas ayuda adicional, por favor contacta a nuestro equipo de soporte.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Volver al inicio
          </Link>
          <Link href="/#contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Contactar soporte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
