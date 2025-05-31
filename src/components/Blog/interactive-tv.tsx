'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Video } from '@/data/videos';

interface InteractiveTVProps {
  videos: Video[];
}

const VideoPlayer = ({ video }: { video: Video }) => (
  <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black shadow-2xl border-4 border-gray-800">
    <iframe
      src={video.url}
      className="absolute left-0 top-0 h-full w-full"
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

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

export const InteractiveTV: React.FC<InteractiveTVProps> = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const currentVideo = videos[currentVideoIndex];
  
  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };
  
  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };
  
  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
  };

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
          </div>
        </div>
      </div>
      
      {/* Lista de Videos Laterales */}
      <div className="w-full lg:w-80">
        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
          Próximos Videos
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