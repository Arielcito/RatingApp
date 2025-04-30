"use client";

import { useSubscriber } from '@/app/context/SubscriberContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/enterprise/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { subscriber, setSubscriber } = useSubscriber();

  useEffect(() => {
    if (!subscriber) {
      router.push('/enterprise/auth/signin');
    }
  }, [subscriber, router]);

  if (!subscriber) {
    return null;
  }

  const handleLogout = () => {
    setSubscriber(null);
    router.push('/enterprise/auth/signin');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen bg-gray-900">
        <header className="w-full bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-8">
              <Image 
                src="/images/logo/logo.png" 
                alt="Logo" 
                width={150} 
                height={32}
                className="cursor-pointer"
                onClick={() => router.push('/enterprise/dashboard')}
              />
              <nav className="flex items-center gap-6">
                <Link 
                  href="/enterprise/dashboard" 
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/enterprise/dashboard/reports" 
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Descargar Reportes
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="flex items-center gap-2 text-gray-200 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {subscriber.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => router.push('/enterprise/dashboard/settings')} className="text-gray-200 hover:text-white hover:bg-gray-700">
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-200 hover:text-white hover:bg-gray-700">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {!pathname.includes('/settings') && <Sidebar />}
          <main className={`flex-1 overflow-y-auto p-8 text-gray-200 ${pathname.includes('/settings') ? 'w-full' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
} 