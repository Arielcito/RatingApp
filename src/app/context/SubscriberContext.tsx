"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import type { Subscriber } from '@/types/subscriber';
import Cookies from 'js-cookie';

interface SubscriberContextType {
  subscriber: Subscriber | null;
  setSubscriber: (subscriber: Subscriber | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const SubscriberContext = createContext<SubscriberContextType>({
  subscriber: null,
  setSubscriber: () => {},
  logout: () => {},
  isLoading: true,
});

export const SubscriberProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('🔍 Verificando sesión almacenada...');
    try {
      // Verificar si hay token en localStorage
      const token = localStorage.getItem('token');
      console.log('🔍 Token en localStorage:', token ? 'Encontrado' : 'No encontrado');
      
      // Verificar cookie de subscriber
      const subscriberFromCookie = Cookies.get('subscriber');
      console.log('🔍 Cookie de subscriber:', subscriberFromCookie ? 'Encontrada' : 'No encontrada');
      
      if (subscriberFromCookie && token) {
        try {
          const parsedSubscriber = JSON.parse(subscriberFromCookie);
          console.log('✅ Restaurando sesión de subscriber:', parsedSubscriber.email);
          setSubscriber(parsedSubscriber);
        } catch (error) {
          console.error('❌ Error al parsear la cookie:', error);
          // Limpiar datos corruptos
          Cookies.remove('subscriber');
          localStorage.removeItem('token');
          setError(error instanceof Error ? error : new Error('Error parsing cookie'));
        }
      } else if (!token && subscriberFromCookie) {
        // Si hay cookie pero no token, limpiar cookie
        console.log('🗑️ Limpiando cookie huérfana sin token');
        Cookies.remove('subscriber');
      } else if (token && !subscriberFromCookie) {
        // Si hay token pero no cookie, limpiar token
        console.log('🗑️ Limpiando token huérfano sin cookie');
        localStorage.removeItem('token');
      } else {
        console.log('ℹ️ No se encontró sesión almacenada');
      }
    } catch (error) {
      console.error('❌ Error al verificar sesión:', error);
      setError(error instanceof Error ? error : new Error('Error accessing stored session'));
    } finally {
      // Add a small delay to ensure context is properly initialized
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSetSubscriber = (newSubscriber: Subscriber | null) => {
    try {
      setSubscriber(newSubscriber);
      
      if (newSubscriber) {
        try {
          // Configuración de cookies mejorada para desarrollo y producción
          const cookieOptions = {
            expires: 7,
            secure: process.env.NODE_ENV === 'production', // Solo secure en producción
            sameSite: 'strict' as const,
            path: '/'
          };
          
          Cookies.set('subscriber', JSON.stringify(newSubscriber), cookieOptions);
          console.log('✅ Cookie de subscriber guardada exitosamente');
        } catch (error) {
          console.error('❌ Error al guardar la cookie:', error);
          setError(error instanceof Error ? error : new Error('Error saving cookie'));
        }
      } else {
        console.log('🗑️ Eliminando cookie de subscriber');
        Cookies.remove('subscriber', { path: '/' });
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('❌ Error al actualizar el subscriber:', error);
      setError(error instanceof Error ? error : new Error('Error updating subscriber'));
    }
  };

  const handleLogout = () => {
    try {
      console.log('🔄 Cerrando sesión...');
      Cookies.remove('subscriber', { path: '/' });
      localStorage.removeItem('token');
      setSubscriber(null);
      console.log('✅ Sesión cerrada exitosamente');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      setError(error instanceof Error ? error : new Error('Error during logout'));
    }
  };

  // If there's an error, we still want to render the children
  // but with a null subscriber
  if (error) {
    console.error('❌ Error en SubscriberContext:', error);
  }

  return (
    <SubscriberContext.Provider 
      value={{ 
        subscriber, 
        setSubscriber: handleSetSubscriber, 
        logout: handleLogout,
        isLoading 
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

export const useSubscriber = () => useContext(SubscriberContext); 