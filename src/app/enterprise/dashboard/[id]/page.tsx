"use client";

import { useEffect, useState } from 'react';
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="w-48 h-48 mb-6">
        <svg
          className="w-full h-full text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Panel no encontrado</h3>
      <p className="text-gray-400 max-w-md">
        No pudimos encontrar el panel que estás buscando. Es posible que haya sido movido o eliminado.
      </p>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Volver
      </button>
    </div>
  );
}

function findDashboardUrl(items: DashboardItem[], targetId: string): string | null {
  console.log('Searching for dashboardUrl with targetId:', targetId);
  console.log('Items to search:', JSON.stringify(items, null, 2));
  
  for (const item of items) {
    console.log('Checking item:', item.id, item.name);
    if (item.id?.toString() === targetId) {
      console.log('Found matching item:', item);
      return item.dashboardUrl || null;
    }
    if (item.children?.length) {
      console.log('Checking children of item:', item.id);
      const found = findDashboardUrl(item.children, targetId);
      if (found) {
        console.log('Found dashboardUrl in children:', found);
        return found;
      }
    }
  }
  console.log('No dashboardUrl found for targetId:', targetId);
  return null;
}

function DashboardContent({ params }: { params: { id: string } }) {
  const [isDashboardLoaded, setIsDashboardLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const { data: dashboardItems, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  useEffect(() => {
    console.log('State changed - isDashboardLoaded:', isDashboardLoaded);
    console.log('State changed - iframeError:', iframeError);
  }, [isDashboardLoaded, iframeError]);

  const dashboardUrl = dashboardItems ? findDashboardUrl(dashboardItems, params.id) : null;
  console.log('Found dashboardUrl:', dashboardUrl);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !dashboardUrl) {
    return <EmptyState />;
  }

  const currentDashboard = dashboardItems?.find(item => {
    if (item.id?.toString() === params.id) return true;
    return item.children?.some(child => child.id?.toString() === params.id);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{currentDashboard?.name}</h1>
        {currentDashboard?.tooltip && (
          <p className="text-sm text-gray-400">{currentDashboard.tooltip}</p>
        )}
      </div>

      {dashboardUrl && (
        <div className="bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
            {iframeError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                <div className="text-center">
                  <p className="text-red-500 mb-4">Error al cargar el dashboard</p>
                  <a 
                    href={dashboardUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    Abrir en nueva pestaña
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={dashboardUrl}
                className="w-full h-full rounded-lg"
                onLoad={() => {
                  console.log('iframe loaded');
                  setIsDashboardLoaded(true);
                }}
                onError={() => {
                  console.log('iframe error');
                  setIframeError(true);
                }}
                title={`Dashboard - ${currentDashboard?.name}`}
              />
            )}
            {!isDashboardLoaded && !iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent params={params} />
    </QueryClientProvider>
  );
} 