"use client";

import { useState } from 'react';

export default function StreamingConfigPage() {
  const [config, setConfig] = useState({
    stationName: '',
    streamUrl: '',
    bitrate: '128',
    format: 'mp3',
    isLive: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de guardado
    console.log('Configuración guardada:', config);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Configuración de Radio Streaming</h1>
      
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
            <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL del Stream
            </label>
            <input
              type="url"
              id="streamUrl"
              value={config.streamUrl}
              onChange={(e) => setConfig({ ...config, streamUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bitrate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bitrate (kbps)
              </label>
              <select
                id="bitrate"
                value={config.bitrate}
                onChange={(e) => setConfig({ ...config, bitrate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="64">64 kbps</option>
                <option value="128">128 kbps</option>
                <option value="192">192 kbps</option>
                <option value="320">320 kbps</option>
              </select>
            </div>

            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formato
              </label>
              <select
                id="format"
                value={config.format}
                onChange={(e) => setConfig({ ...config, format: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="mp3">MP3</option>
                <option value="aac">AAC</option>
                <option value="ogg">OGG</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isLive"
              checked={config.isLive}
              onChange={(e) => setConfig({ ...config, isLive: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isLive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Transmisión en Vivo
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