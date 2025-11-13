'use client';

import { useEffect, useState } from 'react';

export default function Eye() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eye = document.getElementById('interactive-eye');
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);

      const distance = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 20,
        8
      );

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute w-24 h-24 rounded-full bg-indigo-500/20 animate-[eye-glow_3s_ease-in-out_infinite]" />

      {/* Eye White */}
      <div
        id="interactive-eye"
        className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-indigo-200 overflow-hidden">
        {/* Iris */}
        <div className="relative w-12 h-12 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-inner">
          {/* Pupil with dynamic position */}
          <div
            className="w-6 h-6 bg-gray-900 rounded-full shadow-lg transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}>
            {/* Pupil Highlight */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
          </div>
        </div>

        {/* Light Reflection */}
        <div className="absolute top-2 right-3 w-3 h-3 bg-white rounded-full opacity-80 blur-sm" />
      </div>
    </div>
  );
}
