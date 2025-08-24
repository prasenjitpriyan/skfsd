'use client';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

const FullscreenParticles = () => {
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    if (container) {
      const updateCount = () => {
        if (container.particles) {
          setParticleCount(container.particles.count);
        }
        requestAnimationFrame(updateCount);
      };
      updateCount();
    }
  }, []);

  // Define theme-based configurations
  const getParticleOptions = () => {
    const isDark = resolvedTheme === 'dark';

    return {
      background: {
        color: {
          value: isDark ? '#000000' : '#f8fafc',
        },
      },
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 1,
            },
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isDark ? '#00FFDE' : '#475569',
        },
        links: {
          color: isDark ? '#00FFDE' : '#475569',
          distance: 150,
          enable: true,
          opacity: isDark ? 0.4 : 0.4,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 380,
        },
        opacity: {
          value: isDark ? 0.4 : 0.6,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  };

  if (!init) {
    return null;
  }

  return (
    <>
      {/* Fixed fullscreen particles */}
      <Particles
        id="particles-js"
        className="fixed inset-0 w-full h-full z-0"
        particlesLoaded={particlesLoaded}
        options={getParticleOptions()}
        key={resolvedTheme}
      />
    </>
  );
};

export default FullscreenParticles;
