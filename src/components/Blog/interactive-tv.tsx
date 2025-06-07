'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Video } from '@/data/videos';

interface InteractiveTVProps {
  videos: Video[];
  autoPlayInterval?: number; // Tiempo en segundos para cambiar automáticamente (por defecto 30s)
}

const VideoPlayer = ({ video }: { video: Video }) => {
  // Construir URL con parámetros de autoplay para diferentes plataformas
  const getAutoplayUrl = (url: string) => {
    if (url.includes('youtube.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}autoplay=1&mute=1&loop=1&playlist=${url.split('/').pop()}`;
    } else if (url.includes('dailymotion.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}autoplay=1&mute=1&queue-autoplay-next=1`;
    } else if (url.includes('drive.google.com')) {
      // Google Drive no soporta autoplay automático por seguridad
      return url;
    }
    return url;
  };

  return (
    <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black shadow-2xl border-4 border-gray-800">
      <iframe
        src={getAutoplayUrl(video.url)}
        className="absolute left-0 top-0 h-full w-full"
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const VideoThumbnail = ({ 
  video, 
  isActive, 
  onClick 
}: { 
  video: Video; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <div 
    className={`
      relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 group
      ${isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}
    `}
    onClick={onClick}
  >
    <div className="relative w-full pt-[56.25%] bg-gray-200 dark:bg-gray-700">
      <iframe
        src={video.url}
        className="absolute left-0 top-0 h-full w-full pointer-events-none"
        title={video.title}
      />
      {!isActive && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
          <Play className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
    <div className="p-2">
      <h4 className={`text-sm font-medium truncate ${isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
        {video.title}
      </h4>
      {video.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
          {video.description}
        </p>
      )}
    </div>
  </div>
);

export const InteractiveTV: React.FC<InteractiveTVProps> = ({ 
  videos, 
  autoPlayInterval = 30 // 30 segundos por defecto
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(autoPlayInterval);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentVideo = videos[currentVideoIndex];
  
  const nextVideo = () => {
    console.log('InteractiveTV: Cambiando al siguiente video automáticamente');
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setTimeRemaining(autoPlayInterval);
  };
  
  const prevVideo = () => {
    console.log('InteractiveTV: Cambiando al video anterior manualmente');
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setTimeRemaining(autoPlayInterval);
  };
  
  const selectVideo = (index: number) => {
    console.log(`InteractiveTV: Seleccionando video ${index + 1} manualmente`);
    setCurrentVideoIndex(index);
    setTimeRemaining(autoPlayInterval);
  };

  const toggleAutoPlay = () => {
    console.log(`InteractiveTV: ${isPlaying ? 'Pausando' : 'Reanudando'} reproducción automática`);
    setIsPlaying(!isPlaying);
  };

  // Efecto para manejar el autoplay continuo
  useEffect(() => {
    if (isPlaying) {
      // Limpiar intervalos existentes
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);

      // Configurar el intervalo para cambiar de video
      intervalRef.current = setInterval(() => {
        nextVideo();
      }, autoPlayInterval * 1000);

      // Configurar el countdown
      countdownRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return autoPlayInterval;
          }
          return prev - 1;
        });
      }, 1000);

      console.log('InteractiveTV: Autoplay activado - cambio automático cada', autoPlayInterval, 'segundos');
    } else {
      // Limpiar intervalos cuando está pausado
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      console.log('InteractiveTV: Autoplay pausado');
    }

    // Cleanup al desmontar el componente
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isPlaying, autoPlayInterval, currentVideoIndex]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Pantalla Principal */}
      <div className="flex-1">
        <div className="relative">
          {/* Marco de TV */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl">
            <VideoPlayer video={currentVideo} />
            
            {/* Controles de Navegación */}
            <div className="absolute top-1/2 left-2 right-2 flex justify-between items-center pointer-events-none">
              <button
                onClick={prevVideo}
                className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-200 pointer-events-auto shadow-lg hover:scale-110"
                aria-label="Video anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextVideo}
                className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-200 pointer-events-auto shadow-lg hover:scale-110"
                aria-label="Siguiente video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Control de Autoplay */}
            <div className="absolute top-4 right-4">
              <button
                onClick={toggleAutoPlay}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isPlaying 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                }`}
              >
                {isPlaying ? `Auto: ${timeRemaining}s` : 'Pausado'}
              </button>
            </div>
            
            {/* Indicador de posición */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectVideo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentVideoIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Ir al video ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Información del video actual */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">
              {currentVideo.title}
            </h3>
            {currentVideo.description && (
              <p className="text-gray-600 dark:text-gray-400">
                {currentVideo.description}
              </p>
            )}
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Video {currentVideoIndex + 1} de {videos.length}
              {isPlaying && (
                <span className="ml-2">• Siguiente en {timeRemaining}s</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de Videos Laterales */}
      <div className="w-full lg:w-80">
        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
          Lista de Reproducción
        </h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 dark:scrollbar-track-dark pr-2">
          {videos.map((video, index) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              isActive={index === currentVideoIndex}
              onClick={() => selectVideo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 