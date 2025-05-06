'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarFieldOnlyProps {
  className?: string;
}

const StarFieldOnly: React.FC<StarFieldOnlyProps> = ({ className = '' }) => {
  const starFieldRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    if (starFieldRef.current) {
      starFieldRef.current.appendChild(renderer.domElement);
    }

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const positions = [];

    for (let i = 0; i < 10000; i++) {
      positions.push(Math.random() * 2000 - 1000);
      positions.push(Math.random() * 2000 - 1000);
      positions.push(Math.random() * 2000 - 1000);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const animate = () => {
      requestAnimationFrame(animate);
      starField.rotation.x += 0.0005;
      starField.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (starFieldRef.current && renderer.domElement) {
        starFieldRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={starFieldRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default StarFieldOnly;
