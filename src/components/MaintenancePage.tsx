import React from 'react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center flex flex-col items-center">
        <img src="/images/logo/logo.png" alt="logo" width={200} height={200} />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sitio en mantenimiento</h1>
        <p className="text-xl text-gray-600 mb-8">Estamos trabajando para mejorar nuestro sitio. Volveremos pronto.</p>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
      </div>
    </div>
  );
};

export default MaintenancePage;
