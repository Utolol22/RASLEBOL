"use client"

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

// Importations des composants de navigation et progression
type ProgressMarker = {
  section: string;
  title: string;
  number: number;
};

type ProgressBarProps = {
  markers: ProgressMarker[];
};

// Composant ProgressBar simplifié
const ProgressBar: React.FC<ProgressBarProps> = ({ markers }) => {
  return (
    <div id="progressContainer" className="fixed bottom-0 left-0 w-full bg-slate-800/90 backdrop-blur-sm z-50 mobile-nav-overlay">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-full">
          {markers.slice(0, 5).map((marker) => (
            <a
              key={marker.section}
              href={`#${marker.section}`}
              className="progress-marker"
              title={marker.title}
            >
              <span className="text-xs text-white/70">{marker.number}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // État pour gérer la visibilité et l'opacité de la barre de navigation
  const [scrolling, setScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');
  
  // Gestionnaire de défilement pour les animations de la barre de navigation
  useEffect(() => {
    let isThrottled = false;
    
    const handleScroll = () => {
      if (isThrottled) return;
      isThrottled = true;
      
      // Libérer le throttle après 100ms
      setTimeout(() => {
        isThrottled = false;
      }, 100);
      
      // Déterminer si l'utilisateur est en train de défiler
      setScrolling(window.scrollY > 100);
      
      // Calculer la progression du défilement pour l'indicateur
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Déterminer la section actuelle pour mettre en évidence l'élément de navigation
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + sectionRect.top;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setCurrentSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Exécuter une fois au chargement
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Marqueurs de progression pour la barre de navigation
  const progressMarkers = [
    { section: "hero", title: "Déclic", number: 1 },
    { section: "testimonials", title: "Avis", number: 2 }
  ];

  return (
    <>
      <main className="min-h-screen bg-sable-introspection pb-20 md:pb-0">
        {/* Barre de progression */}
        <ProgressBar markers={progressMarkers} />

        {/* Section Hero */}
        <HeroSection />

        {/* Section Testimonials */}
        <TestimonialsSection />
      </main>
    </>
  );
}