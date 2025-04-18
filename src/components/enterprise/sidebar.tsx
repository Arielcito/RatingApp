"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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

const fetchDashboard = async (): Promise<DashboardItem[]> => {
  const { data } = await api.get<DashboardItem[]>(API_URLS.dashboard);
  return data;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: dashboardItems, isLoading } = useQuery({
    
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  if (isLoading) {
    return (
      <div className="w-64 bg-gray-800 h-full shadow-sm p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const sortedItems = dashboardItems?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) || [];

  return (
    <div className="w-64 bg-gray-800 h-full shadow-sm">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {sortedItems.map((item) => {
            const isActive = pathname === `/enterprise/dashboard/${item.id}`;
            return (
              <div key={item.id} className="space-y-1">
                <Link
                  href={`/enterprise/dashboard/${item.id}`}
                  className={`${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  } group flex items-center justify-between px-2 py-2 text-base font-medium rounded-md`}
                >
                  <div className="flex items-center">
                    <div className={`${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    } mr-3 flex-shrink-0`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    {item.name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.dashboardUrl) {
                        window.open(item.dashboardUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-gray-400 hover:text-white"
                    disabled={!item.dashboardUrl}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Abrir dashboard en nueva ventana</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="ml-8 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === `/enterprise/dashboard/${child.id}`;
                      return (
                        <Link
                          key={child.id}
                          href={`/enterprise/dashboard/${child.id}`}
                          className={`${
                            isChildActive
                              ? 'bg-gray-700 text-white'
                              : 'text-gray-300 hover:bg-gray-700'
                          } group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md`}
                        >
                          <div className="flex items-center">
                            <div className={`${
                              isChildActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                            } mr-3 flex-shrink-0`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            {child.name}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (child.dashboardUrl) {
                                window.open(child.dashboardUrl, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="text-gray-400 hover:text-white"
                            disabled={!child.dashboardUrl}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <title>Abrir dashboard en nueva ventana</title>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 