'use client';

import React from 'react';
import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white animate-fadeOut delay-2000 pointer-events-none">
      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fadeOut {
          animation: fadeOut 0.5s ease-out forwards;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-logoPulse {
          animation: logoPulse 2.5s ease-in-out infinite;
        }
      `}</style>
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 animate-logoPulse">
        <Image
          src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1760299054/Free_Pagani_Automobili_logo_PNG_and_vector_files__svg__eps__-_Brandlogos_net-removebg-preview_aa76mx.png"
          alt="Pagani Logo"
          fill
          priority
          sizes="(max-width: 640px) 192px, 256px"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
