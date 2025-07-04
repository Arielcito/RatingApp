import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSubscriber } from '@/app/context/SubscriberContext';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const router = useRouter();
  const { subscriber, isLoading, setSubscriber, logout } = useSubscriber();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const token = localStorage.getItem('token');
      const subscriberCookie = Cookies.get('subscriber');
      
      console.log('🔍 Verificando autenticación:', { 
        hasSubscriber: !!subscriber, 
        hasToken: !!token, 
        hasCookie: !!subscriberCookie 
      });

      // Usuario está autenticado si tiene subscriber, token y cookie
      const authenticated = !!(subscriber && token && subscriberCookie);
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        console.log('❌ Usuario no autenticado, limpiando datos residuales');
        // Limpiar datos residuales si no está completamente autenticado
        if (!token) localStorage.removeItem('token');
        if (!subscriberCookie) Cookies.remove('subscriber');
      }
    }
  }, [subscriber, isLoading]);

  const handleLogout = () => {
    console.log('🔄 Cerrando sesión desde useAuth...');
    logout();
    setIsAuthenticated(false);
    router.push('/');
  };

  const requireAuth = (redirectTo: string = '/') => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        console.log('🔒 Acceso denegado, redirigiendo a:', redirectTo);
        router.push(redirectTo);
      }
    }, [isLoading, isAuthenticated, redirectTo]);
  };

  return {
    subscriber,
    isLoading,
    isAuthenticated,
    logout: handleLogout,
    requireAuth,
    setSubscriber
  };
}; 