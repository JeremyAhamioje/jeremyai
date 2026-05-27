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
    id: 'hero',
    supertitle: 'Act Three, Scene Two',
    title: 'Pagani Utopia Roadster',
    subtitle: (
      <>
        <Link href="/discover" className="hover:text-white transition-colors">
          Discover More
        </Link>
        <span className="mx-2 text-white/30">|</span>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Like this project? Visit my portfolio
        </a>
      </>
    ),
    videoUrl: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1760300205/From_KlickPin_CF_Pagani_%D0%B2_2025_%D0%B3___%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B0_%D0%9A%D1%80%D1%83%D1%82%D1%8B%D0%B5_%D1%82%D0%B0%D1%87%D0%BA%D0%B8_%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C_s0v0dp.mp4',
    isHero: true,
  },
  {
    id: 'discover',
    supertitle: 'The Vision',
    title: 'A New Utopia',
    description:
      'The Utopia is a return to the essence of Pagani. A car for the purist, featuring a manual gearbox option to connect driver and machine in a way that is increasingly rare.',
    videoUrl: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1760302340/From_KlickPin_CF_Pagani___%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B8_%D0%BC%D0%B5%D1%87%D1%82%D1%8B_%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B8_%D0%A0%D0%B0%D0%B7%D0%BD%D0%BE%D0%B5_t9fl3s.mp4',
  },
  {
    id: 'design',
    supertitle: 'The Soul',
    title: 'A Breathtaking Design',
    description:
      'The Utopia Roadster sheds the constraints of a roof, revealing an unfiltered, elemental driving experience. Every line is sculpted by the wind, a testament to the harmony of art and science.',
    image: PlaceHolderImages.find((img) => img.id === 'pagani-design'),
  },
  {
    id: 'power',
    supertitle: 'The Heart',
    title: 'Unrivaled Performance',
    description:
      'At its core lies the Mercedes-AMG V12, a powerhouse delivering 864 horsepower. It is a symphony of mechanical precision, promising a driving experience that is both visceral and unforgettable.',
    image: PlaceHolderImages.find((img) => img.id === 'pagani-craft'),
  },
  {
    id: 'craft',
    supertitle: 'The Hands',
    title: 'Artisanal Mastery',
    description:
      "Crafted from Carbo-Titanium, the chassis offers exceptional rigidity and lightness. Each detail is meticulously finished by hand, a signature of Pagani's commitment to perfection.",
    image: PlaceHolderImages.find((img) => img.id === 'pagani-power'),
  },
];

export default function Home() {
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
              Utopia
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              An impossible dream, now a reality. Where art meets engineering,
              and passion becomes performance.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/configure"
                className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Configure Yours
              </Link>
              <Link
                href="/learn-more"
                className="px-8 py-3 text-white/70 text-sm uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
              >
                Learn More
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
