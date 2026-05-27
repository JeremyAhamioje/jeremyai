
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
    id: 'heritage-hero',
    supertitle: 'The Lineage',
    title: 'A Legacy of Icons',
    description:
      'From the Zonda to the Huayra, and now the Utopia. Each model is a chapter in a story of relentless innovation and the pursuit of automotive art.',
    videoUrl: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1760300205/From_KlickPin_CF_Pagani_%D0%B2_2025_%D0%B3___%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B0_%D0%9A%D1%80%D1%83%D1%82%D1%8B%D0%B5_%D1%82%D0%B0%D1%87%D0%BA%D0%B8_%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C_s0v0dp.mp4',
    isHero: true,
  },
  {
    id: 'engineering',
    supertitle: 'The Philosophy',
    title: 'Engineering as Art',
    description:
      "Horacio Pagani's philosophy, inspired by Leonardo da Vinci, is that Art and Science are disciplines that must walk together, hand in hand. The Utopia is the ultimate expression of this belief.",
    image: PlaceHolderImages.find((img) => img.id === 'pagani-power'),
  },
  {
    id: 'text-block',
    supertitle: 'The Details',
    title: 'Beyond the Surface',
    description:
      'The active aerodynamics, the Carbo-Titanium monocoque, the in-house developed six-speed manual transmission—every component is an obsession. It is a car that rewards the curious, with layers of complexity and craftsmanship that reveal themselves over time. The suspension, forged from aerospace-grade aluminum alloy, is a work of art in itself, providing a connection to the road that is both direct and compliant. This is not just a vehicle; it is a statement.',
    image: {
      id: 'pagani-huayra-roadster',
      description: 'Pagani Huayra Roadster details',
      imageUrl: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1760912621/Pagani_Huayra_Roadster_BC_qv1liq.jpg',
      imageHint: 'supercar details',
    },
  },
];

export default function LearnMorePage() {
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
              Continue the Journey
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Your exploration has just begun. Discover the art of configuration or return to the main story.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/configure"
                className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Configure Yours
              </Link>
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
