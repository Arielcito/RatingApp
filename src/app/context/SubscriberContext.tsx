"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import type { Subscriber } from '@/types/subscriber';
import Cookies from 'js-cookie';

interface SubscriberContextType {
  subscriber: Subscriber | null;
  setSubscriber: (subscriber: Subscriber | null) => void;
}

const SubscriberContext = createContext<SubscriberContextType>({
  subscriber: null,
  setSubscriber: () => {},
});

export const SubscriberProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 Verificando cookie de subscriber...');
    const subscriberFromCookie = Cookies.get('subscriber');
    if (subscriberFromCookie) {
      try {
        console.log('🍪 Cookie encontrada:', subscriberFromCookie);
        const parsedSubscriber = JSON.parse(subscriberFromCookie);
        console.log('✅ Cookie parseada correctamente:', parsedSubscriber);
        setSubscriber(parsedSubscriber);
      } catch (error) {
        console.error('❌ Error al parsear la cookie:', error);
        Cookies.remove('subscriber');
      }
    } else {
    }
    setIsLoading(false);
  }, []);

  const handleSetSubscriber = (newSubscriber: Subscriber | null) => {
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
      }
    } else {
      console.log('🗑️ Eliminando cookie de subscriber');
      Cookies.remove('subscriber');
    }
  };

  if (isLoading) {
    return null; // O un componente de loading
  }

  return (
    <SubscriberContext.Provider value={{ subscriber, setSubscriber: handleSetSubscriber }}>
      {children}
    </SubscriberContext.Provider>
  );
};

export const useSubscriber = () => useContext(SubscriberContext); 