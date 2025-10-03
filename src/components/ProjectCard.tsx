import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      onClick={handleClick}
      className={projectId ? "cursor-pointer" : ""}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-border/50 bg-card/50 backdrop-blur relative overflow-hidden group">
        {/* Indicateur cliquable en bas à droite */}
        {projectId && (
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        )}
        
        {image && (
          <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-background/20 shadow-lg">
            <img 
              src={image.replace('.webp', '_thumb.webp')}   
              alt={`${title} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-xl pr-20">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed mb-4">
            {description}
          </CardDescription>
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 6).map((tech, index) => (
                <div
                  key={tech.name}
                  className="w-10 h-10 rounded bg-background/50 p-2 flex items-center justify-center"
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
                <div className="w-10 h-10 rounded bg-background/50 flex items-center justify-center text-xs text-muted-foreground">
                  +{technologies.length - 6}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
