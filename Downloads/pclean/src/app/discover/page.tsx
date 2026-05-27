
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function DiscoverPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 flex justify-between items-center transition-all duration-300">
        <Link href="/" passHref>
          <div className="relative w-64 h-32 cursor-pointer">
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
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
            src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1760299725/Pagani_Huayra_BC_Roadster_is_indeed_attractive_garagesocial_paganihuayra_auto_photography_luxurycars_dt37z5.jpg"
            alt="Pagani Huayra BC Roadster"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-tight">
          A Legacy of Performance
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          The Zonda R, a testament to uncompromising engineering and a pure expression of performance. Explore the heritage that inspires the Utopia.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors border border-white/20 px-8 py-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Story</span>
        </Link>
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
    </div>
  );
}
