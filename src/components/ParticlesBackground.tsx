import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "@/contexts/ThemeContext";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
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
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: { min: 0.1, max: theme === "dark" ? 0.5 : 0.6 },
            animation: {
              enable: true,
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
              enable: true,
              speed: 20,
              sync: false,
            },
          },
          twinkle: {
            lines: {
              enable: true,
              frequency: 0.005,
              opacity: 1,
              color: {
                value: theme === "dark" ? "#ffffff" : "#000000"
              }
            },
            particles: {
              enable: true,
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