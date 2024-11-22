"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import type { Subscriber } from '@/types/subscriber';

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

  useEffect(() => {
    // Cargar subscriber del localStorage al iniciar
    const storedSubscriber = localStorage.getItem('subscriber');
    if (storedSubscriber) {
      setSubscriber(JSON.parse(storedSubscriber));
    }
  }, []);

  const handleSetSubscriber = (newSubscriber: Subscriber | null) => {
    setSubscriber(newSubscriber);
    if (newSubscriber) {
      localStorage.setItem('subscriber', JSON.stringify(newSubscriber));
      document.cookie = `subscriber=${JSON.stringify(newSubscriber)}; path=/`;
    } else {
      localStorage.removeItem('subscriber');
      document.cookie = 'subscriber=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  };

  return (
    <SubscriberContext.Provider value={{ subscriber, setSubscriber: handleSetSubscriber }}>
      {children}
    </SubscriberContext.Provider>
  );
};

export const useSubscriber = () => useContext(SubscriberContext); 