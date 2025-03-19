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
  console.log(data);
  return data;
};

function DashboardContent() {
  const [isGrafanaLoaded, setIsGrafanaLoaded] = useState(false);
  const { data: dashboardItems, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardItems?.map((item: DashboardItem) => (
          <div key={item.id} className="bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{item.name}</p>
                {item.tooltip && (
                  <p className="text-xs text-gray-500 mt-1">{item.tooltip}</p>
                )}
              </div>
              {item.dashboardUrl && (
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Dashboard icon">
                    <title>Dashboard icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Grafana Dashboard */}
      <div className="bg-gray-800 rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Métricas en Tiempo Real</h2>
        <div className="relative" style={{ height: '600px' }}>
          <iframe
            src="http://172.105.159.250:3000/d/ee3682lduyo00b/mi-tablero?orgId=1&refresh=5s"
            className="w-full h-full rounded-lg"
            onLoad={() => setIsGrafanaLoaded(true)}
            title="Grafana Dashboard"
          />
          {!isGrafanaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
} 