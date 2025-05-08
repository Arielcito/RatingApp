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
    console.log('🔍 Verificando cookie de subscriber...');
    try {
      const subscriberFromCookie = Cookies.get('subscriber');
      if (subscriberFromCookie) {
        try {
          const parsedSubscriber = JSON.parse(subscriberFromCookie);
          setSubscriber(parsedSubscriber);
        } catch (error) {
          console.error('❌ Error al parsear la cookie:', error);
          Cookies.remove('subscriber');
          setError(error instanceof Error ? error : new Error('Error parsing cookie'));
        }
      } else {
        console.log('ℹ️ No se encontró cookie de subscriber');
      }
    } catch (error) {
      console.error('❌ Error al acceder a las cookies:', error);
      setError(error instanceof Error ? error : new Error('Error accessing cookies'));
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
          Cookies.set('subscriber', JSON.stringify(newSubscriber), {
            expires: 7,
            secure: true,
            sameSite: 'strict'
          });
        } catch (error) {
          console.error('❌ Error al guardar la cookie:', error);
          setError(error instanceof Error ? error : new Error('Error saving cookie'));
        }
      } else {
        console.log('🗑️ Eliminando cookie de subscriber');
        Cookies.remove('subscriber');
      }
    } catch (error) {
      console.error('❌ Error al actualizar el subscriber:', error);
      setError(error instanceof Error ? error : new Error('Error updating subscriber'));
    }
  };

  const handleLogout = () => {
    try {
      Cookies.remove('subscriber');
      setSubscriber(null);
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