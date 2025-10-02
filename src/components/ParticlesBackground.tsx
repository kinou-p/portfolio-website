import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "@/contexts/ThemeContext";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Utiliser requestIdleCallback pour initialiser dès que le navigateur est idle
    // Cela permet de démarrer plus tôt sans bloquer le thread principal
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    const idleId = idleCallback(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, { timeout: 1000 }); // Fallback timeout de 1s si le navigateur ne devient jamais idle

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  const particlesLoaded = async (container) => {
    // console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === "dark" ? "#ffffff" : "#000000",
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.4 : 0.3,
            width: 1,
          },
          move: {
            direction: "none" as const,
            enable: true,
            outModes: {
              default: "out" as const,
            },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 70, // Réduit de 70 à 30 pour de meilleures performances
          },
          opacity: {
            value: { min: 0.1, max: theme === "dark" ? 0.5 : 0.6 },
            animation: {
              enable: false, // Désactiver l'animation d'opacité pour meilleures performances
              speed: 3,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.1, max: 5 },
            animation: {
              enable: false, // Désactiver l'animation de taille pour meilleures performances
              speed: 20,
              sync: false,
            },
          },
          twinkle: {
            lines: {
              enable: false, // Désactiver le scintillement pour meilleures performances
              frequency: 0.005,
              opacity: 1,
              color: {
                value: theme === "dark" ? "#ffffff" : "#000000"
              }
            },
            particles: {
              enable: false, // Désactiver le scintillement pour meilleures performances
              frequency: 0.05,
              opacity: 1,
              color: {
                value: theme === "dark" ? "#ffffff" : "#000000"
              }
            }
          },
        },
        detectRetina: true,
      }),
    [theme],
  );

  if (init) {
    return (
      <Particles
        id={`tsparticles-${theme}`}
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return <></>;
};