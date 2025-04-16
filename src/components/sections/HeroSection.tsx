import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { YouTubeVideo } from '../ui/youtube-video';

export function HeroSection() {
  return (
    <section className="hero bg-hero-gradient text-blanc-purete pt-24 pb-16 min-h-screen flex items-center animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="hero__content flex-1 max-w-2xl animate-slideInLeft">
            <h1 className="text-blanc-purete mb-6 leading-tight">
              Libérez-vous VRAIMENT de l'alcool.<br/>
              Reprenez le contrôle de votre vie.
            </h1>
            <p className="hero__subtitle text-xl font-medium mb-6">
              Fatigué(e) de la lutte constante ? Découvrez une approche humaine et profonde pour gérer vos émotions et vous défaire durablement de l'emprise de l'alcool, sans jugement ni bataille sans fin.
            </p>
            <p className="hero__description text-lg text-sable-introspection italic mb-10">
              Je vous accompagne pendant 6 mois avec des outils concrets, un soutien sans faille et une méthode basée sur la compréhension de soi.
            </p>
            <div className="hero__cta">
              <Link href="#calendly">
                <Button 
                  variant="default" 
                  size="lg" 
                  animation="pulse"
                  badge={{ 
                    text: "Plus que 3 places disponibles", 
                    color: "bg-yellow-400" 
                  }}
                  aria-label="Réserver un rendez-vous - Plus que 3 places disponibles"
                >
                  Je veux reprendre le contrôle
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero__image flex-1 max-w-xl">
            <YouTubeVideo 
              videoId="_1jBhCjJvwo" 
              autoplay={true} 
              muted={true} 
              loop={true}
              controls={false}
              height="400px"
              className="shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}