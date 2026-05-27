
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryPanel, { type StoryPanelProps } from '@/components/story-panel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const storyContent: StoryPanelProps[] = [
  {
    id: 'exterior',
    supertitle: 'The Finish',
    title: 'Bespoke Exterior',
    description:
      'Choose from an infinite palette of colors or expose the inherent beauty of the carbon fiber weave. Every Utopia is a unique canvas, painted to your desires.',
    videoUrl: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1760302340/From_KlickPin_CF_Pagani___%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B8_%D0%BC%D0%B5%D1%87%D1%82%D1%8B_%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B8_%D0%A0%D0%B0%D0%B7%D0%BD%D0%BE%D0%B5_t9fl3s.mp4',
    isHero: true,
  },
  {
    id: 'interior',
    supertitle: 'The Cabin',
    title: 'Masterful Interior',
    description:
      'Supple leathers, intricate switchgear, and polished metals. The cockpit is a sanctuary of analog charm and tactile satisfaction, tailored to the individual.',
    image: PlaceHolderImages.find((img) => img.id === 'pagani-craft'),
  },
  {
    id: 'wheels',
    supertitle: 'The Foundation',
    title: 'Forged Wheels',
    description:
      'APP Tech forged monolithic wheels featuring a turbine design to extract hot air from the brakes. A fusion of aesthetic beauty and engineering function.',
    image: PlaceHolderImages.find((img) => img.id === 'pagani-design'),
  },
];

export default function ConfigurePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Let the splash screen finish
    const startAnimations = () => {
      const header = headerRef.current;
      const logo = logoRef.current;

      if (!header || !logo) return;

      // Logo subtle animation on scroll
      gsap.to(logo, {
        scale: 0.95,
        scrollTrigger: {
          start: 'top top',
          end: '100 top',
          scrub: true,
        },
      });
    };
    
    const splashScreenTimeout = setTimeout(startAnimations, 2500);

    return () => {
      clearTimeout(splashScreenTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 flex justify-between items-center transition-all duration-300"
      >
        <Link href="/" passHref>
          <div ref={logoRef} className="relative w-64 h-32 cursor-pointer">
            <Image
              src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1760299054/Free_Pagani_Automobili_logo_PNG_and_vector_files__svg__eps__-_Brandlogos_net-removebg-preview_aa76mx.png"
              alt="Pagani Logo"
              fill
              style={{ objectFit: 'contain', filter: 'invert(1)' }}
              priority
            />
          </div>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 text-white hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="relative">
        {storyContent.map((content) => (
          <StoryPanel key={content.id} {...content} />
        ))}

        {/* Final Section */}
        <section className="relative bg-black py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="w-24 h-[1px] bg-white/30 mx-auto mb-8" />
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-tight">
              Your Utopia
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              You have shaped the dream. The next step is to make it a reality. Our artisans await your direction.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Submit Inquiry
              </button>
               <Link
                href="/"
                className="px-8 py-3 text-white/70 text-sm uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
              >
                Back to Story
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed inset-0 flex items-center justify-center transition-all duration-700 ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-8 text-center">
            {[
              'Models',
              'Heritage',
              'Atelier',
              'News',
              'Dealers',
              'Contact',
            ].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative text-4xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-[0.1em] hover:text-white/70 transition-colors duration-300"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
                </span>
              </a>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-white/40 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
