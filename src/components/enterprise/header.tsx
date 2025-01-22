"use client";

import { useSubscriber } from '@/app/context/SubscriberContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { subscriber, logout } = useSubscriber();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/enterprise/dashboard">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  RatingApp
                </span>
              </div>
            </Link>
          </div>

          {/* Perfil y Menú */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="flex items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {subscriber?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>
            </div>

            {/* Menú desplegable */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Link
                  href="/enterprise/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/enterprise/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 