import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  technologies?: { name: string; iconUrl?: string }[];
  delay?: number;
  projectId?: string;
}

export const ProjectCard = ({ title, description, icon, image, technologies, delay = 0, projectId }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={projectId ? "cursor-pointer h-full" : "h-full"}
    >
      <SpotlightCard 
        className="h-full bg-card/50 backdrop-blur-sm border-white/10 dark:border-white/5 relative overflow-hidden group"
        spotlightColor="hsl(var(--primary) / 0.25)"
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Indicateur cliquable en bas à droite */}
        {projectId && (
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-200 group-hover:scale-110 z-10">
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        )}
        
        {image && (
          <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-white/10 shadow-lg z-10">
            <img 
              src={image.replace('.webp', '_thumb.webp')}   
              alt={`${title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <CardHeader className="relative z-10">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-white/10">
            {icon}
          </div>
          <CardTitle className="text-xl pr-20 font-heading">{title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-base leading-relaxed mb-4">
            {description}
          </CardDescription>
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 6).map((tech, index) => (
                <div
                  key={tech.name}
                  className="w-10 h-10 rounded bg-background/40 hover:bg-background/60 border border-white/5 p-2 flex items-center justify-center transition-colors duration-200"
                  title={tech.name}
                >
                  {tech.iconUrl ? (
                    <img 
                      src={tech.iconUrl} 
                      alt={tech.name}
                      className={`w-full h-full object-contain ${tech.name === 'Traefik' || tech.name === 'WebSocket' || tech.name === 'MiniLibX' ? 'bg-white rounded' : ''}`}
                    />
                  ) : (
                    <span className="text-xs">?</span>
                  )}
                </div>
              ))}
              {technologies.length > 6 && (
                <div className="w-10 h-10 rounded bg-background/40 border border-white/5 flex items-center justify-center text-xs text-muted-foreground">
                  +{technologies.length - 6}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </SpotlightCard>
    </motion.div>
  );
};
