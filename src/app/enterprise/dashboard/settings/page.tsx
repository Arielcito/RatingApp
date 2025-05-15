"use client";

import { useState, useEffect } from 'react';
import { useSubscriber } from '@/app/context/SubscriberContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_URLS } from '@/utils/api-urls';

interface SubscriberProfile {
  name: string;
  description: string;
  serviceType: string;
  serviceUrl: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const { subscriber, setSubscriber } = useSubscriber();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SubscriberProfile>({
    name: '',
    description: '',
    serviceType: '',
    serviceUrl: ''
  });

  useEffect(() => {
    if (subscriber) {
      setFormData({
        name: subscriber.name || '',
        description: subscriber.description || '',
        serviceType: subscriber.serviceType || '',
        serviceUrl: subscriber.serviceUrl || ''
      });
    }
  }, [subscriber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_URLS.updateSubscriber, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubscriber(data.subscriber);
        toast.success('Perfil actualizado correctamente');
      } else {
        toast.error(data.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!subscriber) {
    router.push('/enterprise/auth/signin');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Configuración de Perfil</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-200 mb-2">
            Tipo de Servicio
          </label>
          <select
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Seleccionar tipo de servicio</option>
            <option value="TV">TV</option>
            <option value="Radio">Radio</option>
            <option value="Diario">Diario</option>
            <option value="Streaming">Streaming</option>
          </select>
        </div>

        <div>
          <label htmlFor="serviceUrl" className="block text-sm font-medium text-gray-200 mb-2">
            URL del Servicio
          </label>
          <input
            type="url"
            id="serviceUrl"
            value={formData.serviceUrl}
            onChange={(e) => setFormData({ ...formData, serviceUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://ejemplo.com"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/enterprise/dashboard/users')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Gestión de Usuarios
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}