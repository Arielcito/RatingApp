"use client";

import { useState } from 'react';

export default function RadioConfigPage() {
  const [config, setConfig] = useState({
    stationName: '',
    frequency: '',
    location: '',
    isActive: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de guardado
    console.log('Configuración guardada:', config);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Configuración de Radio</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="stationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre de la Estación
            </label>
            <input
              type="text"
              id="stationName"
              value={config.stationName}
              onChange={(e) => setConfig({ ...config, stationName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Frecuencia (MHz)
            </label>
            <input
              type="text"
              id="frequency"
              value={config.frequency}
              onChange={(e) => setConfig({ ...config, frequency: e.target.value })}
              placeholder="ej. 98.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              value={config.location}
              onChange={(e) => setConfig({ ...config, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={config.isActive}
              onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Estación Activa
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 