import React, { useState, useRef } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeVideoProps {
  videoId: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  height?: string;
}

export function YouTubeVideo({ 
  videoId, 
  thumbnailUrl, 
  title = "Vidéo YouTube", 
  className,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  height = "auto"
}: YouTubeVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(Boolean(autoplay));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  // URL de la miniature
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const loadVideo = () => {
    setVideoLoaded(true);
  };
  
  const closeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoLoaded(false);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 bg-black",
        isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : "w-full mx-auto",
        className
      )}
      style={{ height: isFullscreen ? '100vh' : height, paddingBottom: height === "auto" ? '56.25%' : undefined }} // Ratio 16:9 si auto
    >
      {!videoLoaded ? (
        // Affichage de la miniature avec bouton de lecture
        <div 
          onClick={loadVideo}
          className="absolute inset-0 cursor-pointer group"
        >
          <img 
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay avec effet de vignette */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300">
            {/* Bouton de lecture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <button 
                className="rounded-full bg-rouge-liberation text-blanc-purete p-5 hover:bg-rouge-liberation/90 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                aria-label="Lire la vidéo"
              >
                <Play className="w-8 h-8" />
              </button>
            </div>
          </div>
          
          {/* Titre de la vidéo */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-lg font-medium">
              {title}
            </h3>
          </div>
        </div>
      ) :
        // Affichage de l'iframe YouTube
        <>
          <div className={cn(
            "relative",
            isFullscreen ? "w-full h-full" : "aspect-video h-full"
          )}>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0&playlist=${loop ? videoId : ''}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
          
          {/* Boutons de contrôle */}
          {!autoplay && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label={isFullscreen ? "Quitter le mode plein écran" : "Plein écran"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isFullscreen ? (
                    <>
                      <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                      <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                    </>
                  ) : (
                    <>
                      <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                      <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                    </>
                  )}
                </svg>
              </button>
              <button
                onClick={closeVideo}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Fermer la vidéo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}