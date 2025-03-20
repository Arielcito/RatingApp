"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '@/lib/axios';
import { API_URLS } from '@/utils/api-urls';

interface DashboardItem {
  id?: number;
  name?: string;
  sortOrder?: number;
  tooltip?: string;
  dashboardUrl?: string;
  parentId?: number;
  ratingSignalId?: number;
  children: DashboardItem[];
}

const queryClient = new QueryClient();

const fetchDashboard = async (): Promise<DashboardItem[]> => {
  const { data } = await api.get<DashboardItem[]>(API_URLS.dashboard);
  return data;
};

function DashboardContent() {
  const router = useRouter();
  const { data: dashboardItems, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  useEffect(() => {
    if (dashboardItems && dashboardItems.length > 0) {
      const firstDashboard = dashboardItems[0];
      router.push(`/enterprise/dashboard/${firstDashboard.id}`);
    }
  }, [dashboardItems, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!dashboardItems || dashboardItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 text-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gray-800 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-gray-700 rounded-full animate-pulse delay-75" />
          <div className="absolute inset-8 bg-gray-600 rounded-full animate-pulse delay-150" />
          <div className="absolute inset-12 flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <title>No hay dashboards</title>
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          <h3 className="text-2xl font-bold text-white">No hay dashboards disponibles</h3>
          <p className="text-gray-400 text-lg">
            No hay dashboards configurados para mostrar en este momento.
          </p>
          <div className="bg-gray-800 rounded-lg p-6 text-left space-y-4">
            <h4 className="text-lg font-semibold text-white">¿Qué puedes hacer?</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Contactar administrador</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Contacta a tu administrador para configurar los dashboards necesarios</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Contactar soporte</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Envía un correo electrónico al soporte técnico para solicitar ayuda</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Revisar documentación</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Revisa la documentación para ver cómo configurar dashboards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
} 